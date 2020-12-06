//Contact form

const form = document.querySelector("#contactForm");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();
  console.log("The form was submitted");

  const lastName = document.querySelector("#lastName");
  const firstName = document.querySelector("#firstName");
  const subject = document.querySelector("#subject");
  const email = document.querySelector("#email");
  const subjectError = document.querySelector("#subjectError");
  const emailError = document.querySelector("#emailError");
  const firstNameError = document.querySelector("#firstNameError")
  const lastNameError = document.querySelector("#lastNameError")
  const validateSuccess = document.querySelector("#validateFormSuccess");

  if (checkInputLength(subject.value, 9) === true) {
    subjectError.style.display = "none"; 
    subject.style.border = "none";
  } else {
    subjectError.style.display = "block";
    subject.style.border = "solid 1px red";
  }
  if (checkInputLength(lastName.value, 1) === true) {
    lastNameError.style.display = "none"; 
    lastName.style.border = "none";
  } else {
    lastNameError.style.display = "block";
    lastName.style.border = "solid 1px red";
  }
  if (checkInputLength(firstName.value, 1) === true) {
    firstNameError.style.display = "none"; 
    firstName.style.border = "none";
  } else {
    firstNameError.style.display = "block";
    firstName.style.border = "solid 1px red";
  }
  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
    email.style.border = "none";
  } else {
    emailError.style.display = "block";
    email.style.border = "solid 1px red";
  }

//success validation message. 

const conditions = [
    checkInputLength(subject.value, 9),
    checkInputLength(lastName.value, 1),
    checkInputLength(firstName.value, 1),
    validateEmail(email.value),
]

if (conditions.includes(false)) {
    validateSuccess.style.display ="none"
}
else {
    validateSuccess.style.display ="block"
}

}

function checkInputLength(value, len) {
  const trimmedValue = value.trim();
  if (trimmedValue.length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}