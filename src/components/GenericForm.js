import React, { Component } from "react";

export class GenericForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };    
  }

  renderInputField = (field) => {
    return (
        <div key={field.name}>
          <label htmlFor={field.name} className="text">{field.label}</label>
          <input id={field.name} name={field.name} className="input"></input>
          <span className="error">{this.state.errors[field.name]}</span>
        </div>
      );
  }

  renderDateField = (field) => {
    return (
        <div key={field.name}>
          <label htmlFor={field.name} className="text">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type="date"
            className="input"
          ></input>
          <span className="error">{this.state.errors[field.name]}</span>
        </div>
      );
  }

  renderRadioField = (field) => {
    return (
        <div key={field.name} className="input">
          <label htmlFor={field.name} className="text">{field.label}</label>
          {field.OptionValues.split(",").map((radio) => (
            <div key={radio}>
              <input
                type="radio"
                id={field.name + radio}
                name={field.name}
                value={radio}
              />
              <label htmlFor={radio}>{radio}</label>
            </div>
          ))}
        </div>
      );
  }

  renderCheckBoxField = (field) => {
    return (
        <div key={field.name} className="input">
          <label htmlFor={field.name} className="text">{field.label}</label>
          <input
            id={field.name}
            type="checkbox"
            name={field.name}
            className="checkbox"
          />
        </div>
      );
  }

  renderContactMultiInputField = (field) => {
    return (
        <div key={field.name} className="input">
          <label htmlFor={field.name} className="text">{field.label}</label>
          {field.OptionValues.split(",").map((input) => (
            <div key={input}>
              <label htmlFor={field.name + input}>{input}</label>
              <input
                id={field.name + input}
                name={field.name + input}
                className="input"
              />
              <span className="error">
                {this.state.errors[field.name + input]}
              </span>
            </div>
          ))}
        </div>
      );
  }

  getField = (field) => {
    if (!field?.type) return null;

    switch (field.type) {
      case "Input":
        return this.renderInputField(field);
      case "Date":
        return this.renderDateField(field);
      case "Radio":
        return this.renderRadioField(field);
      case "CheckBox":
        return this.renderCheckBoxField(field);
      case "Contact":
      case "MultiInput":
        return this.renderContactMultiInputField(field);
      default:
        break;
    }
  };

  generateOutputforAction = () => {
    var model = {};
    this.props.inputJson.forEach(function (field) {
      switch (field.type) {
        case "Input":
        case "Date":
          model[field.name] = document.getElementById(field.name).value;
          break;
        case "Contact":
          model[field.name] = [];
          var i = 0;
          field.OptionValues.split(",").forEach(function (option) {
            var optionObj = {};
            optionObj["type"] = option;
            optionObj["value"] = document.getElementById(
              field.name + option
            ).value;
            model[field.name][i] = optionObj;
            i = i + 1;
          });
          break;
        case "CheckBox":
          model[field.name] = document.getElementById(field.name).checked;
          break;
        case "Radio":
          var selectedOption = {};
          field.OptionValues.split(",").forEach(function (option) {
            var element = document.getElementById(field.name + option);
            if (element.checked) selectedOption = element.value;
          });
          model[field.name] = selectedOption;
          break;
        case "MultiInput":
          var optionObj = {};
          field.OptionValues.split(",").forEach(function (option) {
            optionObj[option] = document.getElementById(
              field.name + option
            ).value;
          });
          model[field.name] = optionObj;
          break;
        default:
          break;
      }
    });
    console.log(JSON.stringify(model));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()){
      console.log("Form is valid");
      this.generateOutputforAction();
    } else {
      console.log("Form is Invalid");  
    }    
  };

  isFormValid = () => {
    let formIsValid = true;
    this.props.inputJson.map((field) =>{
      let errors = this.state.errors;
      let fieldValue = "";
      switch (field.Validations) {
        case "Required,ValidateName":
          fieldValue = document.getElementById(field.name).value.trim();
          if (fieldValue === "") {
            errors[field.name] = "Name: Name cannot be empty.";
            formIsValid = false;
          } else if (!fieldValue.includes(" ")) {
            errors[field.name] = "Name: Both first and last name is required.";
            formIsValid = false;
          } else {
            errors[field.name] = "";
          }
          this.setState({ errors: errors });
          break;
  
        case "Required,Adult":
          let currentDate = new Date();
          fieldValue = document.getElementById(field.name).value.trim();
          let enteredDate = Date.parse(fieldValue);
          let adultDate = new Date(
            currentDate.getFullYear() - 18,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          if (fieldValue === "") {
            errors[field.name] = "DOB: Date field cannot be empty.";
            formIsValid = false;
          } else if (enteredDate > adultDate) {
            errors[field.name] = "DOB: You should be an adult (18+).";
            formIsValid = false;
          } else {
            errors[field.name] = "";
          }
          this.setState({ errors: errors });
          break;
  
        case "MultiRequired":
          if (field.DependentOn !== "") {
            if (document.getElementById(field.DependentOn).checked) {
              field.OptionValues.split(",").forEach(function (input) {
                if (document.getElementById(field.name + input).value === "") {
                  errors[field.name + input] = input +": Field cannot be left empty.";
                  formIsValid = false;
                } else {
                  errors[field.name + input] = "";
                }
              });
            } else {
              field.OptionValues.split(",").forEach(function (input) {
                errors[field.name + input] = "";
              });
            }
          } else {
            field.OptionValues.split(",").forEach(function (input) {
              if (document.getElementById(field.name + input).value === "") {
                errors[field.name + input] = input +": Field cannot be left empty.";
                formIsValid = false;
              } else {
                errors[field.name + input] = "";
              }
            });
          }
          this.setState({ errors: errors });
          break;
        default:
          break;
      }
      return false;
    });   
    return formIsValid;
  }

  render() {
    return (
      <dialog id={this.props.formName}>
        <form id={this.props.formName+"Form"} onSubmit={this.handleSubmit} className="container">
          {this.props.inputJson.map((field) => this.getField(field))}
          <button className="submit">Submit</button>
          <br />
        </form>
      </dialog>
    );
  }
}
