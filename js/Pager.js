import Component from "./Component.js";

export default class Pager extends Component{
    itemsOfEachPage
    data
    parentElement
    showContent
    currentPage
    pageNum

    constructor(data, itemsOfEachPage, parentElement){
        super();
        this.setCss()
        this.data = data;
        this.itemsOfEachPage = itemsOfEachPage;
        this.parentElement = parentElement;
        this.parentElement.classList.add("pager");
        this.createPager()
    }

    updateData(data) {
        this.data = data;
        this.createPager();
    }

    createPager() {
        this.pageNum = Math.ceil(this.data.length / this.itemsOfEachPage)
        this.showContent = this.data.slice(0, this.itemsOfEachPage)
        this.jumpToPage(1)

        this.parentElement.innerHTML = `
            <a href="javascript:;" class="prev page"> < </a>
            ${Array(this.pageNum).fill(0).map((t, i) => `<a href="javascript:;" class="page" page="${i+1}">${i + 1}</a>`).join("")}
            <a href="javascript:;" class="next page"> > </a>
        `
        this.parentElement.querySelectorAll(".page").forEach(t => t.addEventListener("click", e => this.pageClickHandler(e)))
    }

    jumpToPage(pageNumber) {
        this.currentPage = pageNumber
        let start = (pageNumber - 1) * this.itemsOfEachPage;
        let end = pageNumber * this.itemsOfEachPage;
        this.showContent = this.data.slice(start, end)
        this.parentElement.dispatchEvent(new CustomEvent("pageChange",{
            detail: this.showContent
        }))
    }

    pageClickHandler(e){
        if (e.target.classList.contains("prev")) {
            if (this.currentPage <= 1) return
            this.jumpToPage(this.currentPage - 1)
        } else if (e.target.classList.contains("next")) {
            if (this.currentPage >= this.pageNum) return
            this.jumpToPage(this.currentPage + 1)
        }else {
            let page = e.target.getAttribute("page")
            this.jumpToPage(page)
        }
    }

    setCss() {
        if (Pager.cssBool) return;
        Pager.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/pager.css">            
        `
    }
}