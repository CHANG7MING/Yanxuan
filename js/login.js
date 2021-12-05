import Header from "./Header.js";
import Footer from "./Footer.js";
import Component from "./Component.js";
import AJAX from "./AJAX.js";

export default class Login extends Component {

    elem
    switchLogin
    loginContent
    static loginAPI="http://localhost:8080/login"
    static registerAPI="http://localhost:8080/register"
    loginBtn
    registerBtn
    formData

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.createHeader(this.elem)
        this.generateHTML()
        this.createFooter(this.elem)
        this.addSwitch()
        this.addBtnListener()
    }

    addBtnListener() {
        this.loginBtn = this.elem.querySelector("#login")
        this.registerBtn = this.elem.querySelector("#register")
        this.loginBtn.addEventListener("click", e => this.btnClickHandler(e))
        this.registerBtn.addEventListener("click", e => this.btnClickHandler(e))
    }

    async btnClickHandler(e) {
        e.preventDefault()
        let reqURL = e.target.id === "login" ? Login.loginAPI : Login.registerAPI
        let reqBody = {
            username: this.elem.querySelector("#username").value,
            password: this.elem.querySelector("#password").value
        }
        let data = await new AJAX(reqURL, {method:"POST",body:JSON.stringify(reqBody)})
        if (!data.ok) {
            console.log(data)
            alert(data.msg)
            return
        } else if (data.ok) {
            console.log(data)
            let user = data.data
            localStorage.setItem("user", JSON.stringify(user))
            window.location.href = "./index.html"
        }
        console.log(data)

    }

    addSwitch() {
        this.switchLogin = this.elem.querySelector(".switch-login")
        this.loginContent = this.elem.querySelectorAll(".login-content > div")
        this.switchLogin.addEventListener("click", e => this.clickHandler(e))
    }

    clickHandler(e) {
        this.loginContent.forEach(item => item.classList.toggle("hidden"))
    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }

    generateHTML() {
        let main = document.createElement("main")
        main.innerHTML += `
            <div class="banner">
                <img src="./img/loginbg.jpg" alt="">
            </div>
            <div class="login">
                <div class="container">
                    <div class="login-box">
                        <div class="switch-login">
                            <img src="./img/02ec8f409e64be946b92cf3b65a363c0.png" alt="">
                            <img src="./img/eb0a8c711a86705c798dd6364fbbf8c6.png" alt="">
                        </div>
                        <div class="login-content">
                            <div class="qr hidden">
                                <p>APP扫码 安全登录</p>
                                <img src="./img/（PNG 图像，190x190 像素）.png" alt="">
                                <p>使用<span>网易严选APP</span>扫码登录</p>
                            </div>
                            <div class="form">
                                <form action="">
                                    <div>
                                        <label for="username"><i class="fa fa-user"></i></label>
                                        <input type="text" id="username" placeholder="请输入手机号">
                                    </div>
                                    <div>
                                        <label for="password"><i class="fa fa-key"></i></label>
                                        <input type="password" id="password" placeholder="请输入密码">
                                    </div>
                                    <div>
                                        <button id="login">登&nbsp;&nbsp;&nbsp;录</button>
                                        <button id="register">注&nbsp;&nbsp;&nbsp;册</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="login-bottom">
                            <a id="register" href="javascript:;">遇到问题?</a>
                            <!--<a href="javascript:;">注&nbsp;&nbsp;&nbsp;册</a>-->
                        </div>
                    </div>
                </div>
            </div>
        `
        this.elem.append(main)
    }

    setCss() {
        document.head.innerHTML += `
            <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
            <link rel="stylesheet" href="./css/normalize.css">
            <link rel="stylesheet" href="./css/login.css">
            <link rel="stylesheet" href="./css/global.css">
        `
    }

}

