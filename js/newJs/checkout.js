// Additional Products
const additionalProducts = [
    {
        id: 'add1',
        title: "YOMZ Original",
        description: "(for fans of tart & tangy)",
        price: 47.99,
        image: "images/checkout/bag-1.png"
    },
    {
        id: 'add2',
        title: "YOMZ Original",
        description: "(for fans of tart & tangy)",
        price: 47.99,
        image: "images/checkout/bag-1.png"
    },
    {
        id: 'add3',
        title: "YOMZ Original",
        description: "(for fans of tart & tangy)",
        price: 47.99,
        image: "images/checkout/bag-1.png"
    }
];

// Updated Additional product in hmtl
const updateAdditionalHTML = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartData'));

    // Additional Products
    const parent = document.getElementById('additionalProducts');
    const parent2 = document.getElementById('additionalProducts2');
    let finalHTML = '';
    let finalHTML2 = '';
    additionalProducts.forEach(product => {
        // Check if it exist in cart
        const existing = cartProducts.find(p => p.id === product.id);

        // Desktops Products
        if (existing) return;
        const html = `
            <div id="${product.id}" class="cart-box-bottom">
                <div class="items">
                    <div class="text-center items-image">
                        <img src="${product.image}">
                    </div>
                    <div class="items-price">
                        <div class="prdt-name">${product.title}
                            <span>${product.description}</span>
                        </div>
                        <div class="prdt-price">$${product.price}</div>
                    </div>
                </div>
                <div class="text-center items-btn">
                    <button type="button" class="btn btn-primary" onClick='addProduct("${product.id}")'>ADD</button>
                </div>
            </div>
        `

        // Mobile Products
        if (existing) return;
        const html2 = `
            <div id="${product.id}" class="cart-box-bottom">
                <div class="items">
                    <div class="text-center items-image">
                        <img src="${product.image}">
                    </div>
                    <div class="items-price">
                        <div class="prdt-name">${product.title}
                            <span>${product.description}</span>
                        </div>
                        <div class="prdt-price">$${product.price}</div>
                    </div>
                </div>
                <div class="text-center items-btn">
                    <button type="button" class="btn btn-primary" onClick='addProduct("${product.id}")'>ADD</button>
                </div>
            </div>
        `

        finalHTML += html;
        finalHTML2 += html2;
    });

    parent && (parent.innerHTML = finalHTML);
    parent2 && (parent2.innerHTML = finalHTML2);
};

// Get the selected pack from localStorage
const cartData = JSON.parse(localStorage.getItem('cartData'));
const selectedPackId = JSON.parse(localStorage.getItem('selectedPack'));
const selectedPack = cartData.find(product => product.id === selectedPackId);

// Update Cart HTML
const updateCartList = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartData'));

    let desktopFinalHTML = '';
    let mobileFinalHTML = '';

    // Desktop
    cartProducts.forEach((product, i) => {
        const updatedProductHTML = `
        <div class="pro-box">
        ${i !== 0 ? `
            <span class="details-close-icon product-cross">
                <i onClick="removeProduct('${product.id}')" style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
            </span>` : ''} 

            <span class="products-ds">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
            </span>
            <span class="products-tag-price">$${product.price}</span>
        </div>
        <hr />
    `;

        desktopFinalHTML += updatedProductHTML;

        // Mobile
        const updatedProductHTML2 = `
                <div id="exited-product-mobile">
                        <div class="pro-box">
                            <span class="products-cart-image"> <img id="mobile-pack-image" src=${product.image} class="img-fluid"> </span>
                            <span class="products-ds">
                                <h4>${product.title}</h4>
                            <p>${product.description}</p>
                            </span>

                             ${i !== 0 ? `
                        <span class="details-close-icon product-cross">
                            <i onClick="removeProduct('${product.id}')" style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
                        </span>` : ''} 
                        </div>
                    </div>
                <hr />
    `;

        mobileFinalHTML += updatedProductHTML2;
    })

    // Updating - Desktop Cart Details
    const existedProd = document.getElementById('exited-product');
    existedProd && (existedProd.innerHTML = desktopFinalHTML);

    // Updating - Mobile Cart Details
    const existedProd2 = document.getElementById('exited-product-mobile');
    existedProd2 && (existedProd2.innerHTML = mobileFinalHTML);
}

