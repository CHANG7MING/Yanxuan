const http = require("http");
const {
    register:dbRegister,
    getCart:dbGetCart,
    login:dbLogin,
    getList:dbGetList,
    addListPrice:dbAddListPrice,
    getDetail:dbGetDetail,
    addDetailSKUInfo: dbAddDetailSKUInfo,
    updateCart: dbUpdateCart,
    addCart: dbAddCart,
} = require("./sql");

http.createServer(function (req, res) {
    let type = req.url.split("?")[0];
    console.log("type: " + type)
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    })
    router(type, req, res)

}).listen(8080);

function router(type, req, res) {
    switch (type) {
        case "/login":
            return login(req, res);
        case "/register":
            return register(req, res);
        case "/getList":
            return getList(req, res);
        case "/getCart":
            return getCart(req, res);
        case "/getDetail":
            return getDetail(req, res);
        case "/updateCart":
            return updateCart(req, res);
        case "/addCart":
            return addCart(req, res);
    }
}

async function addCart(req,res){
    let data = await getData(req);
    data = JSON.parse(data);
    console.log(data);
    let result = await dbAddCart(data);
    console.log(result);
    res.end(JSON.stringify(result));
}

async function updateCart(req,res) {
    let data = await getData(req)
    data = JSON.parse(data)
    let result = await dbUpdateCart(data.id, data.num);
    console.log(result)
    res.end(JSON.stringify(result));
}

// TODO: 购物车
async function getCart(req, res) {
    let user = await getData(req)
    user = JSON.parse(user)
    let result = await dbGetCart(user.id);
    res.end(JSON.stringify(result));
}

async function getDetail(req, res) {
    let id = req.url.split("=")[1];
    console.log("getDetail: "+id)
    let data = await dbGetDetail(id);
    data = await dbAddDetailSKUInfo(data[0])
    res.end(JSON.stringify(data));
}

async function getList(req,res) {
    let result = await dbGetList(req, res);
    result = await dbAddListPrice(result)
    res.end(JSON.stringify(result))
}

async function login(req, res) {
    let data = await getData(req);
    data = JSON.parse(data)
    let result = await dbLogin(data)

    res.end(JSON.stringify(result));
}

async function register(req, res) {
    let data = await getData(req)
    data = JSON.parse(data)
    let arr = [data.username, data.password]
    if (!Array.isArray(arr) || arr.length !== 2 || !arr[0] || !arr[1]) {
        return res.end(JSON.stringify({ok: false, msg: "数据格式错误"}))
    }
    let result = await dbRegister(arr)
    res.end(JSON.stringify(result))
}

function getData(req) {
    return new Promise(function (resolve, reject) {
        let data = "";
        req.on("data", function (chunk) {
            data += chunk;
        })
        req.on("end", function () {
            resolve(data);
        })
    })
}
