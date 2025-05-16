const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addTransaction = document.getElementById('add-transaction')
const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
updateUI();

// Handling data submission

addTransaction.addEventListener("click", (e)=>{
    e.preventDefault();
    const description = descInput.value.trim();
    const amount = Number(amountInput.value);
    const type = document.querySelector('input[name="type"]:checked').value;

    if (!description || isNaN(amount) || amount < 0) {
        alert("Please enter a valid description and amount");
        return;
    }

    transactions.push({description, amount, type});
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
    descInput.value = "";
    amountInput.value = "";
})


// Displaying the function 

function updateUI(){
    const income = transactions.filter((x)=> x.type === "income").reduce((acc, next)=> acc + next.amount, 0);
    const expense = transactions.filter((x)=> x.type === "expense").reduce((acc, next)=> acc + next.amount, 0);
    const balance = income - expense;

    balanceElement.textContent = `₦${balance.toFixed(2)}`;
    incomeElement.textContent = `₦${income.toFixed(2)}`;
    expenseElement.textContent = `₦${expense.toFixed(2)}`;

// List recent transaction 
transactionList.innerHTML = "";
transactions.forEach((transaction, index)=>{
    const li = document.createElement("li");
    li.className = transaction.type;
    li.innerHTML = `
        <span>${new Date().toLocaleString()} - ${transaction.description} ₦${transaction.amount}</span>
        <div class="btn">
            <i class="ri-delete-bin-line expense" onClick="deleteTransaction(${index})"></i>
            <i class="ri-edit-box-line" onClick="editTransaction(${index})"></i>
        </div>
    `;
    transactionList.appendChild(li);
})
}

deleteTransaction = (index) => {
    if(window.confirm("Are you sure you want to delete?")) {
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateUI();
    }
}

editTransaction = (index) => {
    const transaction = transactions[index];
    descInput.value = transaction.description;
    amountInput.value = transaction.amount;
    document.querySelector('input[name="type"]:checked').value;
    transactions.splice(index,1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}