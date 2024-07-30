import { useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const PAT = '85896515269a47d7912e5e6b3fdab9c0';
const USER_ID = '112yogi';
const APP_ID = 'facereco';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

function App() {
    const [inputUrl, setInputUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    });

    const loadUsers = (data) => {
        setUser(prevUser => ({
          ...prevUser,
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          entries: data.entries,
          joined: data.joined
        }));
    };

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.querySelector('#inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        };
    };

    const displayFaceBox = (box) => {
        setBox(box);
    };

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const onInputChange = (event) => {
        setInputUrl(event.target.value);
    };

    const returnRequestOptions = (imgUrl) => {
        const IMAGE_URL = imgUrl;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        return requestOptions;
    };

    const onSubmit = () => {
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnRequestOptions(inputUrl))
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                        setUser(prevUser => ({
                            ...prevUser,
                            entries: count
                        }))
                    })
                    .catch(err => console.log('Error updating user entries:', err));
                }
                displayFaceBox(calculateFaceLocation(response));
            })
            .catch(err => console.log('Error fetching from Clarifai API:', err));
    };

    const onRouteChange = (route) => {
        if (route === 'signout') {
            setIsSignedIn(false);
            setInputUrl('');
        } else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    };

    const params = {
        background: {
            color: "",
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 1,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
                bubble: {
                    distance: 200,
                    size: 20,
                    duration: 2,
                    opacity: 0.8,
                    color: "#ffffff",
                },
                light: {
                  area: {
                    gradient: {
                      start: {
                        value: "#ffffff"
                      },
                      stop: {
                        value: "#000000"
                      }
                    },
                    radius: 1000
                  },
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 175,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 3,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 200,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
        },
        detectRetina: true,
    };

    return (
        <>
            <Particles 
                className="particle"
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={params}
            />
            <Navigation
                isSignedIn={isSignedIn}
                onRouteChange={onRouteChange}
            />
            {
                route === 'home' 
                ? <div>
                    <Logo />
                    <Rank user={user} />
                    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
                    <FaceRecognition inputUrl={inputUrl} box={box} />
                  </div>
                : (
                    route === 'signin'
                    ? <SignIn onRouteChange={onRouteChange} loadUsers={loadUsers} /> 
                    : <Register onRouteChange={onRouteChange} loadUsers={loadUsers} />
                ) 
            }
        </>
    );
}

export default App;
