// Form Elements
const form = document.getElementById('contactUs-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const phoneNumber = document.getElementById('phone-number');
const email = document.getElementById('email-address');
const subjects = document.getElementById('subjects');
const commentBox = document.getElementById('comments-box');
const successMess = document.getElementById('contactUs-success');

const requiredFields = [firstName, email, subjects, commentBox];
const regaxFields = [firstName, lastName, phoneNumber, email, subjects, commentBox];

// Regax patterns
const regexPatterns = {
    'first-name': {
        regex: /^[a-zA-ZÀ-ÿ' -]{2,50}$/,
        clean: /[^a-zA-ZÀ-ÿ' -]/g,
        error: "First name should be 2 to 14 letters only"
    },

    'last-name': {
        regex: /^[a-zA-ZÀ-ÿ' -]{2,50}$/,
        clean: /[^a-zA-ZÀ-ÿ' -]/g,
        error: "Last name should be 2 to 14 letters only"
    },

    'phone-number': {
        regex: /^\d{10,15}$/,
        clean: /[^\d]/g,
        error: "phone number between (10–15 digits)."
    },

    'email-address': {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        clean: /[^a-zA-Z0-9@._%+-]/g,
        error: "Please enter a valid email address"
    },

    'subjects': {
        regex: /^(?!\s*$).+/,
        clean: null, // No cleaning needed for a select input
        error: "Please write about the subject"
    },

    'comments-box': {
        regex: /^.{10,1000}$/,
        clean: null, // Free text; we allow everything reasonable
        error: "Comment must be between 10 and 1000 characters"
    }
};

document.addEventListener('DOMContentLoaded', function () {

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevent page refresh
        console.log("form submit triggered.");

        let hasError = false;
        requiredFields.forEach(field => {
            const invalid = checkField(field);
            if (!invalid) hasError = true;
        });

        // If there is any error, stop form processing
        if (hasError) {
            console.log("❌ : Please, fill the required fields.");
            return;
        }

        const contactUsData = {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            subjects: subjects.value,
            commentBox: commentBox.value,
        }

        console.log("✅ : form successfully submitted.");
        window.localStorage.setItem('contactUsDetails', JSON.stringify(contactUsData));
        const submittedData = JSON.parse(localStorage.getItem('contactUsDetails'));
        console.log('submittedData:', submittedData);

        successMess.classList.remove('hide');
        hideMessage();
        resetForm();
    });

    // Handle Input Change
    regaxFields.forEach((field) => {
        field.addEventListener('input', handleChange)
    })
});

// Reset all the values
const resetForm = () => {
    const fields = [firstName, lastName, phoneNumber, email, subjects, commentBox];
    fields.forEach(field => {
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid')
        console.log("All the values cleaned.");
    })
};

// Hide success message
const hideMessage = () => {
    setTimeout(() => {
        successMess.classList.add('hide');
    }, 4000);
};

// Check values 
const checkField = (field) => {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorSpan = document.getElementById(`${fieldId}-error`);

    if (!value) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        errorSpan.classList.remove('hide');
        errorSpan.innerText = 'This field is required';
        return false; // Field is invalid
    } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        errorSpan.classList.add('hide');
        errorSpan.innerText = '';
        return true; // Field is valid
    }
};

// checking value while input
const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    const pattern = regexPatterns[name];

    if (pattern) {
        // Clean unwanted characters (e.g., letters in phone)
        const cleanedValue = value.replace(pattern.clean, '');

        // Update input field to show cleaned value
        e.target.value = cleanedValue;

        const errorElement = document.getElementById(`${name}-error`);
        const outputElement = document.getElementById(name);

        // Validate final cleaned value
        const isValid = pattern.regex.test(cleanedValue);

        if (!isValid) {
            if (errorElement) {
                errorElement.textContent = pattern.error;
                errorElement.classList.remove('hide');
                outputElement.classList.remove('is-valid');
                outputElement.classList.add('is-invalid');
            }
        } else {
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hide');
                outputElement.classList.add('is-valid');
                outputElement.classList.remove('is-invalid');
            }
        }

        // Always update the display value
        if (outputElement) {
            outputElement.innerText = cleanedValue;
        }
    }
};