// PHONE VALIDATION

function validatePhone(phone) {
  const kenyaRegex = /^\+2547\d{8}$/;

  return kenyaRegex.test(phone);
}

// CV FILE NAME DISPLAY

const fileInput = document.getElementById("cvUpload");
const fileName = document.getElementById("fileName");

fileInput.addEventListener("change", function () {
  if (this.files.length > 0) {
    fileName.textContent = "Uploaded: " + this.files[0].name;
  }
});

// FORM VALIDATION

const form = document.getElementById("jobForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let phone = document.getElementById("phone").value;
  let error = document.getElementById("phone-error");

  if (!validatePhone(phone)) {
    error.textContent = "Enter valid Kenyan number (+2547XXXXXXXX)";
    return;
  }

  error.textContent = "";

  document.getElementById("successMsg").innerHTML =
    "<div class='success'>Application submitted successfully 🎉</div>";

  form.reset();
});
