// Form inputs 
const email = document.getElementById('email-address');
const password = document.getElementById('password');

// Shipping Address
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const streetAddress = document.getElementById('street-address');
const aptUnit = document.getElementById('apt-unit');
const city = document.getElementById('city');
const shippingStates = document.getElementById('shipping-states');
const shippingPostalCode = document.getElementById('postal-code');
const phoneNumber = document.getElementById('phone-number');

// Card Details
const cardNumber = document.getElementById('credit-card-number');
const cardCVC = document.getElementById('card-cvc');
const cardExpiry = document.getElementById('card-expiry');
const billingPostal = document.getElementById('billing-postal-code');
const billingStates = document.getElementById('billing-states');

// Handle form submission
const form = document.getElementById('checkout-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Prepare data object for logging and storage
    const formData = {
        "email": email.value.trim(),
        "password": password.value.trim(),
        "Shipping Address": {
            "firstName": firstName.value.trim(),
            "lastName": lastName.value.trim(),
            "streetAddress": streetAddress.value.trim(),
            "aptUnit": aptUnit.value.trim(),
            "city": city.value.trim(),
            "shippingStates": shippingStates.value.trim(),
            "shippingPostalCode": shippingPostalCode.value.trim(),
            "phoneNumber": phoneNumber.value.trim(),
        },
        "Billing Address": {
            "cardNumber": cardNumber.value.trim(),
            "cardCVC": cardCVC.value.trim(),
            "cardExpiry": cardExpiry.value.trim(),
            "billingPostal": billingPostal.value.trim(),
            "billingStates": billingStates.value.trim(),
        }
    };

    // Log form data to console
    console.log("Form Submitted:", formData);

    // Store form data in localStorage (stringify the object)
    localStorage.setItem('Form Data', JSON.stringify(formData));

    // Clear form inputs after submission
    clearFormInputs();
    console.log("Form submitted and data saved in localStorage.");
});

// Clear form inputs after submission
const clearFormInputs = () => {
    email.value = '';
    password.value = '';
    firstName.value = '';
    lastName.value = '';
    streetAddress.value = '';
    aptUnit.value = '';
    city.value = '';
    shippingPostalCode.value = '';
    phoneNumber.value = '';
    cardNumber.value = '';
    cardCVC.value = '';
    cardExpiry.value = '';
    billingPostal.value = '';
    billingStates.value = '';
}

// Utility function to add an event listener for input sanitization
const addInputListener = (element, regex, sanitizeFn = null) => {
    element.addEventListener('input', function () {
        this.value = sanitizeFn ? sanitizeFn(this.value) : this.value.replace(regex, '');
    });
};

// Shipping Address
addInputListener(firstName, /[0-9]/g);  // No numbers in first name
addInputListener(lastName, /[0-9]/g);   // No numbers in last name
addInputListener(streetAddress, /[^a-zA-Z0-9\s,.\/-]/g); // Allow alphanumeric, spaces, commas, periods, slashes, and hyphens
addInputListener(aptUnit, /[^a-zA-Z0-9\s#\-\//]/g); // Allow alphanumeric, space, and specific characters
addInputListener(city, /[0-9]/g);  // No numbers in city
addInputListener(shippingPostalCode, /\D/g);  // Only numbers for postal code
addInputListener(phoneNumber, /[^0-9+()\-\s]/g);  // Only valid phone characters

// Billing Information
addInputListener(cardNumber, /\D/g, function (value) {
    const cleanedValue = value.replace(/\D/g, ''); // Step 1: Remove all non-digit characters
    const formattedValue = cleanedValue.replace(/(.{4})(?=.)/g, '$1 ').trim(); // Step 2: Format the card number into groups of 4 digits ( Insert a space after every 4 digits )
    return formattedValue; // Step 3: Return the formatted value
});

addInputListener(cardCVC, /[a-zA-Z]/g);  // Only numbers for CVC

addInputListener(cardExpiry, /\D/g, function (value) {
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
