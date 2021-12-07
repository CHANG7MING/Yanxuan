import Carousel from "./Carousel.js";
import NewProduct from "./NewProduct.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Component from "./Component.js";
import AJAX from "./AJAX.js";

export default class Index extends Component {
    static dataAPI = "http://localhost:8080/getList"
    elem
    bannerImg = [
        {img: "../img/banner1.webp"},
        {img: "../img/banner2.webp"},
    ];

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.generateHTML()
    }

    async generateHTML() {
        this.createHeader(this.elem)
        this.createBanner(this.bannerImg, this.elem)
        let data = await new AJAX(Index.dataAPI)
        this.generateNewProduct(data, this.elem)
        this.createFooter(this.elem)
    }

    createHeader(parent) {
        this.headerElem = new Header()
        this.headerElem.appendTo(parent)
        this.headerElem.updateCartNum()
    }

    createBanner(bannerImg, parent) {
        new Carousel(bannerImg).appendTo(parent)
    }

    generateNewProduct(data, parent) {
        new NewProduct(data).appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }


    setCss() {
        if (Index.cssBool) return;
        Index.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/normalize.css">
            <link rel="stylesheet" href="./css/global.css">            
        `
    }
}