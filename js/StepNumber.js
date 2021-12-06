import Component from "./Component.js";

export default class StepNumber extends Component {

    num = 1
    minusBtn
    plusBtn
    id

    constructor(num) {
        super();
        if (num) this.num = num;
        this.setHTML();
        this.setCss();
        this.minusBtn = this.elem.querySelector('#minus');
        this.plusBtn = this.elem.querySelector('#plus');
        this.minusBtn.addEventListener("click", e => this.clickHandler(e));
        this.plusBtn.addEventListener("click", e => this.clickHandler(e));
    }

    clickHandler(e) {
        e.target.id === 'plus' || e.target.parentNode.id === 'plus' ? this.num++ : this.num <= 1 ? this.num = 1 : this.num--
        this.elem.querySelector("input").value = this.num
        this.elem.dispatchEvent(new CustomEvent("change", {
            detail: this.num
        }))
    }

    setHTML() {

        this.elem.innerHTML = `
            <div class="step-num-con">
            
                <span id="minus"><i class="fa fa-minus"></i></span>
                <!-- 这里input的type使用tel而不是是number, 目的是保持仅能输入数字的同时不会出现上下箭头按钮 -->
                <input type="tel" value="${this.num}" readonly>
                <span id="plus"><i class="fa fa-plus"></i></span>
            
            </div>
        `

    }

    setCss() {
        if (StepNumber.cssBool) return;
        StepNumber.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/stepnumber.css">
            <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">            
        `
    }

}