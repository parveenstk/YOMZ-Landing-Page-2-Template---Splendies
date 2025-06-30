// // subscribe buttons
// document.addEventListener("DOMContentLoaded", function () {
//     const btn = document.querySelector(".sbu-button");
//     const bagsSection = document.querySelector(".subscribe-bags");

//     btn.addEventListener("click", function (e) {
//         e.preventDefault(); // prevent link behavior
//         bagsSection.style.display = "block";
//         // Optional: scroll to section
//         bagsSection.scrollIntoView({ behavior: "smooth" });
//     });
// });

// onClick subscrribe button 
const packs = document.getElementById('packs');
const subsBtn = document.querySelectorAll('.subscribe-button');
const readytoyomz = document.getElementById('ready-to-yomz');

subsBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        replaceCls('ready-to-yomz', 'show', 'hide');
        replaceCls('packs', 'hide', 'show');
        packs.scrollIntoView({ behavior: 'smooth' });
    });
});

// utility function for multi uses
const replaceCls = (element, existedClass, swichtedClass) => {
    const el = document.getElementById(element);
    el.classList.replace(existedClass, swichtedClass)
};

// tick points functionality
const tickPoints = document.getElementById('tick-points');
const img = './images/Tick-01.png';
const text = [
    "Choose how many bags",
    "Pick YOMZ Original or Sour",
    "Protect against Hidden Hunger",
    "Try risk-free with our Picky Momz Happiness Guarantee",
];

const textHTML =
    text.map(text => `
        <div class="tick-point">
          <img src="${img}" alt="tick-img" class="tick-image">
          <p>${text}</p>
        </div>
      `)
        .join('');

tickPoints.innerHTML = textHTML;