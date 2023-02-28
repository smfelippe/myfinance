let indexClone = 0
let edittrans = null

function fullScreen() {
  var element = document.documentElement
  alert("aqui")
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const Modal = {
  open() {
    edittrans = null
    // prodId = Transaction.all.findIndex((position) => position.id == id)
    // const newTransaction = Transaction.all.filter(function (transactions) {
    //   return transactions.id !== id
    // })
    document.querySelector(".modal-overlay").classList.add("active")
  },

  close() {
    document.querySelector(".modal-overlay").classList.remove("active")
    Modal.erroroff()
    document.querySelector(".modal").classList.remove("active")
    Modal.erroroffChange()
    document.querySelector(".modal-edit").classList.remove("active")
    App.reload()
  },

  confirm(index) {
    indexClone = index
    document.querySelector(".confirm-delete").classList.add("active")
    App.reload()
  },

  edit(index) {
    indexClone = index
    edittrans = 1
    const editTransaction = Transaction.all[indexClone]
    amount = Utils.formatCurrencyEdit(editTransaction.amount)
    date = Utils.formatDateEdit(editTransaction.date)
    document.getElementById("description_edit").value =
      editTransaction.description
    document.getElementById("amount_edit").value = amount
    document.getElementById("date_edit").value = date
    document.querySelector(".modal-edit").classList.add("active")
  },

  change() {
    description = document.getElementById("description_edit").value
    amount = document.getElementById("amount_edit").value
    date = document.getElementById("date_edit").value
    try {
      Form.validateFieldsChange()
      amount = Utils.formatAmount(amount)
      date = Utils.formatDate(date)
      Transaction.all[indexClone] = {
        description: description,
        amount: amount,
        date: date,
      }
      Form.clearFieldsChange()
      edittrans = null
      App.init()
      Modal.close()
    } catch (erroradd) {
      Modal.error4add()
    }
  },

  remove(index) {
    index = indexClone
    Transaction.all.splice(index, 1)
    App.reload()
    Modal.cancel()
  },

  cancel() {
    document.querySelector(".confirm-delete").classList.remove("active")
    App.reload()
  },

  error1add() {
    if (description.value == "") {
      document.querySelector(".error1").style.border = "1px solid red"
      Modal.error2add()
    } else {
      document.querySelector(".error1").style.border = "none"
      Modal.error2add()
    }
  },
  error2add() {
    if (amount.value == "") {
      document.querySelector(".error2").style.border = "1px solid red"
      Modal.error3add()
    } else {
      document.querySelector(".error2").style.border = "none"
      Modal.error3add()
    }
  },
  error3add() {
    if (date.value == "") {
      document.querySelector(".error3").style.border = "1px solid red"
      document.querySelector(".modal").classList.add("active")
      Modal.errorMsg()
    } else {
      document.querySelector(".error3").style.border = "none"
      Modal.errorMsg()
    }
  },

  errorMsg() {
    var Text = document.getElementById("msg_error").innerHTML
    document.getElementById("msg_error").innerHTML = Text =
      "Preencha todos os campos"
    document.getElementById("msg_error").style.color = Text = "red"
  },

  error4add() {
    if (description == "") {
      document.querySelector(".error4").style.border = "1px solid red"
      Modal.error5add()
    } else {
      document.querySelector(".error4").style.border = "none"
      Modal.error5add()
    }
  },
  error5add() {
    if (amount == "") {
      document.querySelector(".error5").style.border = "1px solid red"
      Modal.error6add()
    } else {
      document.querySelector(".error5").style.border = "none"
      Modal.error6add()
    }
  },
  error6add() {
    if (date == "") {
      document.querySelector(".error6").style.border = "1px solid red"
      document.querySelector(".modal_edit").classList.add("active")
      Modal.errorMsgChange()
    } else {
      document.querySelector(".error6").style.border = "none"
      Modal.errorMsgChange()
    }
  },

  errorMsgChange() {
    var Text = document.getElementById("msg_error-edit").innerHTML
    document.getElementById("msg_error-edit").innerHTML = Text =
      "Preencha todos os campos"
    document.getElementById("msg_error-edit").style.color = Text = "red"
  },

  erroroff() {
    document.querySelector(".error1").style.border = "none"
    document.querySelector(".error2").style.border = "none"
    document.querySelector(".error3").style.border = "none"
    document.getElementById("msg_error").innerHTML = Text = ""
  },

  erroroffChange() {
    document.querySelector(".error4").style.border = "none"
    document.querySelector(".error5").style.border = "none"
    document.querySelector(".error6").style.border = "none"
    document.getElementById("msg_error-edit").innerHTML = Text = ""
  },
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    )
  },
}

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },

  //remove(index) {
  //Transaction.all.splice(index, 1)
  //App.reload()
  //},

  incomes() {
    let income = 0
    // pegar todas as transações
    // para cada transacao
    // transactions.forEach(function(transaction) {}) ou
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        // income = income + transaction.amount; ou
        income += transaction.amount
      }
    })
    return income
  },

  expenses() {
    let expense = 0
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },

  total() {
    return Transaction.incomes() + Transaction.expenses()
  },
}

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index
    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <div class="actions">
          <img class="img_edit" onclick="Modal.edit(${index})" src="./assets/edit.svg" alt="editar transação">
          <img class="img_delete" onclick="Modal.confirm(${index})" src="./assets/minus.svg" alt="remover transação">
        </div>
      </td>
      `
    return html
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    )
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    )
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  },

  clickkey() {
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const btn = document.querySelector("#delete")
        btn.click
      }
    })
  },
}

const Utils = {
  formatAmount(value) {
    value = value * 100
    return Math.round(value)
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatDateEdit(date) {
    date = date.split("/").reverse().join("-")
    return date
  },

  formatCurrency(value) {
    // const signal = Number(value) < 0 ? "-" : ""
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pr-BR", {
      style: "currency",
      currency: "BRL",
    })
    // return signal + value
    return value
  },

  formatCurrencyEdit(value) {
    const signal = Number(value) < 0 ? "-" : ""
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = String(value)
    return signal + value
  },
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    // const description = Form.getValues().description,
    // const amount = Form.getValues().amount,
    // const date = Form.getValues().date,
    // pode ser igual acima ou desestruturar como abaixo
    const { description, amount, date } = Form.getValues()
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor preencha todos os campos")
    }
  },

  validateFieldsChange() {
    if (description === "" || amount === "" || date === "") {
      throw new Error("Por favor preencha todos os campos")
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)
    return {
      description,
      amount,
      date,
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  clearFieldsChange() {
    description = ""
    amount = ""
    date = ""
  },

  submit(event) {
    event.preventDefault()
    if (edittrans === 1) {
      // edittrans = null
      Modal.change()
      return
    }
    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      Modal.erroroff()
      Modal.close()
    } catch (erroradd) {
      Modal.error1add()
    }
  },
}

const App = {
  init() {
    // Transaction.all.forEach(function(transaction, index) { ou
    // Transaction.all.forEach((transaction, index) => {
    // DOM.addTransaction(transaction, index) ou
    Form.clearFields()
    Transaction.all.forEach(DOM.addTransaction)
    DOM.updateBalance()
    Storage.set(Transaction.all)
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()
