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

containerName.addEventListener('change', (e) => {
    // if (containerName.value !== '') {
    //     ArrayObj.push({ id : ArrayObj.length , containerN: e.target.value , userItems : []  })
    // }
    // console.log(ArrayObj)
})




addBtn.addEventListener('click', () => {

    var htmlStr = '';


    if (yourItems.value !== '') {
        // ArrayObj[0].userItems.push({ uItems: yourItems.value })


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

    // var htmlstr = '';
    // ArrayObj.forEach((ele) => {
    //     console.log(ele)
    //     ele.userItems.forEach((item) => {
    //         console.log(item.uItems)
    //         htmlstr += `<p>${item.uItems}</p>`;
    //         htmlitems.innerHTML = htmlstr;
    //     })
    // })

    addItems.style.height = (addItems.scrollHeight) + 'px';

    console.log(ArrayObj)
})


save.addEventListener('click', () => {
   

    ArrayObj.forEach((ele, idx) => {
        if (ele.id == save.dataset.sb) {
            ele.containerN.push(containerName.value);

            htmlStr4 = `
              <div class="containersInfo" data-cninf="${save.dataset.sb}">
       
                </div>`;
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

    var htmlStr2 = '';
    var htmlStr3 = '';
    var htmlStr4 = '';
    var htmlStr5 = '';


    ArrayObj.forEach((ele, idx) => {
        if (ele.id == idx) {
    

            htmlStr4 += `
              <div class="containersInfo" data-cninf="${save.dataset.sb}">
       
                </div>`;
        }
    })

    box.innerHTML = htmlStr4;


    let newContainer = document.querySelectorAll('.containersInfo');
    console.log(newContainer, 'newContainer')
    // console.log('newContainerDATASET', newContainer.dataset.cninf )

    ArrayObj.forEach((ele, index) => {

        ele.userItems.forEach((item) => {
            // if (item.uId == save.dataset.sb) {
            //     htmlStr3 += `<li>${item.uItems}</li>`
            //     htmlStr2 = `
            //     <div class="containersInfo" data-cninf="">
            //       <h2>${ele.containerN[0]}</h2>
            //          <ul>
            //             ${htmlStr3}

            //          </ul>
            //      </div>
            //     `
            // }



            newContainer.forEach((ele2)=>{

                if (item.uId == ele2.dataset.cninf) {
                    htmlStr3 += `<li>${item.uItems}</li>`
                    htmlStr2 = `
                    <h2>${ele.containerN[0]}</h2>
                            <ul>
                                ${htmlStr3}
    
                             </ul>
                    `
                    ele2.innerHTML = htmlStr2;
                }


            })

        })



    })




    // htmlStr5 = (newContainer.innerHTML += htmlStr2);


}

renderItemsCard()

