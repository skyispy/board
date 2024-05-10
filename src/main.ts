class MainBoardManager {
    // contentList : Content[]
    // localStorage :  LocalStroage;
    postList: mainBoardDTO[]
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

    // setPostList(LocalStorage : mainBoardDTO) : undefined{
    //     this.postList.push(LocalStorage);
    //     localStorage.setItem("board_data", JSON.stringify(LocalStorage))
    // }

    // getPostList(index: number): mainBoardDTO{
    //     this.render();
    //     return this.postList[index];
    // }

    render(){
        const localdata = JSON.parse(localStorage.getItem("board_data"))
        console.log(localdata)
        this.init(localStorage.getItem("board_data"));
        const content_find = document.querySelector(".content");
        content_find.innerHTML = "";
        for(let i = 0; i < localdata.length; i++){
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
                if(confirm("이동?")){
                    localdata[i].count++;
                    localStorage.setItem("board_data", JSON.stringify(localdata))
                    location.href = "./detail.html?index="+i;
                }
            }
            let _target = null;

            document.ondragstart = (e: any) => {
                if(e.target.classList.contains("main-box")){
                    _target = e.target;
                    _target.style.backgroundColor = "gray";
                    console.log(e.target.getAttribute("data-index"))
                    localStorage.setItem("num", JSON.stringify(e.target.getAttribute("data-index")))
                }
            }

            document.ondragend = (e: any) => {
                if(e.target.classList.contains("main-box")){
                    _target.style.backgroundColor = "transparent";
                    _target = null;
                }
            }

            document.ondragenter = (e: any) => {
                if(e.target.classList.contains("main-box") && _target !== null)
                    e.target.style.backgroundColor = "gray";
            }

            document.ondragleave = (e: any) => {
                if(e.target.classList.contains("main-box") && _target !== null)
                    e.target.style.backgroundColor = "transparent";
            }

            document.ondragover = (e: any) => {
                if(e.target.classList.contains("main-box") && _target !== null)
                    e.preventDefault();
            }

            document.ondrop = (e: any) => {
                if(e.target.classList.contains("main-box") && _target !== null){
                    e.target.style.backgroundColor = "gray";
                    console.log(e.target.getAttribute("data-index"))
                    let exchange = localdata[e.target.getAttribute("data-index")]
                    let num = JSON.parse(localStorage.getItem("num"));
                    console.log(num)
                    localdata[e.target.getAttribute("data-index")] = localdata[num];
                    localdata[num] = exchange  
                    console.log(localdata)
                    console.log(localdata)
                    localStorage.setItem("board_data", JSON.stringify(localdata))
                    location.reload();
                }
            }
            // const search_find = <HTMLInputElement>document.getElementById("search_text");
            // const search = <HTMLButtonElement>document.getElementById("search_btn");
            // search.onclick = () => {
            //     content_find.innerHTML = "";
            //     for(let i = 0; i < localdata.length; i++){
            //         if(localdata[i].title.includes(String(search_find.value)) === true){
            //             console.log(localdata[i].title.includes(String(search_find.value)))
            //             const div1 = document.createElement("div")
            //             div1.classList.add("main-box")
            //             div1.draggable = true;
            //             div1.dataset.index = `${i}`
            //             const span1 = document.createElement("span")
            //             const span2 = document.createElement("span")
            //             const span3 = document.createElement("span")
            //             const span4 = document.createElement("span")
            //             span1.innerHTML = localdata[i].writer;
            //             span2.innerHTML = localdata[i].title;
            //             span3.innerHTML = localdata[i].date;
            //             span4.innerHTML = localdata[i].count;
            //             div1.append(span1, span2, span3, span4);
            //             content_find.append(div1);
            //             // asyncad();
            //         }
            //     }
            // }
        }
    }
}

const mainManager = new MainBoardManager()
mainManager.render();   

// function footer (a) {
//     const footerFinder = document.querySelector(".footer");
//     const footerBox = document.createElement("div");
//     const footerSpan = document.createElement("span");
//     footerBox.append(footerSpan);
//     footerFinder.append(footerBox);
//     footerSpan.innerText = a;
// }

// function adver (a) {
//     const adFinder = document.querySelector(".content");
//     const adDiv = document.createElement("div");
//     adDiv.classList.add("ad-box");
//     const adSpan = document.createElement("span");
//     adFinder.append(adDiv);
//     adDiv.append(adSpan);
//     adSpan.innerText = a;
// }

// const callback = (text, time) => {
//     return new Promise((res, rej)=>{
//         try{
//             setTimeout(()=>{
//                 res(text);
//             }, time)
//         }catch(e){
//             console.log(e);
//         }
//     })
// }

// const asyncfooter = async () => {
//     try{
//         const test = await callback("게시판", 2000);
//         footer(test)
//     }catch(e){
//         console.log(e);
//     }
// }
// const asyncad = async () => {
//     try{
//         const test2 = await callback("광고", 4000);
//         adver(test2);
//     }catch(e){
//         console.log(e);
//     }
// }

// asyncad();
// asyncfooter();