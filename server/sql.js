const mysql = require("mysql");
let db;
init();

async function init() {
    db = mysql.createPool({
        url: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "yanxuan"
    });
}

function getCartNum(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE uid = ${id}`, (err, data) => {
            if (err) {
                resolve(err);
            } else {
                resolve(data.length);
            }
        });
    });
}

function addCart(data) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE uid = ${data.uid} AND pid = ${data.pid}`, (err, res) => {
            if (err) {
                resolve({
                    ok: false,
                    msg: "查询失败"
                });
            } else if (res.length === 1) {
                db.query(`UPDATE cart SET num = ${res[0].num + data.num} WHERE pid = ${data.pid}`, (err, data) => {
                    if (err) {
                        resolve({
                            ok: false,
                            msg: "添加失败"
                        });
                    } else {
                        resolve({
                            ok: true,
                            msg: "添加成功"
                        });
                    }
                });
            } else if (res.length === 0) {
                db.query(`INSERT INTO cart (uid, pid, num) VALUES (${data.uid}, ${data.pid}, ${data.num})`, (err, data) => {
                    if (err) {
                        resolve({
                            ok: false,
                            msg: "新增失败"
                        });
                    } else {
                        resolve({
                            ok: true,
                            msg: "新增成功"
                        });
                    }
                });
            } else {
                resolve({
                    ok: false,
                    msg: "数据库数据可能存在错误"
                });
            }
        });
    });
}

function updateCart(id, num){
    return new Promise((resolve, reject) => {
        let str = num === 0 ? "DELETE FROM cart WHERE id = ?" : "update cart set num = ? where id = ?";
        let arr = num === 0 ? [id] : [num, id];
        db.query(str, arr, (err, data) => {
            if (err) {
                console.log(err)
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getDetail(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM product WHERE id = ${id}`, (err, data) => {
            if (err) {
                resolve(err);
            } else {
                resolve(data);
            }
        });
    });
}

function addDetailSKUInfo(obj) {
    return new Promise((resolve, reject) => db.query(`SELECT * FROM sku WHERE pid=${obj.id};`, async (err, res) => {
        Object.defineProperty(obj, "sku", {
            value: [],
            writable: true,
            enumerable: true,
            configurable: true
        })
        res.forEach(i => {
            obj.sku.push({
                id: i.id,
                pid: i.pid,
                subtitle: i.subtitle,
                price: i.price
            })
        });
        resolve(obj)
    }))
}

function getCart(uid) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT cart.id, cart.pid, cart.num, product.title, sku.price, sku.subtitle FROM sku, product, cart WHERE sku.pid = product.id AND cart.pid = sku.id AND cart.uid = ${uid}`, (err, result) => {
            if (err) {
                console.log(err)
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function getList(){
    return new Promise((resolve, reject) => {
        db.query('SELECT `id`, `title`, `desc`, `img1`, `img2` FROM product;', (err, result) => {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                resolve(result);
            }
        });
    });
}

function addListPrice(arr) {
    return new Promise((resolve, reject) => {
        let data = arr.map(item => {
            return new Promise((resolve, reject) => db.query(`SELECT \`price\` FROM sku WHERE pid=${item.id} AND id= ${item.id}01;`, async (err, res) => {
                Object.defineProperty(item, "price", {
                    value: res[0].price,
                    writable: true,
                    enumerable: true,
                    configurable: true
                })
                resolve()
            }))
        })
        Promise.all(data).then(() => {
            resolve(arr)
        })
    })
}

function login(obj) {
    return new Promise((resolve, reject) => {
        db.query(`select * from user where username='${obj.username}' and password='${obj.password}'`, (err, data) => {
            if (err) {
                resolve({ok: false, msg: "数据库错误"});
            } else if (data.length === 0) {
                resolve({ok: false, msg: "用户名或密码错误"});
            } else if (data.length === 1) {
                resolve({ok: true, msg: "登录成功", data: data[0]});
            }
        })
    })
}

function register(arr) {
    return new Promise(function (resolve, reject) {
        let sqlStr = "INSERT INTO `user`(`username`,`password`) VALUES (?,?)";
        db.query(sqlStr, arr, function (err, res) {
            if (err) {
                if (err.errno === 1062) resolve({ok: false, msg: "用户名已存在"});
                else resolve({ok: false, msg: "数据库错误"});
            } else {
                resolve({ok: true, msg: "注册成功"});
            }
        })
    })
}

exports.db = db;
exports.register = register;
exports.login = login;
exports.getCart = getCart;
exports.getList = getList;
exports.addListPrice = addListPrice;
exports.getDetail = getDetail;
exports.addDetailSKUInfo = addDetailSKUInfo;
exports.updateCart = updateCart;
exports.addCart = addCart;
exports.getCartNum = getCartNum;