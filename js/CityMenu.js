import Component from "./Component.js";
import AJAX from "./AJAX.js";

export default class CityMenu extends Component {
    static getProvinceAPI = "http://localhost:8080/getProvince";
    static getCityAPI = "http://localhost:8080/getCity";
    static getTownAPI = "http://localhost:8080/getTown";

    provinceElem
    cityElem
    townElem
    provinceList
    cityList
    townList
    selectedProvince = "0"
    selectedCity = "0"
    selectedTown = "0"
    elem

    constructor() {
        super();
        this.setCss()
        this.createContent()
        this.listenOption()
        this.getProvince()
    }

    listenOption() {
        this.elem.querySelectorAll("select").forEach(item => item.addEventListener("change", e => this.changeHandler(e)))
    }

    changeHandler(e) {
        switch (e.target.id) {
            case "province":
                this.cityElem.innerHTML = '<option value="0">请选择城市</option>'
                this.townElem.innerHTML = '<option value="0">请选择区县</option>'
                this.selectedProvince = e.target.value
                this.selectedCity = "0"
                this.selectedTown = "0"
                if (this.selectedProvince === "0") break
                this.getCityOrTown(true)
                break;
            case "city":
                this.selectedTown = "0"
                this.selectedCity = e.target.value
                this.townElem.innerHTML = '<option value="0">请选择区县</option>'
                if (this.selectedCity === "0") break
                this.getCityOrTown(false)
                break;
            case "town":
                this.selectedTown = e.target.value
                break;
        }
    }

    async getProvince() {
        this.provinceList = await new AJAX(CityMenu.getProvinceAPI);
        this.provinceElem.innerHTML = '<option value="0">请选择省份</option>'
        for (const [key, value] of Object.entries(this.provinceList)) {
            this.provinceElem.innerHTML += `<option value="${key}">${value}</option>`
        }
    }

    async getCityOrTown(isGetCity) {
        let reqAPI = isGetCity ? CityMenu.getCityAPI : CityMenu.getTownAPI
        let body = isGetCity ? { provinceId: this.selectedProvince } : { cityId: this.selectedCity }
        let result = await new AJAX(reqAPI, {
            method: "POST",
            body: JSON.stringify(body)
        })
        if (isGetCity) {
            this.cityList = result
            for (const [key, value] of Object.entries(this.cityList)) {
                this.cityElem.innerHTML += `<option value="${key}">${value}</option>`
            }
        } else {
            this.townList = result
            for (const [key, value] of Object.entries(this.townList)) {
                this.townElem.innerHTML += `<option value="${key}">${value}</option>`
            }
        }
    }


    createContent() {
        this.elem = document.createElement("div");
        this.elem.className = "city-menu";
        this.elem.innerHTML = `
            <div class="city-menu-province">
                <select id="province">
                    <option value="0">请选择省份</option>
                </select>
            </div>
            <div class="city-menu-city">
                <select id="city">
                    <option value="0">请选择城市</option>
                </select>
            </div>
            <div class="city-menu-town">
                <select id="town">
                    <option value="0">请选择区县</option>
                </select>
            </div>
        `;
        this.provinceElem = this.elem.querySelector("#province");
        console.log(this.provinceElem)
        this.cityElem = this.elem.querySelector("#city");
        this.townElem = this.elem.querySelector("#town");
    }

    setCss() {
        if (CityMenu.cssBool) return;
        CityMenu.cssBool = true;
        document.head.innerHTML += `
            <link rel="stylesheet" href="./css/citymenu.css">            
        `
    }
}