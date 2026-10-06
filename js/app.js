const registrationForm = document.getElementById("registrationForm");
const studentName = document.getElementById("studentName");
const studentNumber = document.getElementById("studentNumber");
const email = document.getElementById("email");
const workshop = document.getElementById("workshop");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const studentNumberError = document.getElementById("studentNumberError");
const emailError = document.getElementById("emailError");
const workshopError = document.getElementById("workshopError");
const termsError = document.getElementById("termsError");

const registerBtn = document.getElementById("registerBtn");
const clearBtn = document.getElementById("clearBtn");
const registrationResult = document.getElementById("registrationResult");

const summaryName = document.getElementById("summaryName");
const summaryStudentNumber = document.getElementById("summaryStudentNumber");
const summaryEmail = document.getElementById("summaryEmail");
const summaryWorkshop = document.getElementById("summaryWorkshop");

registrationResult.hidden = true;

function validateStudentInfo(name, studentNumber, email) {
if (typeof name !== "string" || typeof studentNumber !== "string" || typeof email !== "string") {
return false;
}

const validName = name.trim().length >= 3 && !/\d/.test(name.trim()) && !/^\s+$/.test(name);
const validStudentNumber = /^\d{2}-\d{4}-\d{3}$/.test(studentNumber.trim());
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

return validName && validStudentNumber && validEmail;
}

registrationForm.addEventListener("submit", function (event) {
event.preventDefault();

nameError.textContent = "";
studentNumberError.textContent = "";
emailError.textContent = "";
workshopError.textContent = "";
termsError.textContent = "";
registrationResult.hidden = true;

const validInfo = validateStudentInfo(
studentName.value,
studentNumber.value,
email.value
);

const validName = typeof studentName.value === "string" &&
studentName.value.trim().length >= 3 &&
!/\d/.test(studentName.value.trim()) &&
!/^\s+$/.test(studentName.value);

const validStudentNumber = /^\d{2}-\d{4}-\d{3}$/.test(studentNumber.value.trim());
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
const validWorkshop = workshop.value.trim() !== "";
const validTerms = terms.checked;

if (!validName) {
nameError.textContent = "Enter a valid student name.";
}

if (!validStudentNumber) {
studentNumberError.textContent = "Enter a valid student number.";
}

if (!validEmail) {
emailError.textContent = "Enter a valid email address.";
}

if (!validWorkshop) {
workshopError.textContent = "Please select a workshop.";
}

if (!validTerms) {
termsError.textContent = "You must accept the Terms and Conditions.";
}

if (validInfo && validWorkshop && validTerms) {
summaryName.textContent = studentName.value.trim();
summaryStudentNumber.textContent = studentNumber.value.trim();
summaryEmail.textContent = email.value.trim();
summaryWorkshop.textContent = workshop.options[workshop.selectedIndex].textContent;
registrationResult.hidden = false;
}
});

clearBtn.addEventListener("click", function () {
registrationForm.reset();

nameError.textContent = "";
studentNumberError.textContent = "";
emailError.textContent = "";
workshopError.textContent = "";
termsError.textContent = "";

summaryName.textContent = "";
summaryStudentNumber.textContent = "";
summaryEmail.textContent = "";
summaryWorkshop.textContent = "";

registrationResult.hidden = true;
});