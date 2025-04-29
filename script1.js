document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();
    updateTotal();

    expenseForm.addEventListener("click", (e) => {
        e.preventDefault();
        //every single input come in string format
        const name = expenseNameInput.value.trim();
        const amt = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amt) && amt > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amt: amt// or name,amt(saME KEY)
            }
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";

        }




    })

    function renderExpenses() {
        expenseList.innerHTML="";
        expenses.forEach(expense => {
            const expenseItem = document.createElement("li");
            expenseItem.innerHTML = `${expense.name} - $${expense.amt} <button data-id="${expense.id}">Delete</button>`;
            expenseList.appendChild(expenseItem);
        });
    }
    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function calculateTotal() {
        //sum:accumulator, expense-current value
        return expenses.reduce((sum, expense) => sum + expense.amt, 0); //if use {} -> have to use return
    }
    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON"){
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses=expenses.filter(expense=> expense.id !== expenseId);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

        }
    });

})