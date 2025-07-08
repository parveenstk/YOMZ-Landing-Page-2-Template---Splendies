// onClick subscrribe button 
const packs = document.getElementById('packs');
const subsBtn = document.querySelectorAll('.subscribe-button');
const readytoyomz = document.getElementById('ready-to-yomz');
const desktopCart = document.getElementById('desktop-cart-button');

// Function to toggle visibility and scroll to packs
function handleSubscribeClick(e) {
    e.preventDefault();
    replaceCls('ready-to-yomz', 'show', 'hide');
    replaceCls('packs', 'hide', 'show');
    packs.scrollIntoView({ behavior: 'smooth' });
}

// Attach to all subscribe buttons
subsBtn.forEach((button) => {
    button.addEventListener('click', handleSubscribeClick);
});

// Attach to desktop cart button
if (desktopCart) {
    desktopCart.addEventListener('click', handleSubscribeClick);
}

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