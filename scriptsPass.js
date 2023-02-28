let btnEnter = document.querySelector("#see_password")

function gotoRegister() {
  body_card.setAttribute("style", "display: none")
  document.querySelector(".body_register").classList.add("active")
}

btnEnter.addEventListener("click", () => {
  let inputPassword = document.querySelector("#senha")
  if (inputPassword.getAttribute("type") == "password") {
    inputPassword.setAttribute("type", "text")
  } else {
    inputPassword.setAttribute("type", "password")
  }
})

function enter() {
  let usuario = document.querySelector("#usuario")
  let userLabel = document.querySelector("#userLabel")
  let senha = document.querySelector("#senha")
  let senhaLabel = document.querySelector("#senhaLabel")
  let msgError = document.querySelector("#msgError")
  let containerNone = document.querySelector("#body_card")
  let bodyScroll = document.querySelector("#body")
  let userList = []
  let userValid = {
    name: "1",
    user: "1",
    password: "1",
  }
  userList = JSON.parse(localStorage.getItem("userList"))
  userList.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.passwordCad) {
      userValid = {
        name: item.nameCad,
        user: item.userCad,
        password: item.passwordCad,
      }
    }
  })
  if (usuario.value == userValid.user && senha.value == userValid.password) {
    let token =
      Math.random().toString(16).substr(2) + Math.random().toString(16)
    localStorage.setItem("token", "token")
    containerNone.setAttribute("style", "display: none")
    bodyScroll.setAttribute("style", "overflow: auto")
    document.querySelector(".button_new").classList.add("active")
    document.querySelector(".header").classList.add("active")
    document.querySelector("#appInit").classList.add("active")
  } else {
    userLabel.setAttribute("style", "color: red")
    usuario.setAttribute("style", "border-color: red")
    senhaLabel.setAttribute("style", "color: red")
    senha.setAttribute("style", "border-color: red")
    msgError.setAttribute("style", "display: block")
    msgError.innerHTML = "Usuário ou senha incorretos"
    usuario.focus()
  }
}
