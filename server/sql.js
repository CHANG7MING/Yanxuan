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

function getCart(userId) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE userId = ${userId}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getList(){
    return new Promise((resolve, reject) => {
        db.query(`SELECT \`id\`, \`title\`, \`desc\`, \`img1\`, \`img2\` FROM product;`, (err, result) => {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                resolve(result);
            }
        });

        // data.forEach(item => {
        //     item.price = db.query(`SELECT \`price\` FROM sku WHERE pid=${item.id} AND id=${item.id}+01;`, (err,res) => {
        //         item.price = res[0].price
        //     })
        // })
        // console.log("123"+data)
        // resolve(data)

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
