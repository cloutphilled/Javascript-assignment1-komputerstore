import './laptops.js';
import './work.js';
const accountBalanceElement = document.getElementById("accountBalance");
const bankButtonElement = document.getElementById("bankLabel");

let totalBalance = 0.0;

// Function that formats into $USD
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
// });
function clickBankButton(){
    accountBalanceElement.innerText = parseInt(accountBalanceElement.textContent,10) + parseInt(workBalanceElement);
    workBalanceElement.innerText = 0;
}

bankButtonElement.addEventListener("click", clickBankButton);