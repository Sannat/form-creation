import React from 'react';
import './App.css';
import { GenericForm } from './components/GenericForm';

const showSignUpForm = (event) => {
  event.preventDefault();
  document.getElementById("SignUpForm").reset();
  document.getElementById("SignUp").showModal();
}

const showRegistrationForm = (event) => {
  event.preventDefault();
  document.getElementById("RegistrationForm").reset();
  document.getElementById("Registration").showModal();
}

const showFeedbackForm = (event) => {
  event.preventDefault();
  document.getElementById("FeedbackForm").reset();
  document.getElementById("Feedback").showModal();
}

function App() {

  const signUpFields = [
    {"name":"userName", "label":"Name", "type":"Input", "Validations":"Required,ValidateName"},
  ]

  const registrationFields = [
    {"name":"name", "label":"Name", "type":"Input", "Validations":"Required,ValidateName"},
    {"name":"dob", "label":"Date of Birth", "type":"Date", "Validations":"Required,Adult"},
    {"name":"gender", "label":"Gender", "type":"Radio", "OptionValues":"male,female"},
    {"name":"contact", "label":"Contact Numbers", "type":"Contact", "OptionValues":"home,work,mobile"},
    {"name":"guardianConsentRequired", "label":"Require Guardian Consent", "type":"CheckBox"},
    {"name":"guardian", "label":"Guardian Contact Details", "type":"MultiInput", "OptionValues":"name,contact", "DependentOn":"guardianConsentRequired", "Validations":"MultiRequired"}
  ];

  const  feedbackFields = [
    {"name":"userName", "label":"Name", "type":"Input", "Validations":"Required,ValidateName"},
  ]

  return (
    <div className="App">
      <GenericForm formName="SignUp" inputJson = {signUpFields}/>
      <GenericForm formName="Registration" inputJson = {registrationFields}/>
      <GenericForm formName="Feedback" inputJson = {feedbackFields}/>

      <button onClick={showSignUpForm} className="openDialogButton">Sign Up</button>
      <button onClick={showRegistrationForm} className="openDialogButton">Register User</button>
      <button onClick={showFeedbackForm} className="openDialogButton">Feedback Form</button>
    </div>
  );
}

export default App;
