// which pack is selected 
document.addEventListener("DOMContentLoaded", function () {
    const bags = document.querySelectorAll('.pack-bags');

    bags.forEach(bag => {
        bag.addEventListener('click', () => {
            const title = bag.querySelector('.bag-title');
            title
                ? console.log("Clicked bag title:", title.textContent.trim())
                : console.log("Clicked a bag, but no title found.");
        });
    });
});