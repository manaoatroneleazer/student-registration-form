// Pure validation function independent of the DOM
function validateStudentInfo(name, studentNumber, email) {
    const trimmedName = name ? name.trim() : "";
    const hasMinLength = trimmedName.length >= 3;
    const isNotSpacesOnly = trimmedName.length > 0;
    const hasNoNumbers = !/\d/.test(trimmedName);

    const studentNumberRegex = /^\d{2}-\d{4}-\d{3}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isNameValid = hasMinLength && isNotSpacesOnly && hasNoNumbers;
    const isStudentNumberValid = studentNumberRegex.test(studentNumber);
    const isEmailValid = emailRegex.test(email);

    return isNameValid && isStudentNumberValid && isEmailValid;
}

// DOM Initialization and Event Handling
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const studentNameInput = document.getElementById("studentName");
    const studentNumberInput = document.getElementById("studentNumber");
    const emailInput = document.getElementById("email");
    const workshopSelect = document.getElementById("workshop");
    const termsCheckbox = document.getElementById("terms");

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

    // Initially hide registration result container
    registrationResult.style.display = "none";

    function clearErrors() {
        nameError.textContent = "";
        studentNumberError.textContent = "";
        emailError.textContent = "";
        workshopError.textContent = "";
        termsError.textContent = "";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();

        const nameVal = studentNameInput.value;
        const studentNumVal = studentNumberInput.value;
        const emailVal = emailInput.value;
        const workshopVal = workshopSelect.value;
        const termsChecked = termsCheckbox.checked;

        let isValid = true;

        // Name validation checks
        const trimmedName = nameVal.trim();
        if (trimmedName.length < 3 || /\d/.test(trimmedName)) {
            nameError.textContent = "Enter a valid student name.";
            isValid = false;
        }

        // Student Number validation check
        const studentNumberRegex = /^\d{2}-\d{4}-\d{3}$/;
        if (!studentNumberRegex.test(studentNumVal)) {
            studentNumberError.textContent = "Enter a valid student number.";
            isValid = false;
        }

        // Email validation check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            emailError.textContent = "Enter a valid email address.";
            isValid = false;
        }

        // Workshop selection check
        if (!workshopVal || workshopVal === "" || workshopVal === "Select Workshop") {
            workshopError.textContent = "Please select a workshop.";
            isValid = false;
        }

        // Terms check
        if (!termsChecked) {
            termsError.textContent = "You must accept the Terms and Conditions.";
            isValid = false;
        }

        // Global pure function check integration & final display action
        if (!isValid || !validateStudentInfo(nameVal, studentNumVal, emailVal)) {
            registrationResult.style.display = "none";
            return;
        }

        // All valid: display summary using textContent safely
        summaryName.textContent = nameVal.trim();
        summaryStudentNumber.textContent = studentNumVal;
        summaryEmail.textContent = emailVal;
        summaryWorkshop.textContent = workshopVal;

        registrationResult.style.display = "block";
    });

    // Clear / Complete Reset functionality
    clearBtn.addEventListener("click", () => {
        studentNameInput.value = "";
        studentNumberInput.value = "";
        emailInput.value = "";
        workshopSelect.selectedIndex = 0;
        termsCheckbox.checked = false;
        clearErrors();
        registrationResult.style.display = "none";
    });
});