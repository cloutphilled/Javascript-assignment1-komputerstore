// import './bank';
// import './work';

const computersElement = document.getElementById("computers");
const priceElement = document.getElementById("price");
const addElement = document.getElementById("add");
const cartElement = document.getElementById("cart");
const quantityElement = document.getElementById("quantity");
const payButtonElement = document.getElementById("pay");
const totalDueElement = document.getElementById("totalDue");
const imagesElement = document.getElementById("image");
const workButtonElement = document.getElementById("work");
const workBalanceElement = document.getElementById("workBalance");
const accountBalanceElement = document.getElementById("accountBalance");
const bankButtonElement = document.getElementById("getLoan");
const toBankButton = document.getElementById("toBank");
const computerDescriptionElement = document.getElementById("computerDescription");
const computerSpecsElement = document.getElementById("specs");
const computerTitleElement = document.getElementById("title");
const computerImageElement = document.getElementById("computerImage");

let computers = [];
let cart = [];
let totalDue = 0.0; 
let pictureList = [];


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));


    // FETCH IMAGES - don't know if it works
fetch("https://noroff-komputer-store-api.herokuapp.com/assets/images")
    .then(respone => respone.json())
    .then(data => pictureList = data)
    .then(pcImage => addImageToMenu(pcImage));


const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
    priceElement.innerText = "Price: " + computers[0].price;
}

const addComputerToMenu = (computers) => {
    const computerElement = document.createElement("option");
    computerElement.value = computers.id;
    computerElement.appendChild(document.createTextNode(computers.title));
    computersElement.appendChild(computerElement);
}

const addImageToMenu = e => {
    computerDescriptionElement.innerText = "";
    const selectedComputer = computers[e.target.selectedIndex];
    computerTitleElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = selectedComputer.description;
    priceElement.innerText = selectedComputer.price;
    computerImageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    selectedComputer.specs.forEach(x => addComputerSpecsToMenu(x));
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    priceElement.innerText = "Price: " + selectedComputer.price;
}

const addComputerSpecsToMenu = (specs) => {
    const featureElement = document.createElement("li");
    computerSpecsElement.appendChild(featureElement);
    featureElement.innerText = specs;
}

const handleAddComputer = () => {
    const selectedComputer = computers[computersElement.selectedIndex];
    const quantity = parseInt(quantityElement.value);

    const cartItem = document.createElement("li");
    const lineTotal = quantity * selectedComputer.price;

    cartItem.innerText = `${selectedComputer.title} ${selectedComputer.price} ${quantity} ${lineTotal.toFixed(2)}`;
    cartElement.appendChild(cartItem);

    totalDue += lineTotal;
    totalDueElement.innerText = `Total Due: ${totalDue.toFixed(2)}`;
}

const handlePay = () => {
    const totalPaid = prompt("Please enter the amount of money you wish to play: ");
    const change = parseFloat(totalPaid) - totalDue;
    alert(`Total change due: ${change.toFixed(2)}`);
}

function clickWorkButton(){
    workBalanceElement.innerText = parseInt(workBalanceElement.textContent,10) + 100;
}

function clickBankButton(){
    accountBalanceElement.innerHTML = parseInt(accountBalanceElement.textContent,10) + parseInt(workBalanceElement.textContent,10);
    workBalanceElement.innerHTML = 0;
}


computersElement.addEventListener("change", handleComputerMenuChange);
addElement.addEventListener("click", handleAddComputer);
payButtonElement.addEventListener("click", handlePay);
workButtonElement.addEventListener("click", clickWorkButton);
toBankButton.addEventListener("click", clickBankButton);