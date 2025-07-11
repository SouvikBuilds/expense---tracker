document.addEventListener("DOMContentLoaded", function () {
    const addExpenseButton = document.getElementById("add_expense");
    const resetDataButton = document.getElementById("reset");
    const deleteAllButton = document.getElementById("delete_all");

    function updateTotal() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.TaskAmount) {
                total += parseFloat(data.TaskAmount);
            }
        }
        document.getElementById("total_amount").innerText = `Total Expense: ₹${total}`;
    }

    // Load saved expenses
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.TaskAmount) {
            appendTaskRow(key, data);
        }
    }
    updateTotal();

    function addExpense() {
        const title = document.getElementById("expense_title").value.trim();
        const amount = document.getElementById("expense_amount").value.trim();
        const date = document.getElementById("date_input").value.trim();

        if (title === '' || amount === '' || date === '') {
            alert("Please fill all fields.");
            return;
        }

        const id = Date.now();
        const details = {
            ExpenseId: id,
            TaskTitle: title,
            TaskAmount: amount,
            TaskDate: date
        };

        localStorage.setItem(id, JSON.stringify(details));
        appendTaskRow(id, details);
        updateTotal();
        resetAllData();
    }

    function appendTaskRow(id, details) {
        const tbody = document.getElementById("taskTableBody");
        const row = document.createElement("tr");

        const tdSerial = document.createElement("td");
        tdSerial.innerText = tbody.children.length + 1;

        const tdTitle = document.createElement("td");
        tdTitle.innerText = details.TaskTitle;

        const tdAmount = document.createElement("td");
        tdAmount.innerText = details.TaskAmount;

        const tdDate = document.createElement("td");
        tdDate.innerText = details.TaskDate;

        const tdAction = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", function () {
            if (confirm(`Delete expense "${details.TaskTitle}"?`)) {
                localStorage.removeItem(id);
                row.remove();
                updateTotal();
            }
        });
        tdAction.appendChild(deleteBtn);

        row.appendChild(tdSerial);
        row.appendChild(tdTitle);
        row.appendChild(tdAmount);
        row.appendChild(tdDate);
        row.appendChild(tdAction);

        tbody.appendChild(row);
    }

    function resetAllData() {
        document.getElementById("expense_title").value = '';
        document.getElementById("expense_amount").value = '';
        document.getElementById("date_input").value = '';
    }

    function deleteAllExpenses() {
        if (confirm("Delete all expenses?")) {
            localStorage.clear();
            location.reload();
        }
    }

    addExpenseButton.addEventListener("click", addExpense);
    resetDataButton.addEventListener("click", resetAllData);
    deleteAllButton.addEventListener("click", deleteAllExpenses);
});
