import './bank.js';
import './laptops.js';

const workButtonElement = document.getElementById("work");
const workBalanceElement = document.getElementById("workBalance");
const toBankButton = document.getElementById("toBank");

function clickWorkButton(){
    workBalanceElement.innerText = parseInt(workBalanceElement.textContent,10) + 100;
}

function clickBankButton(){
    accountBalanceElement.innerText = parseInt(accountBalanceElement.textContent,10) + parseInt(workBalanceElement);
    workBalanceElement.innerText = 0;
}


toBankButton.addEventListener("click", clickBankButton);
workButtonElement.addEventListener("click", clickWorkButton);