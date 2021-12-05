import Component from "./Component.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import AJAX from "./AJAX.js";
import Utils from "./Utils.js";
import Zoom from "./Zoom.js";

export default class Detail extends Component {

    static detailAPI = "http://localhost:8080/getDetail";
    data
    prev
    zoom

    constructor() {
        super();
        this.setCss()
        this.elem = document.createElement("body")
        this.createHeader(this.elem)
        this.generateHTML()
    }


    async generateHTML() {
        let id = Utils.getUrlParam("id")
        console.log(id)
        this.data = await new AJAX(Detail.detailAPI + "?id=" + id)
        console.log(this.data)
        let main = document.createElement("main")
        main.innerHTML += `
        <main>
            <div class="container">
                <div class="main-content">
                
                    <div class="main-content-left"></div>
        
                    <div class="main-content-right">
                        <div class="right-top">
                            <h2>${this.data.title}</h2>
                            <p>${this.data.desc}</p>
                            <div class="rating-con">
                                <p>${this.data.rating}%</p>
                                <p>好评率</p>
                            </div>
                        </div>
                        <div class="right-main">
                            <div>
                                <span>价格</span>
                                <strong>¥<span>${this.data.sku[0].price}</span></strong>
                            </div>
                            <div>
                                <span>促销</span>
                                <a href="#" class="tag">全场换购</a>
                                <a href="#" class="discount">超值换购</a>
                            </div>
                            <div>
                                <span>邮费</span>
                                <span>满99元免邮, 邮费8元</span>
                            </div>
                            <div>
                                <span>服务</span>
                                <a href="#" class="service"><span>严选自营</span><span>30天无忧退换</span><span>国内部分地区不可配送</span></a>
                            </div>
                            <div>
                                <span>配送</span>
                                <span>地址</span>
                            </div>
                        </div>
        
                        <div class="choose-con">
                            <span>规格</span>
                            <div class="choose-content">
                                
                            ${this.data.sku.reduce((v, t) => {
            return v + `
                                <div class="choose-item">
                                    <img src="./productImg/${t.id}.webp" alt="">
                                    <span>${t.title}</span>
                               </div>
        `
        }, "")}
                                
                            </div>
                        </div>
        
                        <div class="step-num">
                            <span>数量</span>
                            <div class="step-num-con">
        
                                <span><i class="fa fa-minus"></i></span>
                                <input type="text" value="1">
                                <span><i class="fa fa-plus"></i></span>
        
                            </div>
                        </div>
        
                        <div class="buy">
                            <a href="#" class="buy-btn">立即购买</a>
                            <a href="#" class="add-cart"><i class="fa fa-shopping-cart"></i> 加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `
        this.elem.append(main)
        this.createFooter(this.elem)
        let imgList=[this.data.img1, this.data.img2,this.data.img3,this.data.img4,this.data.img5]
        console.log(imgList)

        this.createZoom(imgList, ".main-content-left")
        this.linkSKUWithImgCon()
    }

    linkSKUWithImgCon(){
        let sku = this.elem.querySelectorAll(".choose-item")
        sku.forEach(item => item.addEventListener("click", e => this.skuClickHandler(e)))

    }

    skuClickHandler(e){
        console.log(e.target)
        if (e.target.nodeName !== "IMG") return
        if (this.prev) this.prev.parentNode.classList.remove("selected")
        console.log(e.target.parentNode)
        e.target.parentNode.classList.add("selected")
        this.prev = e.target
        console.log(e.target.src.match(/.*\/(.*?\..*)/)[1])
        this.zoom.changeImg("./"+e.target.src.match(/.*\/(.*?\..*)/)[1])
    }

    createZoom(arr,parent){
        this.zoom = new Zoom(arr)
        this.zoom.appendTo(parent)
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
            <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
            <link rel="stylesheet" href="./css/normalize.css">
            <link rel="stylesheet" href="./css/detail.css">
            <link rel="stylesheet" href="./css/global.css">            
        `
    }

}