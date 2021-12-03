import Component from "./Component.js";

export default class Footer extends Component {

    elem;
    static cssBool = false;

    constructor() {
        super();
        this.setHTML();
        this.setCss();
    }

    setHTML() {
        this.elem = document.createElement('footer');
        this.elem.innerHTML = `
            <footer>
                <div class="message">
                    <div class="container">
                        <div class="box">
                            <h4>客服电话</h4>
                            <p class="phone">400-0368-163</p>
                            <p class="workTime">9:00-22:00</p>
                            <div class="btn"><a href="javascript:;">用户反馈</a><a href="javascript:;">在线客服</a></div>
                        </div>
                        <div class="box">
                            <h4>何为严选</h4>
                            <p>网易原创生活类电商品牌，秉承网易一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到最优质的商品</p>
                            <dl class="clearfix">
                                <dt>关注我们 :</dt>
                                <dd><a href="javascript:;"><img src="./img/ico_05.gif"/></a></dd>
                                <dd><a href="javascript:;"><img src="./img/ico_06.gif"/></a></dd>
                                <dd><a href="javascript:;"><img src="./img/ico_07.gif"/></a></dd>
                            </dl>
                        </div>
                        <div class="box">
                            <h4>扫码下载严选APP</h4>
                            <img src="./img/down.png" alt=""/>
                            <p class="money">首单立减8元</p>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="container">
                        <div class="title">
                            <div>30天无忧退</div>
                            <div>货满88元免邮</div>
                            <div>网易品质保证</div>
                        </div>
                        <div class="copy">
                            <p><a href="javascript:;">关于我们</a> | <a href="javascript:;">帮助中心 </a> | <a href="javascript:;">售后服务</a> | <a href="javascript:;">配送与验收</a> | <a
                                    href="javascript:;">商务合作</a> | <a href="javascript:;">企业采购</a> | <a href="javascript:;">友情链接</a></p>
                            <p>网易公司版权所有 &copy; 1997-2021 食品经营许可证：JY13301080111719</p>
                        </div>
                    </div>
                </div>
            </footer>
        `
    }

    setCss() {
        if (Footer.cssBool) return;
        Footer.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/footer.css">
        `
    }
}