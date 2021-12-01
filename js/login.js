let switchLogin, loginContent

init()

function init(){
    switchLogin = document.querySelector(".switch-login")
    loginContent = document.querySelectorAll(".login-content > div")
    switchLogin.addEventListener("click", clickHandler)
}

function clickHandler(e) {
    loginContent.forEach(item =>  item.classList.toggle("hidden"))
}