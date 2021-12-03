import TimeManager from "./TimeManager.js";
import Component from "./Component.js";

export default class Carousel extends Component {
    static LEFT = Symbol();
    static RIGHT = Symbol();
    static cssBool = false;
    elem;
    autoBool = false;
    time = 200;
    dot;
    imgCon;
    list = [];
    itemList = [];
    bnList = [];
    pos = 0;
    x = 0;
    prev;
    moveBool = false;
    speed = 50;
    direction = Carousel.LEFT;


    constructor(list) {
        super();
        document.querySelector("head").innerHTML += "<link rel=\"stylesheet\" href=\"https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css\" crossorigin=\"anonymous\">"
        this.elem = document.createElement("div");
        this.elem.className = "carousel";
        if (list) this.setData(list);
        this.elem.addEventListener("mouseenter", e => this.mouseHandler(e));
        this.elem.addEventListener("mouseleave", e => this.mouseHandler(e));
        this.setCss();
        TimeManager.getInstance().add(this);
    }

    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        if (parent) {
            parent.appendChild(this.elem);
            // this.elem.style.height = parent.offsetWidth / 5 + "px";
        }
    }

    setData(list) {
        this.list = list;
        this.itemList.length = 0;
        this.pos = 0;
        this.time = 200;
        this.autoBool = false;
        this.createImageCon(this.elem);
        this.createDot(this.elem);
        this.createBnList(this.elem);
        this.changePrev();
    }

    mouseHandler(e) {
        this.autoBool = e.type !== "mouseenter";
    }

    createImageCon(carousel) {
        this.imgCon = document.createElement("div");
        this.imgCon.className = "img-con";
        this.imgCon.appendChild(this.getImageItem(0));
        carousel.appendChild(this.imgCon);
    }

    createDot(carousel) {
        this.dot = document.createElement("ul");
        this.dot.className = "dot";
        this.dot.innerHTML = this.list.reduce((value, item, i) => {
            return value + `<li><a href='#${i}'></a></li>`;
        }, "");
        carousel.appendChild(this.dot);
        this.dot.addEventListener("click", e => this.dotClickHandler(e));
    }

    createBnList(carousel) {
        for (let i = 0; i < 2; i++) {
            let bn = this.createBn(i === 0);
            bn.className = i === 0 ? "left" : "right";
            carousel.appendChild(bn);
            this.bnList.push(bn);
            bn.addEventListener("click", e => this.bnClickHandler(e));
        }
    }

    createBn(left) {
        let bn = document.createElement("div");
        bn.innerHTML = "<i class='fa fa-angle-left'></i>"
        bn.style.width = "50px";
        bn.style.height = "50px";
        bn.style.backgroundColor = "#E2C199";
        bn.style.borderRadius = "50px";
        if (!left) bn.style.transform = "scale(-1,1) translate(0,-50%)";
        return bn;
    }

    getImageItem(n) {
        if (this.itemList[n]) return this.itemList[n];
        let div = document.createElement("div");
        div.className = "image-item";
        div.innerHTML = `<img src="${this.list[n].img}">`
        this.itemList[n] = div;
        return this.itemList[n];
    }

    changePrev() {
        if (this.prev) {
            this.prev.style.backgroundColor = "rgba(255,0,0,0)";
            this.prev.style.boxShadow = "none";
        }
        this.prev = this.dot.children[this.pos].firstElementChild;
        this.prev.style.backgroundColor = "#A7936E";
        this.prev.style.boxShadow = "0 0 0 4px #dfcead";
    }

    dotClickHandler(e) {
        if (e.target.nodeName !== "A") return;
        let index = Array.from(this.dot.children).indexOf(e.target.parentElement);
        this.direction = index > this.pos ? Carousel.LEFT : Carousel.RIGHT;
        this.pos = index;
        this.createNextImg();
    }

    bnClickHandler(e) {
        if (this.className === "left") {
            this.pos--;
            if (this.pos < 0) this.pos = this.list.length - 1;
            this.direction = Carousel.RIGHT;
        } else {
            this.pos++;
            if (this.pos > this.list.length - 1) this.pos = 0;
            this.direction = Carousel.LEFT;
        }
        this.createNextImg();
    }

    createNextImg() {
        if (this.direction === Carousel.LEFT) {
            this.x = 0;
            this.imgCon.appendChild(this.getImageItem(this.pos));
        } else if (this.direction === Carousel.RIGHT) {
            this.imgCon.insertBefore(this.getImageItem(this.pos), this.imgCon.firstElementChild);
            this.x = -this.getImageItem(this.pos).offsetWidth;
        }
        this.imgCon.style.left = this.x + "px";
        this.moveBool = true;
        this.changePrev();
    }

    moveAnimation() {
        if (!this.moveBool) return;
        if (this.direction === Carousel.LEFT) {
            this.x -= this.speed;
            if (this.x <= -this.imgCon.firstElementChild.offsetWidth) {
                this.imgCon.firstElementChild.remove();
                this.x = 0;
                this.moveBool = false;
            }
        } else if (this.direction === Carousel.RIGHT) {
            this.x += this.speed;
            if (this.x >= 0) {
                this.imgCon.lastElementChild.remove();
                this.x = 0;
                this.moveBool = false;
            }
        }
        this.imgCon.style.left = this.x + "px";
    }

    autoMove() {
        if (!this.autoBool) return;
        this.time--;
        if (this.time > 0) return;
        this.time = 200;
        this.bnList[1].dispatchEvent(new MouseEvent("click"));
    }

    update() {
        this.moveAnimation()
        this.autoMove();
    }

    setCss() {
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/carousel.css">
        `
    }
}