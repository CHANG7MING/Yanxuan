import Component from "./Component.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class Detail extends Component {

    constructor() {
        super();
        this.elem = document.createElement("body")
        this.setCss()
        this.createHeader(this.elem)
        this.createFooter(this.elem)
    }

    createHeader(parent) {
        new Header().appendTo(parent)
    }

    createFooter(parent) {
        new Footer().appendTo(parent)
    }


    setCss() {
        if (Detail.cssBool) return;
        Detail.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/normalize.css">
            <link rel="stylesheet" href="./css/global.css">            
        `
    }

}