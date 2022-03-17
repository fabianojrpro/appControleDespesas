const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransaction = JSON.parse (localStorage.getItem('transactions'))
let transaction = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

const removeTransaction = ID => {
    transaction = transaction.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
     ${transaction.name} 
     <span>${operator} R$ ${amountWithoutOperator}</span>
     <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    transactionUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = transaction.map(transaction => transaction.amount)
    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const expense = Math.abs (transactionsAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    transaction.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

    const updateLocalStorage = () => {
        localStorage.setItem('transaction', JSON.stringify(transaction))
    }

    function generateID() {
    return Math.round(Math.random() * 1000)
}

    form.addEventListener('submit', event => {
        event.preventDefault()

        const transactionsName = inputTransactionName.value.trim()
        const transactionsAmount = inputTransactionAmount.value.trim()

        if (transactionsName === '' || transactionsAmount === ''){
            alert ('Todos os campos devem ser preenchidos!')
            return
        }

        const transactions = { id: generateID (), name: transactionsName, amount: Number( transactionsAmount )}

        transaction.push(transactions)
        init()
        updateLocalStorage()

        inputTransactionName.value = ''
        inputTransactionAmount.value = ''
    })