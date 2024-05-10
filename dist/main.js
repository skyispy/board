class MainBoardManager {
    constructor() {
        this.postList = [];
    }
    init(LocalStorage) {
        if (LocalStorage === null) {
            localStorage.setItem("board_data", JSON.stringify(this.postList));
        }
        else {
            this.postList = JSON.parse(LocalStorage);
        }
    }
    render() {
        const localdata = JSON.parse(localStorage.getItem("board_data"));
        console.log(localdata);
        this.init(localStorage.getItem("board_data"));
        const content_find = document.querySelector(".content");
        content_find.innerHTML = "";
        for (let i = 0; i < localdata.length; i++) {
            const div1 = document.createElement("div");
            div1.classList.add("main-box");
            div1.draggable = true;
            div1.dataset.index = `${i}`;
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            const span3 = document.createElement("span");
            const span4 = document.createElement("span");
            span1.innerHTML = localdata[i].writer;
            span2.innerHTML = localdata[i].title;
            span3.innerHTML = localdata[i].date;
            span4.innerHTML = localdata[i].count;
            div1.append(span1, span2, span3, span4);
            content_find.append(div1);
            span1.onclick = () => {
                if (confirm("이동?")) {
                    localdata[i].count++;
                    localStorage.setItem("board_data", JSON.stringify(localdata));
                    location.href = "./detail.html?index=" + i;
                }
            };
            let _target = null;
            document.ondragstart = (e) => {
                if (e.target.classList.contains("main-box")) {
                    _target = e.target;
                    _target.style.backgroundColor = "gray";
                    console.log(e.target.getAttribute("data-index"));
                    localStorage.setItem("num", JSON.stringify(e.target.getAttribute("data-index")));
                }
            };
            document.ondragend = (e) => {
                if (e.target.classList.contains("main-box")) {
                    _target.style.backgroundColor = "transparent";
                    _target = null;
                }
            };
            document.ondragenter = (e) => {
                if (e.target.classList.contains("main-box") && _target !== null)
                    e.target.style.backgroundColor = "gray";
            };
            document.ondragleave = (e) => {
                if (e.target.classList.contains("main-box") && _target !== null)
                    e.target.style.backgroundColor = "transparent";
            };
            document.ondragover = (e) => {
                if (e.target.classList.contains("main-box") && _target !== null)
                    e.preventDefault();
            };
            document.ondrop = (e) => {
                if (e.target.classList.contains("main-box") && _target !== null) {
                    e.target.style.backgroundColor = "gray";
                    console.log(e.target.getAttribute("data-index"));
                    let exchange = localdata[e.target.getAttribute("data-index")];
                    let num = JSON.parse(localStorage.getItem("num"));
                    console.log(num);
                    localdata[e.target.getAttribute("data-index")] = localdata[num];
                    localdata[num] = exchange;
                    console.log(localdata);
                    console.log(localdata);
                    localStorage.setItem("board_data", JSON.stringify(localdata));
                    location.reload();
                }
            };
        }
    }
}
const mainManager = new MainBoardManager();
mainManager.render();
