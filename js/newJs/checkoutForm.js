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
form.addEventListener('submit', function (e) {
    e.preventDefault();

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
    if (!isValid) {
        console.log("Form not submitted. Validation failed.");
        return; // Stop further processing
    } else {
        window.location.href = './offer1.html'
    }

    // Proceed if form is valid
    console.log("Form Submitted:", formData);
    localStorage.setItem('Form Data', JSON.stringify(formData));
    clearFormInputs(); // clear all the values of input
    console.log("Form submitted and data saved in localStorage.");
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
addInputListener(formElements.firstName, /[0-9]/g);  // No numbers in first name
addInputListener(formElements.lastName, /[0-9]/g);   // No numbers in last name
addInputListener(formElements.streetAddress, /[^a-zA-Z0-9\s,.\-\/]/g); // Alphanumeric, spaces, commas, periods, hyphens, slashes
addInputListener(formElements.aptUnit, /[^a-zA-Z0-9\s#\-\/]/g); // Alphanumeric, space, #, -, /
addInputListener(formElements.city, /[0-9]/g);  // No numbers in city
addInputListener(formElements.postalCode, /\D/g);  // Only numbers for postal code
addInputListener(formElements.phoneNumber, /[^0-9+()\-\s]/g);  // Valid phone characters

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

    // Step 2: Limit input to 4 digits (MMYY format) without including the separator
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

        // console.log("value:", value);

        const errorElement = formElements[key + '_error'];
        // console.log('errorElement:', errorElement);

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

// Get all input fields and error messages
const inputFields = document.querySelectorAll('.input-field');
const inputSelectors = document.querySelectorAll('.input-selector');
const inputErrors = document.querySelectorAll('.error-message');

// console.log('inputFields:', inputFields);
// console.log('inputSelectors:', inputSelectors);

// Loop through each input field
inputFields.forEach((inputField, index) => {
    const errorMessageEl = inputErrors[index];

    // Input event: validate as user types
    inputField.addEventListener('input', function () {
        const inputValue = inputField.value;

        if (inputValue.length > 0) {
            inputField.style.borderColor = 'green';
            inputField.classList.add('is-valid');
            inputField.classList.replace('is-invalid', 'is-valid');
            errorMessageEl.classList.add('hide');
        } else {
            inputField.style.borderColor = 'red';
            inputField.classList.replace('is-valid', 'is-invalid');
            errorMessageEl.classList.remove('hide');
            errorMessageEl.innerText = 'This field is required';
        }
    });

    // Blur event: check when user leaves the field
    inputField.addEventListener('blur', function () {
        const inputValue = inputField.value.trim();

        if (inputValue === '') {
            inputField.style.borderColor = 'red';
            inputField.classList.remove('is-valid');
            inputField.classList.add('is-invalid');
            errorMessageEl.classList.remove('hide');
            errorMessageEl.innerText = 'This field is required';
        }
    });
});

// Get elements of footer ( subscribe input )
const subsForm = document.getElementById('form-subscribe');
const subsInput = document.getElementById('subscribe-input');

// Handle input typing
subsInput.addEventListener('input', function () {
    const subsValue = subsInput.value;
    console.log('subsValue:', subsValue);
});

// Handle form submission
subsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submittedValue = subsInput.value;
    console.log('Form submitted with:', submittedValue);
});