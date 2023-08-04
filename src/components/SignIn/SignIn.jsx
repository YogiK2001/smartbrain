
import { useState } from 'react';



const SignIn = ({onRouteChange, loadUsers}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id){ // does the user exist? Did we receive a user with a property of id?
          loadUsers(user);
          onRouteChange('home');
        }
    });
  }

    return (
      <article className="br3 ba dark-gray bg-white-50 b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure ph4">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">SMART BRAIN</legend>
              <div className="mt4">
                <label className="db fw6 lh-copy f5 text-center" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv4">
                <label className="db fw6 lh-copy f5 text-center" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="tc">
              <input
                onClick={() => onSubmitSignIn()}
                className="b ph4 pv3 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt2 tc">
              <p
              onClick={() => onRouteChange('register')}  
              className="f5 link dim black db pointer">
              Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  };
  

export default SignIn;