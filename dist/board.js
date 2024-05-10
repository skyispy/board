class Board {
}
class LocalStroage {
}
new LocalStroage();
class WriteBoardManager {
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
    setPostList(LocalStorage) {
        this.postList.push(LocalStorage);
        localStorage.setItem("board_data", JSON.stringify(this.postList));
    }
    write() {
        this.init(localStorage.getItem("board_data"));
        const writer_find = document.getElementById("write_writer");
        const title_find = document.getElementById("write_title");
        const content_find = document.getElementById("write_content");
        const btn_find = document.getElementById("write_btn");
        const cnc_btn = document.getElementById("cancel");
        const _this = this;
        console.log(btn_find);
        console.log(writer_find);
        console.log(content_find);
        console.log(title_find);
        btn_find.onclick = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const bind = {
                writer: writer_find.value,
                title: title_find.value,
                content: content_find.value,
                date: `${year}` + `-` + `${month + 1}` + `-` + `${day}`,
                count: 0
            };
            _this.setPostList(bind);
            console.log(bind);
            if (confirm("작성완료?")) {
                location.href = "./main.html";
            }
            else {
                return;
            }
        };
        cnc_btn.onclick = () => {
            if (confirm("취소?")) {
                location.href = "./main.html";
            }
            else {
                return;
            }
        };
    }
}
const Boardmanager = new WriteBoardManager();
Boardmanager.write();
