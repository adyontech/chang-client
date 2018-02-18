// you can add regex here too when you will be needing later

function emailValidator(control) {
    if (control.value.length < 3 || control.value.required) {
        return { 'email': true }
    }

}


function passwordValidator(control) {
    if (control.value.length < 3 || control.value.required) {
        return { 'password': true }
    }
}

function userNameValidator(control) {
     if (control.value.length < 3 || control.value.required) {
        return { 'userName': true }
    }
}

function phoneValidator(control) {
     if (control.value.length === 10 || control.value.required) {
        return { 'userName': true }
    }
}


// var checkers = {
//     emailValidator, passwordValidator, userNameValidator
// };

export {
       emailValidator, passwordValidator, userNameValidator, phoneValidator

}
