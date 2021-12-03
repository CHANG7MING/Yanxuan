import Component from "./Component.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import AJAX from "./AJAX.js";

export default class List extends Component{

    listAPI = "http://localhost:8080/getList"

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.createHeader(this.elem)
        this.generateHTML() // 这是一个异步的方法, 在这里生成HTML, 生成之后调用生成footer, 否则会因为异步加载而导致页面footer在main之前

    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }

    async generateHTML(){
        let data = await new AJAX(this.listAPI)
        // data = JSON.parse(data)
        console.log(data)
        this.elem.innerHTML += `
        <main>
            <div class="container">
                <div class="top">
                    <div class="sort">
                        <span>排序：</span>
                        <a href="javascript:;">销量</a>
                        <a href="javascript:;">价格</a>
                        <a href="javascript:;">评价</a>
                    </div>
                </div>
                <div class="content">
                    <div class="item">
                        <div class="img-1">
                            <a href="">
                                <img src="https://picsum.photos/245/245" alt="">
                            </a>
                        </div>
                        <div class="img-2">
                            <a href="">
                                <img src="https://picsum.photos/246/246" alt="">
                            </a>
                        </div>
                        <div class="info">
                            <div class="title">
                                <a href="">
                                    标题标题标题标题标题标题
                                </a>
                            </div>
                            <div class="price">
                                <span>￥</span>
                                <span>99</span>
                            </div>
                            <div class="desc">
                                <span>描述描述描述描述描述</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `
        this.createFooter(this.elem)
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