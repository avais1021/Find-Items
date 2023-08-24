//accordian
let addParent = document.querySelector('.addParent');
let addItems = document.querySelector('.addItems');
let containerName = document.querySelector('#containerName');
let yourItems = document.querySelector('#yourItems');
let addBtn = document.querySelector('#addBtn');
let save = document.querySelector('#save');
let htmlitems = document.querySelector('.items');
let box = document.querySelector('.box');
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

// document.addEventListener('change')


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

    renderItemsCard()

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
                if (item.uId == eleCnt.dataset.cninf ){
                    items_render.innerHTML += `<li>${item.uItems}</li>` ;
                }
            })
        })

    })


}

renderItemsCard()

