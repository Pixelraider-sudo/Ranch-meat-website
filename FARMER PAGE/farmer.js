// PHONE VALIDATION

function validatePhone(phone){

const kenyaRegex = /^\+2547\d{8}$/;

return kenyaRegex.test(phone);

}


// PASSWORD STRENGTH

function checkPasswordStrength(password){

const strengthText = document.getElementById("password-strength");

if(password.length < 6){

strengthText.textContent="Weak password";
strengthText.style.color="red";

}else if(/[A-Z]/.test(password) && /[0-9]/.test(password)){

strengthText.textContent="Strong password";
strengthText.style.color="green";

}else{

strengthText.textContent="Medium password";
strengthText.style.color="orange";

}

}


// FORM VALIDATION

function validateForm(event){

event.preventDefault();

let phone = document.getElementById("phone").value;

let error = document.getElementById("phone-error");

if(!validatePhone(phone)){

error.textContent="Enter valid Kenyan number (+2547XXXXXXXX)";
return;

}

error.textContent="";

alert("Farmer registration submitted!");

}