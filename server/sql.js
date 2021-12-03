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

function selectPersonBySex(sex) {
    return new Promise(function (resolve, reject) {
        let str = "SELECT * FROM `user` WHERE `sex`=?"
        sex = [sex]
        db.query(str, sex, (err, result) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(result)
            }
        })
    })
}

function deleteItemById(id) {
    return new Promise(function (resolve, reject) {
        let str = "DELETE FROM `user` WHERE `id`=?"
        id = [id]
        db.query(str, id, (err) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

exports.db = db;
exports.register = register;
exports.selectPersonBySex = selectPersonBySex;
exports.deleteItemById = deleteItemById;
exports.login = login;
exports.getCart = getCart;
