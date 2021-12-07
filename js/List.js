import Component from "./Component.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Pager from "./Pager.js";
import AJAX from "./AJAX.js";

export default class List extends Component {

    listAPI = "http://localhost:8080/getList"
    itemsOfEachPage = 8;
    data
    main
    orderBtn
    pager
    contentContainer
    showContent
    pagerContainer

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.createHeader(this.elem)
        this.generateHTML() // 这是一个异步的方法, 在这里生成HTML, 生成之后调用生成footer, 否则会因为异步加载而导致页面footer在main之前
    }


    async generateHTML() {
        this.data = await new AJAX(this.listAPI)
        console.log(this.data)
        this.createMain()

        this.orderBtn = this.main.querySelectorAll(".sort a")
        this.contentContainer = this.main.querySelector(".content")
        this.pagerContainer = this.main.querySelector(".pager")
        this.pagerContainer.addEventListener("pageChange", e => this.pageChangeHandler(e))
        this.pager = new Pager(this.data, this.itemsOfEachPage, this.pagerContainer)
        this.elem.append(this.main)

        this.createFooter(this.elem)
        this.orderBtn.forEach(t => t.addEventListener("click", e => this.orderClickHandler(e)))
    }

    pageChangeHandler(e) {
        this.showContent = e.detail
        this.createContent()
    }

    orderClickHandler(e) {
        if (e.target.classList.contains("default-order")) this.data.sort(this.compare("id", true))
        else e.target.classList.contains("descending") ?
            this.data.sort(this.compare("price", false)) :
            this.data.sort(this.compare("price", true))
        this.pager.updateData(this.data)
    }

    createContent() {
        this.contentContainer.innerHTML = `
        ${this.showContent.reduce((v, t) => {
            return v + `
                <div class="item">
                    <div class="img-1">
                        <a href="./detail.html?id=${t.id}" target="_blank">
                            <img src="./productImg/${t.img1}" alt="">
                        </a>
                    </div>
                    <div class="img-2">
                        <a href="./detail.html?id=${t.id}" target="_blank">
                            <img src="./productImg/${t.img2}" alt="">
                        </a>
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="./detail.html?id=${t.id}" target="_blank">
                                ${t.title}
                            </a>
                        </div>
                        <div class="price">
                            <span>￥</span>
                            <span>${t.price}</span>
                        </div>
                        <div class="desc">
                            <span>${t.desc}</span>
                        </div>
                    </div>
                </div>`
        }, "")}
        `
    }

    createMain() {
        this.main = document.createElement("main")
        this.main.innerHTML += `
        <main>
            <div class="container">
                <div class="top">
                    <div class="sort">
                        <span>排序：</span>
                        <a href="javascript:;" class="default-order">默认</a>
                        <a href="javascript:;" class="ascending">价格升序</a>
                        <a href="javascript:;" class="descending">价格降序</a>
                    </div>
                </div>
                <div class="content">
        
                </div>
                <div class="pager"></div>
            </div>
        </main>
        `
    }

    /*
     这是比较方法, 用来给拿到的数据排序
     prop是用于排序的属性, order是排序的方式, 如果order是true, 则是升序, 否则是降序
     用法:
         arr.sort(compare("price", true))
 */
    compare(prop, order) {
        return function (m, n) {
            let a = m[prop];
            let b = n[prop];
            return order ? (a - b) : (b - a);
        }
    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }


    setCss() {
        document.head.innerHTML += `
            <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
            <link rel="stylesheet" href="./css/normalize.css">
            <link rel="stylesheet" href="./css/list.css">
            <link rel="stylesheet" href="./css/global.css">
        `
    }
}