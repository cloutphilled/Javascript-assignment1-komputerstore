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
const bankButtonElement = document.getElementById("getLoanButton");
const toBankButton = document.getElementById("toBank");
const computerDescriptionElement = document.getElementById("computerDescription");
const computerTitleElement = document.getElementById("title");
const computerImageElement = document.getElementById("laptop-image");
const computerSpecsElement = document.getElementById("specs");
const loanBalanceElement =  document.getElementById("loan-balance");
const repayLoanElement = document.getElementById("repayLoanButton");


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
    computers[0].specs.forEach(x => addComputerSpecsToMenu(x));
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
    computerSpecsElement.innerText = selectedComputer.specs.join("\n");
    const path = "https://noroff-komputer-store-api.herokuapp.com/";
    computerImageElement.src = path.concat(selectedComputer.image);
    computerTitleElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = "' " + selectedComputer.description + " '";
    priceElement.innerText = "$" + selectedComputer.price;
}  
  

const handleAddComputer = () => {
    const selectedComputer = computers[computersElement.selectedIndex];
    const quantity = parseInt(quantityElement.value);

    const cartItem = document.createElement("li");
    const lineTotal = quantity * selectedComputer.price;

    cartItem.innerText = `${selectedComputer.title}`;
    cartElement.appendChild(cartItem);

    totalDue += lineTotal;
    totalDueElement.innerText = totalDue;//`Total Due: $ ${totalDue.toFixed(2)}`;
}

// This function handles the payment
// It then checks if there's enough funds on the account
// If not --> not enough minerals
const handlePay = () => {
    if (parseInt(totalDueElement.innerText, 10) <= parseInt(accountBalanceElement.textContent, 10)) {
        accountBalanceElement.innerText = parseInt(accountBalanceElement.textContent,10) - parseInt(totalDueElement.innerText,10);
        alert('You have succesfully purchased the: ' + '\n' + cartElement.innerText);
        cartElement.innerText= " ";
        totalDueElement.innerText = " ";
    } 
    else {
        alert('You require more minerals!');
    }
    // Needs a clear cart function here
}

// When this button is clicked the user is provided with funds equal to 100
const clickWorkButton = () => {
    workBalanceElement.innerText = parseInt(workBalanceElement.textContent,10) + 100;
}

// This button transfers the funds acquired via work to the user's bank account
const clickBankButton = () => {
    accountBalanceElement.innerHTML = parseInt(accountBalanceElement.textContent,10) + parseInt(workBalanceElement.textContent,10);
    workBalanceElement.innerHTML = 0;
}


// Loan button
// Doesn't work as of now
const clickLoanButton = () =>{
    if (loanBalanceElement.innerText == 0) {
        let amount = prompt ('Enter the amount you wish to loan.', '1000');
        if(amount <= parseInt(accountBalanceElement.textContent, 10)) {
            accountBalanceElement.innerText = parseInt(accountBalanceElement.textContent, 10) + parseInt(amount, 10);
            loanBalanceElement.innerText = amount;
        }
        else {
            alert('We require more minerals - you are not eligible for a loan');
        }
    }
    else{
    alert("You need to repay your loan - otherwise we're gonna get ya!");
    }
}

const repay = () =>{
    let accountBalance = parseInt(accountBalanceElement.textContent, 10);
    let loan = parseInt(loanBalanceElement.textContent, 10);
    if (loan > accountBalance) {
        loanBalanceElement.innerText = loan - accountBalance;
        accountBalanceElement.innerText = 0;
    } else {
        accountBalanceElement.innerText = accountBalance - loan;
        loanBalanceElement.innerText = 0;
    }
}



repayLoanElement.addEventListener('click', repay);
computersElement.addEventListener("change", handleComputerMenuChange);
addElement.addEventListener("click", handleAddComputer);
payButtonElement.addEventListener("click", handlePay);
workButtonElement.addEventListener("click", clickWorkButton);
toBankButton.addEventListener("click", clickBankButton);
bankButtonElement.addEventListener('click', clickLoanButton);


