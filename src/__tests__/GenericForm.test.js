import React from 'react';
import { render } from '@testing-library/react';
import {GenericForm} from '../components/GenericForm';

test ("show name field on form" , async () => {
  const inputJson = [
    {"name":"firstField", "label":"First Name", "type":"Input"}
  ]

  const {getByText} = render(<GenericForm inputJson = {inputJson}/>); 
  const formFieldName = getByText('First Name');
  expect(formFieldName).toBeInTheDocument();
});

test ("show multiple input fields on form" , async () => {
  const inputJson = [
    {"name":"firstField", "label":"First Name", "type":"Input"},
    {"name":"secondField", "label":"Last Name", "type":"Input"}
  ]

  const {getByText} = render(<GenericForm inputJson = {inputJson}/>);
  const formFieldFirstName = getByText('First Name');
  expect(formFieldFirstName).toBeInTheDocument();

  const formFieldLastName = getByText('Last Name');
  expect(formFieldLastName).toBeInTheDocument();
});

test ("shows date input field on form" , async () => {
  const inputJson = [
    {"name":"dateField", "label":"Date of Birth", "type":"Date"}
  ]

  const {getByText} = render(<GenericForm inputJson = {inputJson}/>);  
  const formFieldDate = getByText('Date of Birth');
  expect(formFieldDate).toBeInTheDocument();
});
