import React, { Fragment } from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <Fragment>
      <h1>Sign up</h1>
      <SignupForm />
      <h4>Already have an account?</h4>
      <Link to="/login"><h5>Log in</h5></Link>
    </Fragment>
  )
}

export default SignupPage
