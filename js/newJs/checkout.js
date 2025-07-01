// Get the selected pack from localStorage
const selectedPack = JSON.parse(localStorage.getItem('selectedPack'));

// Check if the selected pack exists in localStorage
if (selectedPack) {
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

    // Update Product - Desktop (Image, title, description & price)
    const updatedProductHTML = `
        <div class="pro-box">
            <span class="details-close-icon product-cross">
                <i style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
            </span>
            <span class="products-ds">
                <h4>${selectedPack.title}</h4>
                <p>${selectedPack.description}</p>
            </span>
            <span class="products-tag-price">$${selectedPack.price}</span>
        </div>
    `;

    // Update Product - Mobile (Image, title, description & price)
    const updatedProductHTML2 = `
                        <div class="pro-box">
                            <span class="products-cart-image">
                                <img id="mobile-pack-image" src=${selectedPack.image} class="img-fluid">
                            </span>
                            <span class="products-ds">
                                <h4>${selectedPack.title}</h4>
                                <p>${selectedPack.description}</p>
                            </span>

                            <span class="details-close-icon">
                                 <i style="color: #e5183c;" class="fas fa-times-circle cursor"></i>
                            </span>
                        </div>
    `;

    // Updating - Desktop Cart Details
    const existedProd = document.getElementById('exited-product');
    existedProd && (existedProd.innerHTML = updatedProductHTML);

    // Updating - Mobile Cart Details
    const existedProd2 = document.getElementById('exited-product-mobile');
    existedProd2 && (existedProd2.innerHTML = updatedProductHTML2);

} else {
    console.log("No selected pack found in localStorage.");
};

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