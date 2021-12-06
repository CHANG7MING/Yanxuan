import Component from "./Component.js";
import AJAX from "./AJAX.js";
import StepNumber from "./StepNumber.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class Cart extends Component {
    static getCartAPI = "http://localhost:8080/getCart";
    static updateCartAPI = "http://localhost:8080/updateCart";

    updateDBNumberDebounce
    main
    data
    userInfo

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.userInfo = localStorage.getItem("user")
        if (!this.userInfo) window.location.href = "./login.html"
        this.updateDBNumberDebounce = this.debounce(this.updateDBNumber, 500) // 创建防抖函数, 用于计数器防抖更新数据库
        this.generateHTML()
    }


    async generateHTML() {
        this.data = await new AJAX(Cart.getCartAPI, {method: "POST", body: this.userInfo})
        console.log(this.data)
        this.createHeader(this.elem)
        this.createMain(this.elem)
        this.createFooter(this.elem)
        this.createItems(this.elem.querySelector("tbody"))
        this.createTableBottom(this.elem.querySelector(".table-bottom"))
        this.updateTotalPrice()

    }

    createTableBottom(parent) {
        parent.innerHTML = `
            <div class="total">
                <p>应付总额：<span>￥<span class="total-price"></span></span></p>
            </div>
            <input type="submit" value="下单">
        `
    }

    createItems(parent) {
        parent.innerHTML = this.data.reduce((v, t) => {
            return v + `
                <tr>
                    <td>
                        <input type="checkbox" name="" aria-label="select-one" class="item-checkbox" data="${t.id}">
                    </td>
                    <td class="detail">
                        <div class="img-con">
                            <img src="./productImg/${t.pid}.webp" alt="">
                        </div>
                        <div class="desc">
                            <p class="title">${t.title}</p>
                            <p class="sku">${t.subtitle}</p>
                        </div>

                    </td>
                    <td>
                        <p>￥<span class="unit-price">${t.price}</span></p>
                    </td>
                    <td>
                        <div class="step-num" data="${t.id}">
                            
                        </div>
                    </td>
                    <td>
                        <p>￥<span class="subtotal" data='${t.pid}'>${t.price * t.num}</span></p>
                    </td>
                    <td>
                        <a href="javascript:;" class="del" data="${t.id}">删除</a>
                    </td>
                </tr>
            `
        }, "")

        // 创建计数器, 并且更新数据库
        for (let i = 0; i < this.data.length; i++) {
            let _step = new StepNumber(this.data[i].num)
            _step.appendTo(parent.querySelector(`.step-num[data='${this.data[i].id}']`))
            _step.elem.addEventListener("change", (e) => {
                let _subtotal = parent.querySelector(`.subtotal[data='${this.data[i].pid}']`)
                _subtotal.innerText = Number(this.data[i].price) * Number(_step.num)
                this.updateTotalPrice()
                this.updateDBNumberDebounce(this.data[i].id, _step.num)
            })
        }

        // 删除商品
        parent.querySelectorAll(".del").forEach(item => item.addEventListener("click", e => this.delHandler(e)))
    }


    async delHandler(e) {
        new AJAX(Cart.updateCartAPI, {
            method: "POST",
            body: JSON.stringify({
                id: e.target.getAttribute("data"),
                num: 0
            })
        })
        this.data = await new AJAX(Cart.getCartAPI, {method: "POST", body: this.userInfo})
        this.createItems(this.elem.querySelector("tbody"))
        this.updateTotalPrice()
    }

    updateDBNumber(id, num) {
        new AJAX(Cart.updateCartAPI, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                num: num
            })
        })
    }

    // 数据库更新防抖
    debounce(fn, delay) {
        let timer; // 维护一个 timer
        return function () {
            let _this = this; // 取debounce执行作用域的this
            let args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
            }, delay);
        };
    }

    updateTotalPrice() {
        let _totalPrice = 0
        let _total = this.elem.querySelector(".total-price")
        let _subtotals = this.elem.querySelectorAll(".subtotal")
        for (let i = 0; i < _subtotals.length; i++) {
            _totalPrice += Number(_subtotals[i].innerText)
        }
        _total.innerText = _totalPrice.toFixed(2)
    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }

    createMain(parent) {
        this.main = document.createElement("main")
        this.main.innerHTML += `
        <div class="container">
            <form action="" method="get" name="item">
                <table>
                    <thead>
                    <tr>
                        <td>
                            <input type="checkbox" name=""> 全选
                        </td>
                        <td>商品信息</td>
                        <td>单价</td>
                        <td>数量</td>
                        <td>小计</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="table-bottom">
                </div>
            </form>
        </div>
        `
        parent.appendChild(this.main)
    }

    setCss() {
        if (Cart.cssBool) return;
        Cart.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/cart.css">            
        `
    }

}