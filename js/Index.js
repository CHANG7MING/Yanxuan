import Carousel from "./Carousel.js";
import NewProduct from "./NewProduct.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Component from "./Component.js";



export default class Index extends Component {
    elem
    bannerImg = [
        {img: "../img/banner1.webp"},
        {img: "../img/banner2.webp"},
    ];

    newProductAPI = "http://localhost:8080/getList"

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.createHeader(this.elem)
        this.createBanner(this.bannerImg, this.elem)
        this.generateNewProduct(this.newProductAPI, this.elem)
        this.createFooter(this.elem)

    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createBanner(bannerImg, parent) {
        new Carousel(bannerImg).appendTo(parent)
    }

    generateNewProduct(url, parent) {
        new NewProduct(url).appendTo(parent)
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