import { useState } from "react"

import {
  signInWithGooglePopUp, 
  signInAuthWithEmailAndPassword
} from "../../utils/firebase/Firebase";

import { Button, BUTTON_TYPE_CLASSES } from "../button/Button";
import { FormInput } from "../form-input/FormInput";
import "./sign-in-form.scss"

const defaultFormFields = {
  email: "",
  password: "",
}

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value});
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopUp();

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields)
    } catch(e) {
      switch(e) {
        case "auth/wrong-password":
          alert("Incorrect password for this email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(e)
      }

    }

  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign ip with your email and password</span>
      <form onSubmit={handleSubmit}>

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
        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign In</Button>
        </div>
       
      </form>
    </div>
  )
}