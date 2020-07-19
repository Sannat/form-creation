# form-creation task
A react component to produce forms from different JSON props
Total time spent - 8 to 10 hours

### How to run the application locally?
1. clone the repository from github; https://github.com/Sannat/form-creation.git 
2. run the command `npm i` to install all the requied dependencies
3. run the command `npm run test` to run the tests
4. run the command `npm run start` to run the application in the browser. The application run in port `3000`. [http://localhost:3000]

### How the application works?
1. when the browser is loaded you will see 3 buttons (signup, registration and feedback). Each of these button's load respective forms in the dialog which is generated from different input JSON (that GenericForm understands) defined in the `App.js` file.
2. required validation are in place to validate the date entered by user
3. finally on click of `submit` button a JSON will be logged in the console as output

    # Few prerequisites
    (a) the input JSON, `name` must be unique.
    (b) press escape key to close an opened dialog

    # Sample JSON input (for registration)
        [
        {
            "name": "name",
            "label": "Name",
            "type": "Input",
            "Validations": "Required,ValidateName"
        },
        {
            "name": "dob",
            "label": "Date of Birth",
            "type": "Date",
            "Validations": "Required,Adult"
        },
        {
            "name": "gender",
            "label": "Gender",
            "type": "Radio",
            "OptionValues": "male,female"
        },
        {
            "name": "contact",
            "label": "Contact Numbers",
            "type": "Contact",
            "OptionValues": "home,work,mobile"
        },
        {
            "name": "guardianConsentRequired",
            "label": "Require Guardian Consent",
            "type": "CheckBox"
        },
        {
            "name": "guardian",
            "label": "Guardian Contact Details",
            "type": "MultiInput",
            "OptionValues": "name,contact",
            "DependentOn": "guardianConsentRequired",
            "Validations": "MultiRequired"
        }
        ]

    # Sample JSON output
        {
        "name": "Sannat kumar Digar",
        "dob": "1986-01-19",
        "gender": "male",
        "contact": [
            { "type": "home", "value": "" },
            { "type": "work", "value": "" },
            { "type": "mobile", "value": "+61469282411" }
        ],
        "guardianConsentRequired": true,
        "guardian": { "name": "Shane Singh", "contact": "0468900002" }
        }
    
    # Screenshot
    ![React-Screenshot](https://user-images.githubusercontent.com/5678788/87874715-62da1100-ca0f-11ea-8b29-bb271aa3f0aa.PNG)

### Possible Improvements : Backlog of items below along with priorities
    # story 1 - Instead of using document.getElementById, we must use react state to store all form inputs in state and use it where ever required. (Must)
    # story 2 - Improve the unit test further - to test the entire user workflow (click on button, open the dialog as per the JSON, then validate and generate output). (Must)
    # story 3 - The labels for radio button and checkboxes are small case as it is tightly coupled with the final output, we could improve the JSON to hold additional information to display label text as wished. (Should)
    # story 4 - The dialog is fluctuating once the error message is displayed. (Must) - BUG
    # story 5 - Validations should be added based on requirement for additonal types to cater addition requirements in the input JSON. (Could)
    # story 6 - Rendering the fields function can be make more readable by moving out the code from `getField` function to different functions. (Should) --- DONE ---
    # story 7 - Provide an option to close the dialog. (Should)
    # story 8 - Package can be build to run test and then lauch the application using one command. (Could)