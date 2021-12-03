export default function (url, {method = "GET", body = null} = {method: "GET", body: null}) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(body);
        xhr.onload = function () {
            let data = xhr.response;
            try {
                data = JSON.parse(data);
            } catch (e) {
            }
            resolve(data);
        }
        xhr.onerror = function (e) {
            reject(e)
        }
    })
}