import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/outline';
import { loginUser } from "../actions/authActions";
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    const User = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLoginError = useSelector(state => state.auth.isLoginError)
    const loginErrorMessage = useSelector(state => state.auth.loginError)

    const dispatch = useDispatch()

    if (User.isAuthenticated) {
        return <Redirect to='/' />
    }

    const tryLogin = () => {
        const User = {
            email: email,
            password: password
        }
        if (email && password) {
            dispatch(loginUser(User))
        }
    }

    function errorState() {
      if (isLoginError) {
          return (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                  <div className="flex">
                  <div className="flex-shrink-0">
                      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">There was an error.</h3>
                      <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                          <li>{loginErrorMessage}</li>
                      </ul>
                      </div>
                  </div>
                  </div>
              </div>
          )
      }
  }

  function handleOnSubmitRegister() {
    history.push(`/register`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 w-auto"
          src="https://i.imgur.com/SQBhFyA.png"
          alt="Workflow"
        />        
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white pt-4 pb-6 px-4 shadow-soft sm:rounded-lg sm:px-10">
        <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-700 pb-8">Sign in to your account</h2>

          <div className="bg-white py-2">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>            
            </form>

            <div className="pt-4">
                <button
                  type="submit"
                  onClick={tryLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
            </div>
            {errorState()}            
            <div className="flex items-center justify-center mt-4">
                <div className="text-sm">
                  <button onClick={handleOnSubmitRegister} className="font-medium text-indigo-600 hover:text-indigo-500">
                    <span className="font-normal text-gray-600">Don't have an account?</span> Register now
                  </button>
                </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default Login;