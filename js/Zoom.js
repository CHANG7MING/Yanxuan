import Component from "./Component.js";

export default class Zoom extends Component{

    mini
    zoom
    mask
    carousel
    prev

    constructor(arr) {
        super();
        this.setCss()
        this.elem.classList.add("zoom");

        this.generateHTML(arr)
        this.mini = this.elem.querySelector(".img-con");
        this.mask = this.elem.querySelector(".mask");
        this.zoom = this.elem.querySelector(".zoom-con");
        this.carousel = this.elem.querySelector(".img-list");

        this.prev = this.elem.querySelector(".img-list .selected");


        this.changeImg(arr[0])
        this.mini.addEventListener("mouseenter", e => this.mouseHandler(e));
        this.carousel.addEventListener("mouseover", e => this.mouseoverHandler(e));
        this.carousel.addEventListener("mouseout", e => this.mouseoverHandler(e));

    }

    mouseHandler(e) {
        if (e.type === "mouseenter") {
            this.mask.style.display = this.zoom.style.display = "block";
            this.mini.addEventListener("mousemove", e => this.mouseHandler(e));
            this.mini.addEventListener("mouseleave", e => this.mouseHandler(e));
        } else if (e.type === "mouseleave") {
            this.mask.style.display = this.zoom.style.display = "none";
            this.mini.removeEventListener("mousemove", e => this.mouseHandler(e));
            this.mini.removeEventListener("mouseleave", e => this.mouseHandler(e));
        } else if (e.type === "mousemove") {
            this.moveMask(e.clientX, e.clientY)
        }
    }

    mouseoverHandler(e) {
        if (e.target.nodeName !== "IMG") return;
        if(e.type === "mouseout") {
            this.prev = e.target
        }
        else if(e.type === "mouseover") {
            this.prev.classList.remove("selected")
            e.target.classList.add("selected")
            this.changeImg(e.target.src.match(/.*\/(.*?)$/)[1]);
        }
    }

    moveMask(x, y) {
        let rect = this.mini.getBoundingClientRect();
        x = x - this.mask.offsetWidth / 2 - rect.left;
        y = y - this.mask.offsetHeight / 2 - rect.top;
        if (x <= 0) x = 0;
        if (y <= 0) y = 0;
        if (x >= rect.width - this.mask.offsetWidth) x = rect.width - this.mask.offsetWidth;
        if (y >= rect.height - this.mask.offsetHeight) y = rect.height - this.mask.offsetHeight;
        Object.assign(this.mask.style, {
            left: x + "px",
            top: y + "px",
        })
        Object.assign(this.zoom.style, {
            backgroundPositionX: -x * (this.zoom.offsetWidth / this.mask.offsetWidth) + "px",
            backgroundPositionY: -y * (this.zoom.offsetHeight / this.mask.offsetHeight) + "px",
        })
    }

    // 切换规格也需要调用这个方法
    changeImg(src) {
        this.mini.style.backgroundImage = "url(./productImg/" + src + ")";
        this.zoom.style.backgroundImage = "url(./productImg/" + src + ")";
    }

    generateHTML(arr){
        this.elem.innerHTML += `
           
            <div class="img-con">
                <div class="mask"></div>
            </div>
            <div class="zoom-con">
            </div>
            <div class="img-list">
                <div>
                    <img src="./productImg/${arr[0]}" class="selected" alt="">
                    <img src="./productImg/${arr[1]}" alt="">
                    <img src="./productImg/${arr[2]}" alt="">
                    <img src="./productImg/${arr[3]}" alt="">
                    <img src="./productImg/${arr[4]}" alt="">
                </div>
            </div>
        `

    }

    setCss() {
        if (Zoom.cssBool) return;
        Zoom.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/zoom.css">            
        `
    }

}