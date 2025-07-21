// Elements - Input, button etc.
// const form = document.getElementById('subs-form');
const subsInput = document.getElementById('subscribe-input');
const sheetName = document.getElementById('subscribe-input').getAttribute('name');
const submitBtn = document.getElementById('subscribe-submit');

// message box
const boxImg = document.getElementById('message-img');
const innerMessage = document.getElementById('inner-message');
const messageBox = document.getElementById('message-box');

// email regax
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Handle email submission
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = subsInput.value.trim();

    if (isValidEmail(email)) {
        messageBox.classList.remove('hide');
        subsInput.classList.remove('is-invalid');
        subsInput.classList.add('is-valid');

        // saved in the localStorage
        window.localStorage.setItem('subscribedEmail', email);
        const mail = localStorage.getItem('subscribedEmail');
        mail ? (console.log('subscribedEmail:', mail)) : console.log("email not saved in localStorage.");

        saveEmail(email);
        updateBox('success'); // udpadating box
        hideBox();

        subsInput.value = '';
        subsInput.classList.remove('is-valid', 'is-invalid');
    } else {
        messageBox.classList.remove('hide');
        subsInput.classList.add('is-invalid');
        subsInput.classList.remove('is-valid');

        updateBox('error');  // udpadating box
    }
});

// Live update the classes for better user experience
subsInput.addEventListener('input', function () {
    const value = subsInput.value.trim();

    // condition for regax match
    if (value.length > 0 && isValidEmail(value)) {
        subsInput.classList.remove('is-invalid')
        subsInput.classList.add('is-valid')
    } else {
        subsInput.classList.remove('is-valid')
        subsInput.classList.add('is-invalid')
    }

    // condition while filling 
    if (value.length > 0 && !isValidEmail(value)) {
        messageBox.classList.add('hide');
        subsInput.classList.remove('is-invalid');
        subsInput.classList.add('subs-input')
    } else {
        subsInput.classList.remove('subs-input');
        subsInput.classList.add('is-valid');
    }
});

const messageStatus = {
    'error': {
        backgroundColor: '#e55a5a',
        text: 'Enter your email to subscribe',
        img: './images/error.svg'
    },

    'success': {
        backgroundColor: '#4c9922',
        text: 'Thank you, email is submitted',
        img: './images/success.svg'
    }
}

// udpate message box according to the status
const updateBox = (stts) => {
    const data = messageStatus[stts]
    messageBox.style.backgroundColor = data.backgroundColor;
    boxImg.src = data.img;
    innerMessage.innerText = data.text;
};

// hide the box
const hideBox = () => {
    setTimeout(() => {
        messageBox.classList.add('hide')
    }, 2000)
};

// API call to update the email addres in "excel sheet"
const url = 'https://yomz-pages-data.vercel.app/api/data';
const saveEmail = async (email) => {
    const response = await fetch(`${url}?email=${email}&sheetName=${sheetName}&column=!B4:C4`, {
        method: 'GET'
    }).then(res => res.json());

    console.log("response:", response)
};