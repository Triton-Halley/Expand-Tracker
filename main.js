const balance = document.getElementById('balance'),
    money_plus = document.getElementById('money-plus'),
    money_minus = document.getElementById('money-minus'),
    list = document.getElementById('list'),
    form = document.getElementById('form'),
    text = document.getElementById('text'),
    amount = document.getElementById('amount');

const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'));

let transactions = localStorage.getItem('transaction') !== null ? localStorageTransaction : [] ;

let addTransaction = (e) => {
    e.preventDefault();
    console.log(amount);
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('please add a text amount');
    }else{
        const transaction = {
            id:generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDom(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '' ;
        amount.value = '' ;

    }
}

let generateID = () => {

    return Math.floor(Math.random() *10000000);
}

let addTransactionDom = (transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

let updateValues = () => {

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item >0)
        .reduce((acc,item) => (acc += item),0)
        .toFixed(2);

        const expense = (
            amounts.filter(item =>item < 0 ).reduce((acc,item) => (acc += item),0) * -1
        ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;    
}

let removeTransaction = (id) => {
    console.log('im here');
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

let updateLocalStorage = () => {
    localStorage.setItem('transactions',JSON.stringify(transactions));

}
let init = () =>{
    list.innerHTML = '' ;

    transactions.forEach(addTransactionDom);

    updateValues();
}
init();


form.addEventListener('submit', addTransaction);