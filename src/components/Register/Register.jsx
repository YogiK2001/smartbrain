import { useState } from 'react';

const Register = ({onRouteChange , loadUsers}) => {

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });


  const onNameChange = event => {
    setNewUser(prevUser => ({
      ...prevUser,
      name: event.target.value
    }));
  };

  const onEmailChange = event => {
    setNewUser(prevUser => ({
      ...prevUser,
      email: event.target.value
    }));
  };

  const onPasswordChange = event => {
    setNewUser(prevUser => ({
      ...prevUser,
      password: event.target.value
    }));
  };

  const onSubmitRegister = () => {
    fetch('https://smartbrain-api-azih.onrender.com/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      })
      })
      .then(response => response.json())
      .then((user) => {
        if(user.id)
        {
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
              <legend className="f3 fw6 ph0 mh0 center">JOIN SMART BRAIN</legend>
              <div className="mt4">
                <label className="db fw6 lh-copy f5 text-center" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
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
                onClick={() => onSubmitRegister()}
                className="b ph4 pv3 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </main>
      </article>
    );
  };
  

export default Register;