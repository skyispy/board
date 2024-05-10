class DetailBoardManager {
    // contentList : Content[]
    // localStorage :  LocalStroage;
    postList: detailBoardDTO[]
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

    // setPostList(LocalStorage : detailBoardDTO) : undefined{
    //     this.postList.push(LocalStorage);
    //     localStorage.setItem("board_data", JSON.stringify(LocalStorage))
    // }

    // getPostList(index: number): detailBoardDTO{
    //     this.render();
    //     return this.postList[index];
    // }

    render(){
        const param = new URLSearchParams(location.search).get("index");
        let str : any = location.search;
        str = str.replace("?","");
        console.log(str)
        str = str.split("=");
        console.log(str)
        
        console.log(location.search)
        console.log(location.href)
        console.log(JSON.parse(localStorage.getItem("board_data"))[parseInt(param)]);
            const localdata = JSON.parse(localStorage.getItem("board_data"))[parseInt(param)]
            console.log(localdata)
            const detail_writer = localdata.writer;
            const detail_title = localdata.title;
            const detail_content = localdata.content;
            const detail_date = localdata.date;
            const detail_count = localdata.count;

            const write = document.querySelector("#writer")
            const title = document.querySelector(".title") 
            const content = document.querySelector(".content"  )
            const date = document.querySelector("#date")
            const count = document.querySelector("#count")

            write.innerHTML = detail_writer
            title.innerHTML = detail_title
            content.innerHTML = detail_content
            date.innerHTML = String(detail_date)
            count.innerHTML = String(detail_count)
            const dlt_btn = document.getElementById("delete")
            dlt_btn.onclick = () => {
                const finder = JSON.parse(localStorage.getItem("board_data"));
                console.log(finder);
                if(confirm("삭제?")){
                finder.splice(param, 1)
                localStorage.setItem("board_data", JSON.stringify(finder))
                location.href = "./main.html"
                } else{
                    return;
                }
            }
            const lst_btn = document.getElementById("list")
            lst_btn.onclick = () => {
                location.href = "./main.html"
            }
            localStorage.setItem("num", JSON.stringify(param))
            const mdf_btn = document.getElementById("modify")
            mdf_btn.onclick = () => {
                location.href = "./modify.html"
            }
        // }
    }
}

const detailboard = new DetailBoardManager()
detailboard.render();