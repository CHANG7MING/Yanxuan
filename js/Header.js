import Component from "./Component.js";

export default class Header extends Component {
    static cssBool=false;
    navList
    elem
    userStatus
    userElem

    constructor() {
        super();
        this.setCss()
        this.elem = document.createElement("header")
        this.generateHTML()
        this.userElem = this.elem.querySelector(".user")
        this.userElem.addEventListener("click", e => this.logoutHandler(e))
        this.getUserStatus()
        this.navList = this.elem.querySelectorAll("#nav-list > li")
        this.listen()
    }

    getUserStatus(){
        this.userStatus = JSON.parse(localStorage.getItem('user'))
        if (!this.userStatus) {
            this.userElem.innerHTML = `<a href="./login.html">登录 / 注册</a>`
            return
        }
        this.userElem.innerHTML = `
            <a href="javascript:;">${this.userStatus.username}, 点击退出登录</a>
        `
    }

    logoutHandler(e){
        e.stopPropagation()
        localStorage.removeItem('user')
        this.getUserStatus()
    }

    listen() {
        Array.from(this.navList).forEach(item => {
            item.addEventListener("mouseenter", this.mouseHandler)
            item.addEventListener("mouseleave", this.mouseHandler)
        })
    }

    mouseHandler(e) {
        if (e.type === "mouseenter") {
            e.target.classList.add("hover")
            e.target.querySelector("div").classList.remove("hidden")
        }
        if (e.type === "mouseleave") {
            if (e.target.nodeName === 'LI') e.target.classList.remove("hover")
            e.target.querySelector("div").classList.add("hidden")
        }
    }


    generateHTML() {
        this.elem.innerHTML = `
            <div class="top-bar">
                <div class="container">
                    <ul>
                        <li class="user"></li>
                        <li><a href="javascript:;">会员</a></li>
                        <li><a href="javascript:;">甄选家</a></li>
                        <li><a href="javascript:;">企业采购</a></li>
                        <li><a href="javascript:;">客户服务</a></li>
                        <li><a href="javascript:;"><span></span>APP</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="title">
                <div class="container">
                    <a href="./index.html" class="logo"></a>
                    <div class="search">
                        <form>
                            <div class="search-logo"></div>
                            <input type="text" placeholder="三同好物" aria-label="search-key">
                            <input type="submit" value="搜索">
                        </form>
                        <ul>
                            <li><a href="javascript:;">蓝牙耳机</a></li>
                            <li><a href="javascript:;">洗衣液</a></li>
                            <li><a href="javascript:;">水杯</a></li>
                            <li><a href="javascript:;">iPhone 13</a></li>
                            <li><a href="javascript:;">拖鞋</a></li>
                            <li><a href="javascript:;">中秋节</a></li>
                            <li><a href="javascript:;">床垫</a></li>
                            <li><a href="javascript:;">茶</a></li>
                        </ul>
                    </div>
            
                        <a href="./cart.html">
                    <div class="cart">
                            <div class="cart-logo">
                                <div></div>
                            </div>
                            <span>购物车</span>
                            <span class="cart-num">0</span>
                    </div>
                        </a>
            
                </div>
            </div>
            
            <nav>
                <div class="container">
                    <ul id="nav-list">
                        <li>
                            <a href="./index.html">首页</a>
                            <div class="drop-down hidden">
                                <ul>
                                    <li>品质尖货</li>
                                    <li>热门爆款</li>
                                    <li>新品首发</li>
                                </ul>
            
                                <ul>
                                    <li>生活电器</li>
                                    <li>清洁电器</li>
                                    <li>衣物护理</li>
                                    <li>两季电器</li>
                                    <li>空气调节</li>
                                </ul>
            
                                <ul>
                                    <li>按摩电器</li>
                                    <li>按摩器</li>
                                    <li>按摩椅</li>
                                </ul>
            
                                <ul>
                                    <li>个护电器</li>
                                    <li>头发护理</li>
                                    <li>口腔护理</li>
                                    <li>面部护理</li>
                                    <li>身体护理</li>
                                </ul>
            
                                <ul>
                                    <li>厨房电器</li>
                                    <li>厨房电器</li>
                                </ul>
            
                                <ul>
                                    <li>智能生活</li>
                                    <li>智能家居</li>
                                    <li>智能出行</li>
                                </ul>
            
                                <ul>
                                    <li>数码办公</li>
                                    <li>3C数码</li>
                                    <li>手机配件</li>
                                    <li>车载用品</li>
                                    <li>办公文具</li>
                                </ul>
            
                                <ul>
                                    <li>影音娱乐</li>
                                    <li>影音娱乐</li>
                                    <li>乐器</li>
                                </ul>
                            </div>
            
                        </li>
                        <li>
                            <a href="javascript:;">居家生活</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">服饰鞋包</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">美食酒水</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">个护清洁</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">母婴亲子</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">运动排行</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">数码家电</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">严选全球</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">为你严选</a>
                            <div class="drop-down hidden"></div>
                        </li>
                        <li>
                            <a href="javascript:;">众筹</a>
                            <div class="drop-down hidden"></div>
                        </li>
                    </ul>
                </div>
            </nav>
        `
    }

    setCss() {
        if (Header.cssBool) return;
        Header.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/header.css">
        `
    }
}