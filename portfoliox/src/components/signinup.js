import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/outline';
import { registerUserAction } from "../actions/authActions";
import { useHistory } from 'react-router-dom'

function Register() {
  const history = useHistory();

  const User = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const isRegisterError = useSelector(state => state.auth.isRegisterError)
  const registerErrorMessage = useSelector(state => state.auth.registerError)
  const [passwordMatch, setPasswordMatch] = useState(true)
  if (User.isAuthenticated) {
      return <Redirect to='/dashboard' />
  }

  const tryRegister = () => {
      const User = {
          username: name.replace(/\s/g, ""),
          name: name,
          email: email,
          password: password
      }
      if (name && email && password && (password === confirmPassword)) {
        setPasswordMatch(true)
        dispatch(registerUserAction(User))
      } else {
        setPasswordMatch(false)
      }
  }

  function errorState() {
    if (isRegisterError) {
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
                        <li>{registerErrorMessage}</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        )
    }
  }

  function passwordMatchError() {
    if (!passwordMatch) {
      return (
        <div>
          <h1 className="text-sm font-medium text-red-500">Passwords must match.</h1>
        </div>
      )
    }
  }

  function handleOnSubmitLogin() {
    history.push(`/login`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://i.imgur.com/SQBhFyA.png"
          alt="Workflow"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white pt-4 pb-6 px-4 shadow-soft sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700 pb-8">Sign Up</h2>
          
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
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
                    className={passwordMatch ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border-2 border-red-500 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmedPassword(e.target.value)}}
                    autoComplete="current-password"
                    required
                    className={passwordMatch ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border-2 border-red-500 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"}
                  />
                </div>
              </div>
            </form>
            {passwordMatchError()}
            <div className="pt-4">
                <button
                  type="submit"
                  onClick={tryRegister}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
            </div>

            {errorState()}

            <div className="flex items-center justify-center mt-4">
                <div className="text-sm">
                  <button onClick={handleOnSubmitLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                    <span className="font-normal text-gray-600">Already have an account?</span> Sign in
                  </button>
                </div>
            </div>

            
          </div>          
        </div>

      </div>
    </div>
  )
}

export default Register;