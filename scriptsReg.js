let btn = document.querySelector('#see_passwordReg')
let btnConfirm = document.querySelector('#see_confirm_password')
let nameComplete = document.querySelector('#name_complete')
let labelName = document.querySelector('#labelName')
let user = document.querySelector('#user')
let labelUser = document.querySelector('#labelUser')
let password = document.querySelector('#password')
let labelPassword = document.querySelector('#labelPassword')
let confirm_password = document.querySelector('#confirm_password')
let labelConfirmPassword = document.querySelector('#labelConfirmPassword')
let validNameComplete = false
let validUser = false
let validPassword = false
let validConfirmPassword = false
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')
let bodyRegisterNone = document.querySelector('#bodyRegister')

nameComplete.addEventListener('keyup', () => {
    if (name_complete.value.length <= 2) {
        labelName.setAttribute('style', 'color: red')
        labelName.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
        nameComplete.setAttribute('style', 'border-color: red')
        validNameComplete = false
    } else {
        labelName.setAttribute('style', 'color: green')
        labelName.innerHTML = 'Nome'
        nameComplete.setAttribute('style', 'border-color: green')
        validNameComplete = true
    }
})

user.addEventListener('keyup', () => {
    if (user.value.length <= 4) {
        labelUser.setAttribute('style', 'color: red')
        labelUser.innerHTML = 'Usuário *Insira no mínimo 3 caracteres'
        user.setAttribute('style', 'border-color: red')
        validUser = false
    } else {
        labelUser.setAttribute('style', 'color: green')
        labelUser.innerHTML = 'Usuário'
        user.setAttribute('style', 'border-color: green')
        validUser = true
    }
})

passwordReg.addEventListener('keyup', () => {
    if (passwordReg.value.length <= 5) {
        labelPassword.setAttribute('style', 'color: red')
        labelPassword.innerHTML = 'Senha *Insira no mínimo 6 caracteres'
        passwordReg.setAttribute('style', 'border-color: red')
        validPassword = false
    } else {
        labelPassword.setAttribute('style', 'color: green')
        labelPassword.innerHTML = 'Senha'
        passwordReg.setAttribute('style', 'border-color: green')
        validPassword = true
    }
})

confirm_password.addEventListener('keyup', () => {
    if (passwordReg.value != confirm_password.value) {
        labelConfirmPassword.setAttribute('style', 'color: red')
        labelConfirmPassword.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirm_password.setAttribute('style', 'border-color: red')
        validConfirmPassword = false
    } else {
        labelConfirmPassword.setAttribute('style', 'color: green')
        labelConfirmPassword.innerHTML = 'Confirmar Senha'
        confirm_password.setAttribute('style', 'border-color: green')
        validConfirmPassword = true
    }
})

function registered() {
    if (validNameComplete && validUser && validPassword && validConfirmPassword) {
        let userList = JSON.parse(localStorage.getItem('userList') || '[]')
        userList.push(
            {
                nameCad: nameComplete.value,
                userCad: user.value,
                passwordCad: passwordReg.value
            })
        setTimeout(() => {
            bodyRegisterNone.setAttribute('style', 'display: none')
            body_card.setAttribute('style', 'display: flex')
            body.setAttribute('style', 'overflow: auto')
        }, 3000)
        localStorage.setItem('userList', JSON.stringify(userList))
        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = 'Cadastrando usuário...'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''
    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Preencha todos os campos corretamente'
        msgSuccess.setAttribute('style', 'display: none')
        msgSuccess.innerHTML = ''
    }
}

btn.addEventListener('click', () => {
    let inputPassword = document.querySelector('#passwordReg')
    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () => {
    let inputConfirmPassword = document.querySelector('#confirm_password')
    if (inputConfirmPassword.getAttribute('type') == 'password') {
        inputConfirmPassword.setAttribute('type', 'text')
    } else {
        inputConfirmPassword.setAttribute('type', 'password')
    }
})

