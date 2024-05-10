class ModifyBoardManager {
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
        const index = JSON.parse(localStorage.getItem("num"));
        this.postList[index] = LocalStorage;
        localStorage.setItem("board_data", JSON.stringify(this.postList));
    }
    write() {
        this.init(localStorage.getItem("board_data"));
        const writer_find = document.getElementById("write_writer");
        const title_find = document.getElementById("write_title");
        const content_find = document.getElementById("write_content");
        const btn_find = document.getElementById("write_btn");
        const local_data = JSON.parse(localStorage.getItem("board_data"));
        const index = JSON.parse(localStorage.getItem("num"));
        const local_index = local_data[index];
        writer_find.value = local_index.writer;
        title_find.value = local_index.title;
        content_find.value = local_index.content;
        const cnc_btn = document.getElementById("cancel");
        const _this = this;
        console.log(btn_find);
        console.log(writer_find);
        console.log(content_find);
        console.log(title_find);
        const num_find = JSON.parse(localStorage.getItem("num"));
        btn_find.onclick = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();
            const bind = {
                writer: writer_find.value,
                title: title_find.value,
                content: content_find.value,
                date: `${year}` + `-` + `${month}` + `-` + `${day}`,
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
                location.href = "./detail.html?index=" + num_find;
            }
            else {
                return;
            }
        };
    }
}
const modifymanager = new ModifyBoardManager();
modifymanager.write();
