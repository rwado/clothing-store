import { useState } from "react"
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/Firebase";
import { Button, BUTTON_TYPE_CLASSES } from "../button/Button";
import { FormInput } from "../form-input/FormInput";  

import "./sign-up-form.scss"


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value});
  }

  const registerUser = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailandPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName })

      setFormFields(defaultFormFields);

    } catch(e) {
      if(e.code === 'auth/email-already-in-use') {
        alert('Cannot create user: Email already in use')
      } else (
        console.error('User creation encountered an error: ' + e)
      )
    }

  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={registerUser}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />


        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />


        <FormInput 
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password" 
          required onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
        />

        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign Up</Button>
      </form>
    </div>
  )
}