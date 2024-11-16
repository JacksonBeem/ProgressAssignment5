import { usedCars } from './usedCars.js';
// console.log(usedCars);

const carContainer = document.getElementById('carContainer');
const makeFilter = document.getElementById('makeFilter');
const modelFilter = document.getElementById('modelFilter');
const maxMileage = document.getElementById('maxMileage');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const colorFilter = document.getElementById('colorFilter');
const filterButton = document.getElementById('filterButton');

// Function to Display Cars
function displayCars(cars) {
    carContainer.innerHTML = ''; 

    if (cars.length === 0) {
        carContainer.innerHTML = '<p>No cars match your criteria.</p>';
        return;
    }

    // car card
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        `;
        carContainer.appendChild(carCard);
    });
}

// Filter Logic
function filterCars() {
    const selectedMakes = Array.from(makeFilter.selectedOptions).map(option => option.value);
    const selectedModels = Array.from(modelFilter.selectedOptions).map(option => option.value);
    const selectedColors = Array.from(colorFilter.selectedOptions).map(option => option.value);
    const maxMileageValue = parseInt(maxMileage.value) || Infinity;
    const minPriceValue = parseInt(minPrice.value) || 0;
    const maxPriceValue = parseInt(maxPrice.value) || Infinity;

    const filteredCars = usedCars.filter(car => {
        return (
            (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
            (selectedModels.length === 0 || selectedModels.includes(car.model)) &&
            (selectedColors.length === 0 || selectedColors.includes(car.color)) &&
            car.mileage <= maxMileageValue &&
            car.price >= minPriceValue &&
            car.price <= maxPriceValue
        );
    });

    displayCars(filteredCars);
}


displayCars(usedCars);


filterButton.addEventListener('click', filterCars);
