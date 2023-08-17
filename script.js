const tbody = document.querySelector('tbody');
const descItem = document.querySelector('#desc');
const amount = document.querySelector('#amount');
const type = document.querySelector('#type');
const btnNew = document.querySelector('#btnNew');
const incomes = document.querySelector('.incomes');
const expenses = document.querySelector('.expenses');
const total = document.querySelector('.total');

let items = [];

btnNew.onclick = () => {
    if (descItem.value === '' || amount.value === '' || type.value === '') {
        return alert('Preencha todos os campos!');
    }

    const newItem = {
        desc: descItem.value,
        amount: parseFloat(amount.value),
        type: type.value,
    };

    items.push(newItem);

    setItemsInLocalStorage();

    insertItem(newItem, items.length - 1);

    descItem.value = '';
    amount.value = '';

    updateTotals();
};

function deleteItem(index) {
    items.splice(index, 1);
    setItemsInLocalStorage();
    loadItems();
    updateTotals();
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>R$ ${item.amount.toFixed(2)}</td>
        <td class="columnType">${
            item.type === 'Entrada'
                ? '<i class="bx bxs-chevron-up-circle"></i>'
                : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;

    tbody.appendChild(tr);
}

function loadItems() {
    items = getItemsFromLocalStorage();
    tbody.innerHTML = '';
    items.forEach((item, index) => {
        insertItem(item, index);
    });
}

function updateTotals() {
    let totalIncomes = 0;
    let totalExpenses = 0;

    items.forEach((item) => {
        if (item.type === 'Entrada') {
            totalIncomes += item.amount;
        } else if (item.type === 'Saída') {
            totalExpenses += item.amount;
        }
    });

    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes.toFixed(2);
    expenses.innerHTML = totalExpenses.toFixed(2);
    total.innerHTML = totalItems;
}

function getItemsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('financial_items')) || [];
}

function setItemsInLocalStorage() {
    localStorage.setItem('financial_items', JSON.stringify(items));
}

loadItems();
updateTotals();