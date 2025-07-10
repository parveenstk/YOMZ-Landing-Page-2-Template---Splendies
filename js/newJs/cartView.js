// Getting data from localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartData'));
const seletedPackId = JSON.parse(localStorage.getItem('selectedPack'));
const selectedPack = cartProducts && cartProducts.find(product => product.id === seletedPackId);

// Elements to update
const cartQty = document.getElementById('cart-quantity');

// Updating the cart
const updateCart = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartData'));
    let newProduct = '';

    cartProducts.forEach((product, index) => {
        const updatedProduct = `
            <div class="row cart-table">
                <div class="col-sm-7 cart-td">
                    <div class="product-label">
                        <figure class="thumb product-image-thumb">
                            <a>
                                <img src=${product.image} class="product_image" width="285" title="N/A"
                                    fgcolor="#aaaaaa">
                            </a>
                        </figure>
                        <div class="meta product-info-meta">
                            <p>${product.title}</p>
                            <p>${product.description}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 pricetag-role cart-td text-center">
                    <div class="product-label w-100">
                        <div class="meta price">
                            <p>$ ${product.price}</p>
                        </div>
                    </div>
                </div>

                ${index !== 0 ?
                `<div class="col-sm-1 pd-0 cart-td text-center">
                         <span onClick="removeProduct('${product.id}')" class="product-rem-btn close cursor"><i class="fas fa-times"></i></span></div>`
                : ''}
            </div>
    `

        newProduct += updatedProduct
    })

    // Updating - Desktop Cart Details
    const existedProd = document.getElementById('additional-product-container');
    existedProd && (existedProd.innerHTML = newProduct);
};

// Update Cart Total Amount
const cartTotal = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const dcartPotalPrice = document.getElementById('dcart-subtotal-price');
    const totalPrice = cartData.reduce((total, product) => total += Number(product.price), 0);
    dcartPotalPrice.innerText = `$ ${(+totalPrice).toFixed(2)} USD`
};

// Remove Product 
const removeProduct = (id) => {
    const oldCartData = JSON.parse(localStorage.getItem('cartData'));
    const updatedCartData = oldCartData.filter(p => p.id !== id);
    console.log('oldCartData', oldCartData);

    console.log('updatedCartData', updatedCartData);
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));

    updateCart();
    cartTotal();
    udpateCartQty();
};

// Cart quantity updation
const udpateCartQty = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    cartQty.innerHTML = `(${cartData.length}) Cart`
}

// dynamically changes 
if (selectedPack) {

    updateCart()
    cartTotal()
    udpateCartQty()
} else {
    console.log("Nothing is selected.")
};
