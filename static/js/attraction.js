//var ec2 = 'http://54.249.216.135:3000/'
//var local = 'http://0.0.0.0:3000/api/attraction/3'  
//var apiurl = local.split('attraction', 'api/attraction') 

// request(fetch): http://0.0.0.0:3000/api/attraction/1
// show: http://0.0.0.0:3000/attraction/1

const attraction = document.querySelector('.attraction');
const sec_purchase = document.querySelector('.purchase');

getPage()
function getPage(){ //page=nextPage
    //let url= `${local}`; //假設local = 'http://0.0.0.0:3000/api/attraction/1'
    //剛剛a tag點進去是'http://0.0.0.0:3000/attraction/1'的話
    //但需要抓取的是: local = 'http://0.0.0.0:3000/api/attraction/1' 
    //這個id 1 
    //let url = local.split('attraction', 'api/attraction') 
    //如果嘗試改網址就會報錯 data就找不到了
    let url = "/api/" + location.pathname;
    console.log(`getPage: ${url}`)
    fetchData(url)
        // .then(function(data){  //attraction.js:127 Uncaught (in promise) TypeError: Cannot read property 'data' of undefined
        //     console.log(data);
        // })
        // .then(res => {         //attraction.js:127 Uncaught (in promise) TypeError: Cannot read property 'data' of undefined
        //     console.log(res)
        // })
        .then(function (data) {
            console.log(`getPage, function(data): ${JSON.stringify(data.data.image)}`)
            createCarouselSection(data)
            createPurchaseSection(data)
            createIntroSection(data)
            //carousel(data)
        })
        // .then(res => {         //undefined
        //     console.log(res)
        // })
}
//輪播區

// function carousel(data){
//     //document.getElementById('carousel-button-next').addEventListener('click', moveToNextSlide);
//     // createCarouselSection(data)
//     // console.log(carousel_btn_prev)  //為何讀得到但無法動作
//     carousel_btn_prev.addEventListener('click', function(){
//         console.log('carousel_btn_prev')
//     })
// }
/*=====================
        view
======================*/
//輪播區
function createCarouselSection(data){
    photos(data)
    //console.log(`photos length : ${photos(data).length}`)
    //console.log(`photos array : ${photos(data)}`)
    //console.log(`photos array 0 : ${photos(data)[0]}`)

    let sec_carousel = document.createElement("section");
    sec_carousel.classList.add("carousel");
    attraction.appendChild(sec_carousel);

    for(let i = 0; i<photos(data).length; i++){
        let carousel_img = document.createElement("img");
        let carousel_div = document.createElement("div");
        sec_carousel.appendChild(carousel_div)[i];
        carousel_div.appendChild(carousel_img)[i];
        carousel_div.setAttribute("class", "carousel-item");
        carousel_img.setAttribute("src", photos(data)[i]);
        carousel_img.setAttribute("alt", data.data.name);
    }
    //console.log(sec_carousel.firstChild)
    sec_carousel.firstChild.classList.add("carousel-item-visible")

    let carousel_div_btn = document.createElement("div");
    let carousel_btn_prev = document.createElement("button");
    let carousel_btn_next = document.createElement("button");
    sec_carousel.appendChild(carousel_div_btn);
    carousel_div_btn.appendChild(carousel_btn_prev);
    carousel_div_btn.appendChild(carousel_btn_next);
    carousel_div_btn.setAttribute("class", "carousel-actions");
    carousel_btn_prev.setAttribute("id", "carousel_btn_prev");
    carousel_btn_next.setAttribute("id", "carousel_btn_next");
    carousel_btn_prev.setAttribute("aria-label", "Previous Slide");
    carousel_btn_next.setAttribute("aria-label", "Next Slide");
    carousel_btn_prev.textContent = "<"
    carousel_btn_next.textContent = ">"

    /*================
      carousel
    =================*/
    const slides = document.getElementsByClassName('carousel-item');
    let slidePosition = 0;
    const totalSlides = slides.length;
    //console.log(totalSlides)
    carousel_btn_next.addEventListener('click', moveToNextSlide);
    carousel_btn_prev.addEventListener('click', moveToPrevSlide);
    function hideAllSlides() {
        for (let slide of slides) {
            slide.classList.remove('carousel-item-visible');
            slide.classList.add('carousel-item-hidden');
        }
    }
    
    function moveToNextSlide() {
        hideAllSlides();
        
        if (slidePosition === totalSlides - 1) {
            slidePosition = 0;
        } else {
            slidePosition++;
        }
        
        slides[slidePosition].classList.add("carousel-item-visible");
    }
    
    function moveToPrevSlide() {
        hideAllSlides();
    
        if (slidePosition === 0) {
            slidePosition = totalSlides - 1;
        } else {
            slidePosition--;
        }
        
        slides[slidePosition].classList.add("carousel-item-visible");   
    }
    return sec_carousel
}

//當後端資料沒處理好時前端受苦
function photos(data){
    //console.log(`photos(data): ${JSON.stringify(data)}`) //[object Object]
    let photo = []
    let photoString = data.data.image;
    let photoSplit = photoString.split(',');
    
    for(let i = 0; i<photoSplit.length; i++){
        photo.push(photoSplit[i].replace("['", '').replace("'", '').replace("]", '').replace("'", ''));
    }  
    return photo
}

//購買區   
function createPurchaseSection(data){
    let showPrice = document.querySelector(".showPrice")
    let purchase_div = document.createElement("div");
    let purchase_h3 = document.createElement("h3");
    let purchase_p = document.createElement("p");
    let price = document.createElement("span");
    sec_purchase.appendChild(purchase_div);
    purchase_div.appendChild(purchase_h3);
    purchase_div.appendChild(purchase_p);
    showPrice.appendChild(price);
    purchase_div.classList.add("purchase_title");
    purchase_h3.textContent = data.data.name;  
    purchase_p.textContent = `${data.data.category} at ${data.data.mrt}`;
     /*================
         toggle
    =================*/
    let am = document.getElementById("am")
    let pm = document.getElementById("pm")
    if(am.checked){
        price.textContent = "新台幣2000元" 
    }else if (pm.ckecked){
        price.textContent = "新台幣2500元"
    }
    am.addEventListener('change', ()=>{
        price.textContent = "新台幣2000元"
        pm.checked = false;
    })
    pm.addEventListener('change', ()=>{
        price.textContent = "新台幣2500元"
        am.checked = false;
    })  
    return sec_purchase
}

//介紹區
function createIntroSection(data){
    let sec_intro = document.createElement("section");
    sec_intro.classList.add("intro");
    let intro_p = document.createElement("p");
    let intro_h4_address = document.createElement("h4");
    let intro_p_address = document.createElement("p");
    let intro_h4_traffic = document.createElement("h4");
    let intro_p_traffic = document.createElement("p");
    attraction.appendChild(sec_intro);
    sec_intro.appendChild(intro_p);
    sec_intro.appendChild(intro_h4_address);
    sec_intro.appendChild(intro_p_address);
    sec_intro.appendChild(intro_h4_traffic);
    sec_intro.appendChild(intro_p_traffic);
    intro_p.textContent = data.data.description
    intro_h4_address.textContent = '景點地址：'
    intro_p_address.textContent = data.data.address
    intro_h4_traffic.textContent = '交通方式：'
    intro_p_traffic.textContent = data.data.transport
    return sec_intro
}

function fetchData(url){
    return fetch(url)
        //.then(res => console.log(`get url : ${res.url}`)) 
        .then(checkStatus)        
        .then(res => res.json())
        //.then(res => console.log(res))   
        .catch(error => console.log('error', error))
}
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}