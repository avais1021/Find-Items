//accordian
let addParent = document.querySelector('.addParent');
let addItems = document.querySelector('.addItems');
let containerName = document.querySelector('#containerName');
let yourItems = document.querySelector('#yourItems');
let addBtn = document.querySelector('#addBtn');
let save = document.querySelector('#save');
let htmlitems = document.querySelector('.items');
let box = document.querySelector('.box');
let search_input = document.querySelector('#search_input');
let search_btn = document.querySelector('#search_btn');
let ArrayObj = JSON.parse(localStorage.getItem('appdata')) || [];

// var counter = 0;
addParent.addEventListener('click', () => {
    addParent.classList.toggle('open');
    if (addParent.classList.contains('open')) {
        addItems.style.height = (addItems.scrollHeight) + 'px';


        ArrayObj.push({ id: ArrayObj.length, containerN: [], userItems: [] });
        console.log(ArrayObj)
        localStorage.setItem('appdata', JSON.stringify(ArrayObj))

        // console.log(counter, 'counter')
        save.dataset.sb = ArrayObj.length - 1;

    } else {
        addItems.style.height = '0px'
    }


})

// document.addEventListener('keyup')


addBtn.addEventListener('click', () => {

    var htmlStr = '';


    if (yourItems.value !== '') {

        ArrayObj.forEach((ele, idx) => {
            if (ele.id == save.dataset.sb) {
                // ele.containerN.push(containerName.value);
                ele.userItems.push({ uItems: yourItems.value, uId: ele.id })

                ArrayObj.forEach((ele, idx) => {
                    console.log(ele)
                    ele.userItems.forEach((item) => {
                        if (ele.id == item.uId && save.dataset.sb == item.uId) {
                            htmlStr += `<p>${item.uItems}</p>`;
                            htmlitems.innerHTML = htmlStr;
                        }
                    })
                })



            }
        })

        localStorage.setItem('appdata', JSON.stringify(ArrayObj))


        setTimeout(() => {
            save.style.display = "block";
        }, 1000)
    }


    addItems.style.height = (addItems.scrollHeight) + 'px';

    console.log(ArrayObj)
})


save.addEventListener('click', () => {

    ArrayObj.forEach((ele, idx) => {
        if (ele.id == save.dataset.sb) {
            ele.containerN.push(containerName.value);
        }
    })


    containerName.value = '';
    yourItems.value = '';
    htmlitems.innerHTML = '';
    save.style.display = 'none'
    addItems.style.height = '0';

    // renderItemsCard()

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))


})

function renderItemsCard() {
    console.log('one')
    var htmlStr2 = '';
    var htmlStr3 = '';

    ArrayObj.forEach((ele, id2) => {
        htmlStr2 += `
        <div class="containersInfo" data-cninf="${id2}">
        <h2>Draw ${ele.containerN[0]}</h2>
         <ul class="items_render"></ul>
         </div>
        `
    })

    box.innerHTML = htmlStr2;

    let newContainer = document.querySelectorAll('.containersInfo')
    newContainer.forEach((eleCnt) => {
        console.log('eleCnt', eleCnt.dataset.cninf)
        var items_render = eleCnt.querySelector('.items_render')

        ArrayObj.forEach((ele2) => {
            ele2.userItems.forEach((item) => {
                if (item.uId == eleCnt.dataset.cninf) {
                    items_render.innerHTML += `<li>${item.uItems}</li>`;
                }
            })
        })

    })


}

//Search Input
search_input.addEventListener('keyup', (e) => {
    let serach_drwa = '';

    console.log('input val', e.target.value)
    ArrayObj.forEach((ele, id2) => {
        ele.userItems.forEach((item) => {
            if (e.target.value.includes(item.uItems)) {

                console.log('draw name', ele.containerN[0])
                console.log('item.uItems', item.uItems)

                serach_drwa = `
            <div class="containersInfo" data-cninf="${id2}"  >
              <h2>Draw ${ele.containerN[0]}</h2>
              <ul class="items_render">
                <li>${item.uItems}</li>
              </ul>
              <p id="allItems">All items <i class="fa-solid fa-angle-down"></i></p>
              <ul class="allItem_render">
            
              </ul>
           </div>
            `

            
            }

        })
    })

    box.innerHTML = serach_drwa;


    let containersInfo = document.querySelector('.containersInfo');
    let allItem_render = document.querySelector('.allItem_render');
    let allItems = document.querySelector('#allItems');
    allItems.addEventListener('click', () => {
        htmlStr_allItem = '';

        ArrayObj.forEach((ele, id2) => {
            ele.userItems.forEach((item) => {
                if (ele.id == containersInfo.dataset.cninf) {

                    htmlStr_allItem += `<li>${item.uItems}</li>` 

                   


                }

            })
        })

        allItem_render.innerHTML  = htmlStr_allItem;

    })  



})

// renderItemsCard()


// Your draw

const yourDraw__row = document.querySelector('.yourDraw__row');
const yourDraw__row1 = document.querySelector('.yourDraw__row1');

yourDraw__row.addEventListener('click' , ()=>{

    yourDraw__row.classList.toggle('open');

    if(yourDraw__row.classList.contains('open')){
        yourDraw__row1.style.height = (yourDraw__row1.scrollHeight) + 'px';
    }else{
        yourDraw__row1.style.height = 0;
    }
})

let htmlStr_drawerName = "";
ArrayObj.forEach((ele) =>{
    if(ele.containerN[0] !== undefined){
    htmlStr_drawerName += ` <p class="draw_nameP" data-drmenu="${ele.id}">Draw ${ele.containerN[0]}</p>`
    }
});

yourDraw__row1.innerHTML = htmlStr_drawerName;

// --

const draw_nameP = document.querySelectorAll('.draw_nameP');
draw_nameP.forEach((itemDr)=>{
    itemDr.addEventListener('click' , ()=>{
        console.log(itemDr.dataset.drmenu)

    
      let  htmlStr_drawoption = '';
      let   htmlStr_li =''

        ArrayObj.forEach((ele, id2) => {
            ele.userItems.forEach((item) => {
                if (ele.id == itemDr.dataset.drmenu) {

                    htmlStr_li += `<li>${item.uItems}</li>` 

                    htmlStr_drawoption = `<div class="containersInfo" data-cninf="${id2}">
                    <h2>Draw ${ele.containerN[0]}</h2>
                     <ul class="items_render">
                        ${htmlStr_li}
                     </ul>
                     </div>` 

                   


                }

            })
        })

        box.innerHTML  = htmlStr_drawoption;




    })
})
