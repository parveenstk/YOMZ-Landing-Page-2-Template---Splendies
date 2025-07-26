// Run after all the elements loaded on the page
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cancel-subscription-form');
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email-address');
    const phoneNumber = document.getElementById('phone-number');
    const orderId = document.getElementById('order-id');
    const commentBox = document.getElementById('comments-box');

    const fields = [fullName, email, phoneNumber, orderId];

    // Regex patterns
    const patterns = {
        'full-name': /^[a-zA-Z\s]{2,20}$/,
        'email-address': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'phone-number': /^[0-9]{10}$/,
        'order-id': /^[A-Za-z0-9#$\-]{5,20}$/
    };

    // Custom error messages
    const errorMessages = {
        'full-name': {
            empty: 'Full name is required.',
            invalid: 'Full name should be 2–20 letters only.'
        },
        'email-address': {
            empty: 'Email address is required.',
            invalid: 'Please enter a valid email address.'
        },
        'phone-number': {
            empty: 'Phone number is required.',
            invalid: 'Phone number must be exactly 10 digits.'
        },
        'order-id': {
            empty: 'Order ID is required.',
            invalid: 'Order ID should be 14-18 characters (mention on your bill).'
        }
    };

    // Validation function
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldId = field.id;
        const errorSpan = document.getElementById(`${fieldId}-error`);
        const messages = errorMessages[fieldId];
        const pattern = patterns[fieldId];

        // Checking Empty input
        if (value === '') {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            errorSpan.classList.remove('hide');
            errorSpan.innerText = messages.empty;
            return false;
        }

        // Checking regax
        if (pattern && !pattern.test(value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            errorSpan.classList.remove('hide');
            errorSpan.innerText = messages.invalid;
            return false;
        }

        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        errorSpan.classList.add('hide');
        errorSpan.innerText = '';
        return true;
    }

    // Real-time validation listeners
    fields.forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });

    // Handle form submit
    form.addEventListener('submit', function (event) {
        event.preventDefault();

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

        resetform();
    });

    const resetform = () => {
        fields.concat(commentBox).forEach(field => {
            field.value = '';
            field.classList.remove('is-valid', 'is-invalid');
            const errorSpan = document.getElementById(`${field.id}-error`);
            if (errorSpan) {
                errorSpan.classList.add('hide');
                errorSpan.innerText = '';
            }
        });
    };
});
