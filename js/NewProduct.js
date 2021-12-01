import Component from "./Component.js";

export default class NewProduct extends Component {

    elem;
    content;

    constructor(url) {
        super();
        this.createElem();
        this.generateItems(url);

    }


    createElem(){
        this.elem = document.createElement("div");
        // this.elem.classList.add("new-item");
    }

    async generateItems(url) {
        console.log(url);
        // let res = await fetch("http://localhost:63342/Yanxuan/json/test.json");
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        this.content = `
            <!--<div class="left"><i class='fa fa-angle-left'></i></div>-->
            <!--<div class="right"><i class='fa fa-angle-right'></i></div>-->
            <div class="top">
                <h1>新品首发</h1>
                <span>为你寻觅世间好物</span>
                <i>更多新品 ></i>
           </div>
           <ul class="new-item">
                ${data.reduce((v,t) => {
                    return v + `
                    <li class="item-li"">
                        <a href="detail.html?id=${t.id}">
                            <div><img src="${t.images[0]}"></div>
                            <p>${t.title}</p>
                            <i>￥${t.type[0].price}</i>
                        </a>
                    </li>
                    
                `
                },"")}
           </ul>
            <!--    </ul>-->
            <!--</div>-->
        `
        this.elem.innerHTML = this.content;
    }

}