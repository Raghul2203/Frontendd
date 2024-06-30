import React from 'react'
import Form from './components/Form'

const Register = () => {
  localStorage.clear()
  return (
    
    <Form route="/auth/api/user/register/" method="register"></Form>
  )
}

export default Register