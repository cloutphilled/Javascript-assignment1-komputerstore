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
const computerTitleElement = document.getElementById("title");
const computerImageElement = document.getElementById("laptop-image");
const computerSpecsElement = document.getElementById("specs");

let computers = [];
let cart = [];
let totalDue = 0.0; 
let pictureList = [];


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));


const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
    // computers[0].specs.forEach(x => addComputerSpecsToMenu(x));
    computerTitleElement.innerText = computers[0].title;
    computerDescriptionElement.innerText = computers[0].description;
    priceElement.innerText = computers[0].price;
    computerImageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + computers[0].image;
}

const addComputerToMenu = (computers) => {
    const computerElement = document.createElement("option");
    computerElement.value = computers.id;
    computerElement.appendChild(document.createTextNode(computers.title));
    computersElement.appendChild(computerElement);
}




const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    computerSpecsElement.innerText = selectedComputer.specs;
    const path = "https://noroff-komputer-store-api.herokuapp.com/";
    computerImageElement.src = path.concat(selectedComputer.image);
    computerTitleElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = selectedComputer.description;
    priceElement.innerText = selectedComputer.price;
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
