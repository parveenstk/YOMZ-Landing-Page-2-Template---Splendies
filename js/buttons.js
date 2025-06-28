const packs = document.getElementById('packs');
const subsBtn = document.querySelectorAll('.subscribe-button');

subsBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Stop <a> from reloading the page
        packs.classList.remove('hide'); // Show the packs section
        packs.scrollIntoView({ behavior: 'smooth' }); // Optional smooth scroll
        // console.log("Subscribe button clicked:", button);
    });
});
