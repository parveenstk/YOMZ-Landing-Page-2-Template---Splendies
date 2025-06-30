// which pack is selected 
document.addEventListener("DOMContentLoaded", function () {
    const bags = document.querySelectorAll('.pack-bags');

    bags.forEach(bag => {
        bag.addEventListener('click', () => {
            const productId = bag.id

            productId
                // ? console.log("Clicked bag title:", productId)
                // ? window.location.href = `https://suretekinfosoft.com/demo106/funnel1/lp2/justpayshipping/checkout.html?package=${productId}`
                ? window.location.href = `http://127.0.0.1:5500/checkout.html?package=${productId}`
                : console.log("Clicked a bag, but no title found.");
        });
    });
});
