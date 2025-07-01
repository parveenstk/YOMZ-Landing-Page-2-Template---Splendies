// which pack is selected 
document.addEventListener("DOMContentLoaded", function () {
    const bags = document.querySelectorAll('.pack-bags'); // All bags

    bags.forEach(bag => {
        bag.addEventListener('click', () => {
            const productId = bag.id;

            // Details for each type of pack
            const selectedPacks = {
                "1-person": {
                    id: '1-person',
                    title: "YOMZ Original",
                    description: "1 Person (1 bag)",
                    price: 47.99,
                    image: '../../images/checkout/bag-1.png'
                },

                "3-people": {
                    id: '3-people',
                    title: "YOMZ Original",
                    description: "3 People Set (3 bags)",
                    price: 129.58,
                    image: '../../images/checkout/bag-3.png'
                },
            };

            if (selectedPacks[productId]) {

                // Save selectedPack to localStorage
                const selectedPack = selectedPacks[productId];
                localStorage.setItem('cartData', JSON.stringify([selectedPack]));
                localStorage.setItem('selectedPack', JSON.stringify(productId));
                console.log("Selected Pack saved:", selectedPack);

                // window.location.href = `http://127.0.0.1:5500/checkout.html`;
                window.location.href = `https://suretekinfosoft.com/demo106/funnel1/lp2/justpayshipping/checkout.html`;
            }
        });
    });
});