import './bank';
import './laptops';

const workButtonElement = document.getElementById("work");
const workBalanceElement = document.getElementById("workBalance");

function clickWorkButton(){
    workBalanceElement.innerText = parseInt(workBalanceElement.textContent,10) + 100;
}

workButtonElement.addEventListener("click", clickWorkButton);