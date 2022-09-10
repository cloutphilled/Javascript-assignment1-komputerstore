const computersElement = document.getElementById("computers");
const priceElement = document.getElementById("price");
const addElement = document.getElementById("add");
const cartElement = document.getElementById("cart");
const quantityElement = document.getElementById("quantity");
const payButtonElement = document.getElementById("pay");
const totalDueElement = document.getElementById("totalDue");
const imagesElement = document.getElementById("image");


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

const addImageToMenu = (computers) => {
    const imageElement = document.createElement("img");
    imageElement.value = computers.image;
    imageElement.appendChild(document.createTextNode(computers.id.image));
    imagesElement.appendChild(imageElement);
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    priceElement.innerText = "Price: " + selectedComputer.price;
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



computersElement.addEventListener("change", handleComputerMenuChange);
addElement.addEventListener("click", handleAddComputer);
payButtonElement.addEventListener("click", handlePay);
