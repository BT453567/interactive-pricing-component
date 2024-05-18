const slider = document.getElementById('range');
const checkbox = document.getElementById('checkbox');
const pageviews = document.getElementById('pageviews');
const cost = document.getElementById("cost");

const rangeBar = document.getElementById("range-bar-container");
const rangeBarMobile = document.getElementById("range-bar-container-mobile");



let id = 0;
let monthly = true;

slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min);
    
    const trackColor = 'linear-gradient(to right, var(--soft-cyan-full-slider-bar) ' + (value * 100) + '%, var(--light-grayish-blue-empty-slider-bar) ' + (value * 100) + '%)';

    this.style.background = trackColor;

    id = this.value;
    loadValues();
});

slider.addEventListener('mousedown', function() {
    this.classList.remove('hover');
    
});
  
slider.addEventListener('mouseup', function() {
    this.classList.add('hover');
    
});

checkbox.addEventListener('change', function(){
    if (this.checked) {
        monthly = false;
    } else {
        monthly = true;
    }
    loadValues();
});

function loadValues() {
    fetch('./assets/data/data.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('Could not load data')
            }

            return response.json();
        })

        .then(data => {

            pageviews.textContent = data[id].pageviews + ' PAGEVIEWS';

            const costValue = monthly ? data[id].cost : data[id].cost * 0.75;
            cost.textContent = '$' + costValue.toFixed(2);

        })

        .catch(error => {
            console.error('Error loading data:', error);
        });

}

function moveRangeBar() {
    if (window.innerWidth <= 767) {
        if(!rangeBarMobile.contains(slider)) {
            rangeBarMobile.appendChild(slider);
        }
    } else {
        if(!rangeBar.contains(slider)) {
            rangeBar.appendChild(slider);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadValues();
    moveRangeBar();
});

window.addEventListener('resize', moveRangeBar);


