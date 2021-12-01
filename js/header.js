let navList
init()

function init() {
    navList = document.querySelectorAll("#nav-list > li")
    Array.from(navList).forEach(item => {
        item.addEventListener("mouseenter", mouseHandler)
        item.addEventListener("mouseleave", mouseHandler)
    })
}

function mouseHandler(e) {
    if (e.type === "mouseenter") {
        e.target.classList.add("hover")
        e.target.querySelector("div").classList.remove("hidden")
    }
    if (e.type === "mouseleave") {
        if (e.target.nodeName === 'LI') e.target.classList.remove("hover")
        e.target.querySelector("div").classList.add("hidden")
    }
}
