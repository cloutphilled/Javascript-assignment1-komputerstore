import './laptops.js';
import './work.js';
const accountBalanceElement = document.getElementById("accountBalance");
const bankButtonElement = document.getElementById("getLoan");

let totalBalance = 0.0;

// Function that formats into $USD
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
// });
