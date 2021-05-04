var main_ = document.getElementById("taipei_fun");
var tpe_input = document.querySelector(".tpe_input")
var tpe_btn = document.querySelector(".tpe_btn")
var ec2 = 'http://54.249.216.135:3000/'
var local = 'http://0.0.0.0:3000/'   //3

getPage()
function getPage(){ //page=nextPage
    let url= `${ec2}api/attractions`;
    fetchData(url)
        .then(function (data) {
            nextPage = data["nextPage"];
            console.log(`getPage: ${nextPage}`)
            //console.log(`getPage len: ${data["data"].length}`) //V
            createElement(data);
        })
}
/*==================================
            載入與scroll
=================================== */
let scrolling = (f, delay) => {
    let timeout;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            f(...args);
        }, delay);
    };
};
///*
// if(!tpe_input.value){
    window.addEventListener("scroll", scrolling(e => {
        let scrolled = window.scrollY;
        let screen_h = document.documentElement.clientHeight;
        let total_h = document.documentElement.scrollHeight;
        let loading = (total_h - screen_h) * 0.9
    
        if (scrolled > loading) {
            if (nextPage != null) {
                // getPage() //X
                let url=`${ec2}api/attractions?page=${nextPage}`; //?page=${page}
                fetchData(url)
                    .then(function (data) {
                        nextPage = data["nextPage"];
                        console.log(`ALL: ${nextPage}`)
                        //console.log(`ALL len: ${data["data"].length}`) //V
                        createElement(data);
                        //getPage()   //ok
                    });
            };
        }
    }, 500)); 
// }
//*/

/*==================================
    controller - search for keyword
=================================== */

///*
tpe_btn.addEventListener("click", searchKeyword)
//*/

///*
function searchKeyword(){
    nextPage = 0;
    // var main_ = document.getElementById("taipei_fun");
    main_.innerHTML = "";
    keyword = tpe_input.value;
    if (nextPage != null) {
        let url=`${ec2}api/attractions?page=${nextPage}&keyword=${keyword}`; //page=${page}&
        fetchData(url)               
            .then(function (data) {
                nextPage = data["nextPage"];
                console.log(`searchKeyword: ${nextPage}`)
                //console.log(`searchKeyword len: ${data["data"].length}`)
                createElement(data)  
                //getPage(data) //X
            })
        }
}
//*/

/*==================================
            view
=================================== */
function createElement(data){
    const ul_ = document.createElement("ul");
    console.log(data.data.length)
    main_.appendChild(ul_)
    for(var i = 0; i<data.data.length;i++){
        let lis_ = document.createElement("li");
        let imgs = document.createElement("img");
        let p = document.createElement("p");
        let div = document.createElement("div");
        let s1 = document.createElement("span");
        let s2 = document.createElement("span");
        ul_.appendChild(lis_);
        lis_.appendChild(imgs);
        lis_.appendChild(p);
        lis_.appendChild(div);
        div.appendChild(s1);
        div.appendChild(s2);
        s2.classList.add("s2");
        first_photo = data.data[i]['image'].split('[",');
        photo = first_photo[0].split(",")[0].replace("['", '').replace("'", '').replace("]", '');
        imgs.setAttribute("alt", data.data[i]['name']);
        imgs.setAttribute("src", photo);

        p.textContent = data.data[i]['name'];
        s1.textContent = data.data[i]['mrt'];
        s2.textContent = data.data[i]['category'];
    } 
    return main_
}

function fetchData(url){
    return fetch(url)
        .then(checkStatus)        
        .then(res => res.json())
        // .then(res => console.log(res))
        .catch(error => console.log('error', error))
}
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}