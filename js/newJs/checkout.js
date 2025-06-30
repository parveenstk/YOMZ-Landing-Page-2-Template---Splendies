// Get query string from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const packageParam = urlParams.get('package'); // renamed from `package`

// Elements to dynamically update
const packImage = document.getElementById('pack-image');
const cartPrice = document.getElementById('total-cart-price');
const cartPriceMobile = document.querySelector('.mobCartAmount');
console.log("cartPriceMobile:", cartPriceMobile);

// Updating "Package image dynamically"
if (packageParam === '3-people') {
    packImage.src = './images/checkout/bag-3.png';
    cartPrice.innerText = "$ 129.58";
    cartPriceMobile.innerText = 129.58;
} else if (packageParam === '1-person') {
    packImage.src = './images/checkout/bag-1.png';
    cartPrice.innerText = "$ 47.99";
    cartPriceMobile.innerText = 47.99;
}

// Packs data to update dynamically
const packs = {
    '1-person': {
        title: "YOMZ Original",
        description: "1 Person (1 bag)",
        price: 47.99
    },
    '3-people': {
        title: "YOMZ Original",
        description: "3 People Set (3 bags)",
        price: 129.58
    },
};

// Update Product (Image, title, description & price)
const updatedPack = (packKey) => {
    const product = packs[packKey];

    if (product) {
        const updatedProductHTML = `
            <div class="pro-box">
                <span class="details-close-icon product-cross"><i style="color: #e5183c;" class="fas fa-times-circle cursor"></i></span>
                <span class="products-ds">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                </span>
                <span class="products-tag-price">$${product.price}</span>
            </div>
        `;

        const existedProd = document.getElementById('exited-product');
        if (existedProd) {
            existedProd.innerHTML = updatedProductHTML;
        };
    };
};

// udpatding the all details
updatedPack(packageParam);

const hideProduct = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const crossElements = document.querySelectorAll('.product-cross');

        crossElements.forEach(cross => {
            cross.addEventListener('click', (e) => {
                e.preventDefault(); // prevent the <a href=""> from reloading the page

                // Find the closest .pro-box ancestor and hide it
                const proBox = cross.closest('.pro-box');
                if (proBox) {
                    proBox.classList.add('hide');
                }
            });
        });
    });
};

// To add a new product in the cart
const addProduct = () => {
    const cart = document.getElementById('exited-product');
    if (!cart) return;

    // HTML template for the product
    const newProductHTML = `
    <div class="new-product">
        <hr>
        <div class="pro-box">
            <span class="details-close-icon product-cross">
                <i style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
            </span>
            <span class="products-ds">
                <h4>YOMZ Original</h4>
                <p>1 Person (1 bag)</p>
            </span>
            <span class="products-tag-price">$47.99</span>
        </div>
    </div>
    `;

    // Append the new product box to the cart
    cart.insertAdjacentHTML('beforeend', newProductHTML);
};

// Event listener for closing the product box when clicking on the close icon
document.addEventListener('click', (e) => {
    if (e.target.closest('.product-cross')) {
        const box = e.target.closest('.new-product');
        if (box) box.remove();  // Remove the product card when close button is clicked
    }
});
