import './FaceRecognition.css'

const FaceRecognition = ({ inputUrl, box }) => {
    return (
        <div className="center pa3 " >
            <div className=" center mt2 " >
            <img id="inputImage" src={inputUrl} alt="faces" width={'500px'} height={'auto'}/>
            <div className="bounding-box"
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
            ></div>
            </div>
        </div>
    )
}

export default FaceRecognition;