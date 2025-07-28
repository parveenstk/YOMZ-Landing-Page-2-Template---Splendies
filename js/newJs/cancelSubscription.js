// form elements
const form = document.getElementById('cancel-subscription-form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email-address');
const phoneNumber = document.getElementById('phone-number');
const orderId = document.getElementById('order-id');
const commentBox = document.getElementById('comments-box');
const successMessage = document.getElementById('successfull-message');

// Regax patterns
const regexPatterns = {
    'full-name': {
        regex: /^[a-zA-ZÀ-ÿ' -]{2,50}$/,
        clean: /[^a-zA-ZÀ-ÿ' -]/g,
        error: "Full name should be 2–20 letters only.",
    },

    'email-address': {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        clean: /[^a-zA-Z0-9@._%+-]/g,
        error: "Please enter a valid email address."
    },

    'phone-number': {
        regex: /^\d{10,15}$/,
        clean: /[^\d]/g,
        error: "Please enter a valid phone number (10–15 digits)."
    },

    'order-id': {
        regex: /^[a-zA-Z0-9#$\[\]]+$/,
        clean: /[^a-zA-Z0-9#$\[\]]/g,
        error: "Please see on the invoice."
    },
};

const fields = [fullName, email, phoneNumber, orderId];

// Run after all the elements loaded on the page
document.addEventListener('DOMContentLoaded', function () {

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // console.log('Form submit triggered');

        let hasError = false;
        fields.forEach(field => {
            const isValid = validateField(field);
            if (!isValid) hasError = true;
        });

        if (hasError) {
            console.log("❌ : Please, fill the required fields.");
            return;
        }

        const cancelSubsData = {
            fullName: fullName.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            orderId: orderId.value,
            commentBox: commentBox.value
        };

        console.log("✅ : form successfully submitted.");
        window.localStorage.setItem('cancelledEmails', JSON.stringify(cancelSubsData));
        const finalValues = JSON.parse(localStorage.getItem('cancelledEmails'));
        console.log('finalValues:', finalValues);
        updateSheet(finalValues);

        resetform();
        hideMessage();
    });

    // Handle Input Change
    fields.forEach((field) => {
        field.addEventListener('input', handleChange)
    })

});

// Validation function
const validateField = (field) => {
    let value = field.value.trim();
    const fieldId = field.id;
    const errorSpan = document.getElementById(`${fieldId}-error`);
    // const pattern = Patterns[fieldId];

    // Checking Empty input
    if (value === '') {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        errorSpan.classList.remove('hide');
        errorSpan.innerText = 'This field is required.'
        return false;
    }

    // If validation is successful
    console.log(`${fieldId} passed validation.`);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    errorSpan.classList.add('hide');
    errorSpan.innerText = '';
    return true;
}

// Clean all the inputs
const resetform = () => {
    const fields = [fullName, email, phoneNumber, orderId, commentBox];
    fields.forEach((field) => {
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid');
        successMessage.classList.remove('hide');
    })
};

// Hide message function
const hideMessage = () => {
    setTimeout(() => {
        successMessage.classList.add('hide');
    }, 4000)
};

// checking value while input
const handleChange = (e) => {
    const { name } = e.target;
    console.log("name:", name);

    let { value } = e.target;
    const pattern = regexPatterns[name];
    // console.log('pattern:', pattern);

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
                errorElement.textContent = pattern.error ? pattern.error : pattern.invalid;
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

// Call API to save data in excel sheet
const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: formData,
        sheetName: "Funnel Page - 2",
        column: "!E4:J4"
    });

    const requestOptions = {
        method: "POST",
        // method: "OPTIONS",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        await fetch("https://yomz-pages-data.vercel.app/api/cancelSubscription", requestOptions)
            // await fetch("http://localhost:3000/api/cancelSubscription", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    } catch (error) {
        console.warn(error)
    }
};