// Check if the selected pack exists in localStorage
if (selectedPack) {
    console.log("Retrieved cartData:", cartData);
    console.log("Retrieved selected pack:", selectedPack);

    // Elements to dynamically update - Desktop
    const packImage = document.getElementById('pack-image');

    // Mobile Elements
    const packImageMobile = document.getElementById('mobile-pack-image');

    // Update "Package image dynamically"
    packImage.src = selectedPack.image;
    packImageMobile.src = selectedPack.image;

    // Update Cart list
    updateCartList();
} else {
    console.log("No selected pack found in localStorage.");
};

// Update Total of Cart
const updateTotal = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const cartPrice = document.getElementById('total-cart-price');
    const cartTotalMobile = document.getElementById('mobile-total-cartPrice');
    const cartPriceMobile = document.querySelector('.mobCartAmount');
    const totalPrice = cartData.reduce((total, product) => total += Number(product.price), 0);
    cartPrice.innerText = `$${(+totalPrice).toFixed(2)}`;
    cartPriceMobile.innerText = `${(+totalPrice).toFixed(2)}`;
    cartTotalMobile.innerText = `$${(+totalPrice).toFixed(2)}`;
}

// updateAdditional products
updateAdditionalHTML();

// Update total of carts ( Desktop & Mobile )
updateTotal();

// Update Cart Quantity
const cartQty = () => {
    const cartQty = document.getElementById('cart-quantity');
    const latestCart = JSON.parse(localStorage.getItem('cartData'));
    cartQty.innerHTML = `(${latestCart.length}) Cart`
};

cartQty(); // function call to updated first time

// UpdateCartData
const updateCart = (addProduct) => {
    const oldCartData = JSON.parse(localStorage.getItem('cartData'));
    console.log('oldCartData:', oldCartData);

    const existingProduct = oldCartData.find(product => product.id === addProduct.id);
    if (existingProduct) return;
    const updatedCartData = [...oldCartData, addProduct];
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));
};

const removeProduct = (id) => {
    const oldCartData = JSON.parse(localStorage.getItem('cartData'));
    // console.log("oldCartData:", oldCartData);
    updatedToaster('removed');

    const updatedCartData = oldCartData.filter(p => p.id !== id);
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));

    // Re-render HTML
    updateCartList();
    updateAdditionalHTML();
    updateTotal();
    cartIcon();
    cartQty();
};

// To add a new product in the cart
const addProduct = (id) => {
    const selectedProduct = additionalProducts.find(product => product.id === id);
    updateCart(selectedProduct);
    updatedToaster('added');
    updateCartList();
    updateAdditionalHTML();
    updateTotal();
    cartIcon();
    cartQty();
};

// Event listener for closing the product box when clicking on the close icon
document.addEventListener('click', (e) => {
    if (e.target.closest('.product-cross')) {
        const box = e.target.closest('.new-product');
        if (box) box.remove();  // Remove the product card when close button is clicked
    }
});

const cartIcon = () => {
    const latestCart = JSON.parse(localStorage.getItem('cartData'));
    const cartCount = document.querySelector('.count-value');
    // console.log('latestCart:', latestCart.length);
    // console.log('cartCount length:', cartCount.innerText);
    cartCount.innerText = latestCart.length;
};

cartIcon();

// Toaster elements
const toaster = document.getElementById('toaster');
const toasterIcon = document.getElementById('toaster-icon');
const toasterText = document.getElementById('toaster-text');
const toasterCross = document.getElementById('toaster-cross');

// Function to updated toaster dynamically
const updatedToaster = (type) => {
    toaster.classList.remove('hide');
    toaster.style.border = toasterContent[type].border;
    toaster.style.backgroundColor = toasterContent[type].backGround;
    toasterText.style.color = toasterContent[type].textColor;
    toasterIcon.src = toasterContent[type].iconPath;
    toasterText.innerText = toasterContent[type].textContent;

    setTimeout(() => {
        autoHide()
    }, 2000);
};

// Toaster Message
const toasterContent = {
    added: {
        iconPath: './images/checkout/check-tick.svg',
        textContent: 'Item added in cart.',
        textColor: '#31ab46',
        backGround: '#e5ffe8',
        border: '2px solid #31ab46',
        crossIcon: './images/checkout/cross.svg'
    },

    removed: {
        iconPath: './images/checkout/cross-circle.svg',
        textContent: 'Item removed form cart.',
        textColor: '#d24349',
        backGround: '#fde1e4',
        border: '2px solid #d24349',
        crossIcon: './images/checkout/cross.svg'
    }
};

// Hide toaster
const autoHide = () => {
    toaster.classList.add('hide');
};

// Eye toggle function
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Optionally switch icons (e.g., to eye-close)
    this.src = type === 'password' ? './images/checkout/eye-open.svg' : './images/checkout/eye-closed.svg';
});
