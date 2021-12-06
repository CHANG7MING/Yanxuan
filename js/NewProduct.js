import Component from "./Component.js";

export default class NewProduct extends Component {
    static cssBool = false;
    elem;
    content;

    constructor(url) {
        super();
        this.createElem();
        this.generateItems(url);
        this.setCss()
    }

    createElem() {
        this.elem = document.createElement("div");
    }

    async generateItems(url) {
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        data = data.slice(0,4)
        console.log(data);
        this.content = `
            <div class="new-product">
            <div class="container">
            <div class="top">
                <h1>新品首发</h1>
                <span>为你寻觅世间好物</span>
                <i>更多新品 ></i>
           </div>
           <ul class="new-item">
                ${data.reduce((v, t) => {
            return v + `
                    <li class="item-li"">
                        <a href="detail.html?id=${t.id}" target="_blank">
                            <div><img src="./productImg/${t.img1}"></div>
                            <p>${t.title}</p>
                            <i>￥${t.price}</i>
                        </a>
                    </li>
                    
                `
        }, "")}
           </ul>
           </div>
           </div>
        `;
        this.elem.innerHTML = this.content;
    }

    setCss() {
        if (NewProduct.cssBool) return;
        NewProduct.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/newproduct.css">
        `
    }

}