class Board {
    writer : string;
    title : string;
    content : string;
    date : Date;
    count : number;
}

type writeBoardDTO = {
    writer : string,
    title : string,
    content : string
    date: string,
    count: number
}
type detailBoardDTO = {
    writer : string,
    title : string,
    content : string
    date : Date,
    count : number
}
type mainBoardDTO = {
    writer : string,
    title : string,
    date : Date,
    count : number
}

class LocalStroage<T>{
    storageArr : T[]
}

new LocalStroage<Board>()
// const postList : [] = [];

class WriteBoardManager {
    // contentList : Content[]
    // localStorage :  LocalStroage;
    postList: writeBoardDTO[]
    now: any;
    constructor () {
        this.postList = []
    }

    init(LocalStorage) : undefined{
        if(LocalStorage === null){
            localStorage.setItem("board_data", JSON.stringify(this.postList));
        } else{
            this.postList = JSON.parse(LocalStorage);
        }
    }

    setPostList(LocalStorage : writeBoardDTO): undefined{
        this.postList.push(LocalStorage);
        localStorage.setItem("board_data", JSON.stringify(this.postList))
    }

    // getPostList(index: number): writeBoardDTO{
    //     return this.postList[index];
    // }

    write(){
            this.init(localStorage.getItem("board_data"))
            const writer_find = <HTMLInputElement>document.getElementById("write_writer")
            const title_find = <HTMLInputElement>document.getElementById("write_title")
            const content_find = <HTMLInputElement>document.getElementById("write_content")
            const btn_find = <HTMLButtonElement>document.getElementById("write_btn")
            const cnc_btn = <HTMLButtonElement>document.getElementById("cancel")
            // const bind : writeBoardDTO = {
            //     writer: writer_find.value,
            //     title: title_find.value, 
            //     content: content_find.value
            // }
            const _this = this;
            console.log(btn_find)
            console.log(writer_find)
            console.log(content_find)
            console.log(title_find)
            btn_find.onclick = () => {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const bind = {
                    writer: writer_find.value,
                    title: title_find.value,
                    content: content_find.value,
                    date: `${year}` + `-` +  `${month + 1}`+ `-` + `${day}`,
                    count: 0
                    }
                _this.setPostList(bind)
                console.log(bind)
                if(confirm("작성완료?")){
                location.href = "./main.html";
                } else{return}
            }
            cnc_btn.onclick = () => {
                if(confirm("취소?")){
                    location.href = "./main.html"
                } else{
                    return;
                }
            }
        
    }  
}

const Boardmanager = new WriteBoardManager()
Boardmanager.write();


