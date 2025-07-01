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

    const parent = document.getElementById('additionalProducts');
    let finalHTML = '';
    additionalProducts.forEach(product => {
        // Check if it exist in cart
        const existing = cartProducts.find(p => p.id === product.id);
        if (existing) return;
        const html = `
            <div id="${product.id}" class="cart-box-bottom">
                <div class="items">
                    <div class="text-center items-image">
                        <img src="${product.image}">
                    </div>
                    <div class="items-price">
                        <div class="prdt-name">${product.title}<span>(${product.description})</span></div>
                        <div class="prdt-price">$${product.price}</div>
                    </div>
                </div>
                <div class="text-center items-btn">
                    <button type="button" class="btn btn-primary" onClick='addProduct("${product.id}")'>ADD</button>
                </div>
            </div>
        `

        finalHTML += html;
    });

    parent && (parent.innerHTML = finalHTML);
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
    cartProducts.forEach(product => {
        const updatedProductHTML = `
        <div class="pro-box">
            <span class="details-close-icon product-cross">
                <i onClick="removeProduct('${product.id}')" style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
            </span>
            <span class="products-ds">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
            </span>
            <span class="products-tag-price">$${product.price}</span>
        </div>
        <hr />
    `;

        desktopFinalHTML += updatedProductHTML;

        // Update Product - Mobile (Image, title, description & price)
        const updatedProductHTML2 = `
                        <div class="pro-box">
                            <span class="products-cart-image">
                                <img id="mobile-pack-image" src=${product.image} class="img-fluid">
                            </span>
                            <span class="products-ds">
                                <h4>${product.title}</h4>
                                <p>${product.description}</p>
                            </span>

                            <span class="details-close-icon">
                                 <i style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
                            </span>
                        </div>
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
    console.log("Retrieved cartDat:", cartData);
    console.log("Retrieved selected pack:", selectedPack);

    // Elements to dynamically update - Desktop
    const packImage = document.getElementById('pack-image');
    const cartPrice = document.getElementById('total-cart-price');

    // Mobile Elements
    const packImageMobile = document.getElementById('mobile-pack-image');
    const cartTotalMobile = document.getElementById('mobile-total-cartPrice');
    const cartPriceMobile = document.querySelector('.mobCartAmount');

    // Update "Package image dynamically"
    packImage.src = selectedPack.image;
    packImageMobile.src = selectedPack.image;
    cartPrice.innerText = `$${selectedPack.price}`;
    cartPriceMobile.innerText = selectedPack.price;
    cartTotalMobile.innerText = `$${selectedPack.price}`;

    // Update Cart list
    updateCartList();
} else {
    console.log("No selected pack found in localStorage.");
};

// updateAdditional products
updateAdditionalHTML();

// UpdateCartData
const updateCart = (addProduct) => {
    const oldCartData = JSON.parse(localStorage.getItem('cartData'));
    const existingProduct = oldCartData.find(product => product.id === addProduct.id);
    if (existingProduct) return;
    const updatedCartData = [...oldCartData, addProduct];
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));
}

const removeProduct = (id) => {
    const oldCartData = JSON.parse(localStorage.getItem('cartData'));
    const updatedCartData = oldCartData.filter(p => p.id !== id);
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));

    // Re-render HTML
    updateCartList();
    updateAdditionalHTML();
};

// To add a new product in the cart
const addProduct = (id) => {
    const selectedProduct = additionalProducts.find(product => product.id === id);
    updateCart(selectedProduct);
    updateCartList();
    updateAdditionalHTML();
};

// Event listener for closing the product box when clicking on the close icon
document.addEventListener('click', (e) => {
    if (e.target.closest('.product-cross')) {
        const box = e.target.closest('.new-product');
        if (box) box.remove();  // Remove the product card when close button is clicked
    }
});