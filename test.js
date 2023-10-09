
let addParent = document.querySelector('.addParent');
let addItems = document.querySelector('.addItems');
let containerName = document.querySelector('#containerName');
let yourItems = document.querySelector('#yourItems');
let addBtn = document.querySelector('#addBtn');
let save = document.querySelector('#save');
let htmlitems = document.querySelector('.items');
let box = document.querySelector('.box');
let search_input = document.querySelector('#search_input');
let searchIcon = document.querySelector('.fa-magnifying-glass');
let search_btn = document.querySelector('#search_btn');
let ArrayObj = JSON.parse(localStorage.getItem('appdata')) || [];

// var counter = 0;

console.log(ArrayObj, 'ArrayObj');

// ArrayObj.forEach((ele) => {


//     function objectAreEqual(obj, item) {
//         return JSON.stringify(obj) === JSON.stringify(item);
//     }

//     const removeDublicateItems = ele.userItems.filter((item, index, self) => {
//         return self.findIndex(obj => objectAreEqual(obj, item)) === index;
//     })

//     console.log(removeDublicateItems, 'removeDublicateItems');

// })

addParent.addEventListener('click', () => {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    console.log(uniqid, 'uniqId')

    addParent.classList.toggle('open');
    if (addParent.classList.contains('open')) {
        addItems.style.height = (addItems.scrollHeight) + 'px';


        ArrayObj.push({ id: uniqid, containerN: [], userItems: [] });
        console.log(ArrayObj)
        localStorage.setItem('appdata', JSON.stringify(ArrayObj))


        ArrayObj.forEach((ele) => {
            save.dataset.sb = ele.id;
        })

    } else {
        addItems.style.height = '0px'
        ArrayObj.forEach((ele, idx) => {

            if (ele.containerN.length == 0) {
                ArrayObj.splice(idx)
            }

        })
        localStorage.setItem('appdata', JSON.stringify(ArrayObj))

        save.style.display = "none";
    }

    if (htmlitems.innerText !== '' && addParent.classList.contains('open')) {
        setTimeout(() => {
            save.style.display = "block";
        }, 1000)
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

        yourItems.value = "";


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
    drawOption()

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

    addParent.classList.remove('open')

})

// ----fun render card 

function renderItemsCard() {
    console.log('one')
    var htmlStr2 = '';
    var htmlStr3 = '';

    ArrayObj.forEach((ele, id2) => {
        if (ele.containerN[0] !== undefined) {
            htmlStr2 += `
         <div class="containersInfo" data-cninf="${ele.id}">
         <i class="fa-solid fa-trash draww" data-drwdel="${id2}"></i>
         <h2>Draw <span>${ele.containerN[0]}</span> <i class="fa-solid fa-pen-to-square edit_Draw" data-drwEdit="${id2}"> </i> </h2>
         <div class="addMore"> <input type="text"> <button class="addmorebtn" data-addmrbtndata="${ele.id}"><i class="fa-solid fa-plus"></i></button></div>
         <ul class="items_render"></ul>
         </div>
        `
        }
    })

    box.innerHTML = htmlStr2;

    let newContainer = document.querySelectorAll('.containersInfo')
    newContainer.forEach((eleCnt) => {
        console.log('eleCnt', eleCnt.dataset.cninf)
        var items_render = eleCnt.querySelector('.items_render')

        ArrayObj.forEach((ele2) => {
            ele2.userItems.forEach((item, idx) => {
                if (item.uId == eleCnt.dataset.cninf) {
                    items_render.innerHTML += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"> </i>   <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i> </li>`;
                }
            })
        })

    })

    const faTrash = document.querySelectorAll('.fa-trash.draww')
    console.log(faTrash)
    faTrash.forEach((button) => {

        button.addEventListener('click', deleteDrwa)

    })

    //--
    const DrwNameEdit = document.querySelectorAll('.edit_Draw')
    console.log(DrwNameEdit)
    DrwNameEdit.forEach((item) => {

        item.addEventListener('click', editDrwNamefun)

    })

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems)
    })

    // ---
    let addmorebtn = document.querySelectorAll('.addmorebtn');

    addmorebtn.forEach((addmrbtn) => {
        addmrbtn.addEventListener('click', funAddMrbtn)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem)
    })



}
// ---------------------------------------------
function funAddMrbtn(e) {

    let addMoreInput = e.target.closest('.addMore').querySelector('input').value;
    let addmorebtn = e.target.closest('.addMore').querySelector('.addmorebtn');
    console.log(addMoreInput)
    console.log(addmorebtn.dataset.addmrbtndata, 'datasete')
    ArrayObj.forEach((ele) => {

        if (ele.id == addmorebtn.dataset.addmrbtndata) {
            console.log('ifffffffff')
            ele.userItems.push({ uItems: addMoreInput, uId: ele.id })
        }

    })
    renderItemsCard()

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}
function funAddMrbtn2(e) {

    let addMoreInput = e.target.closest('.addMore').querySelector('input').value;
    let addmorebtn = e.target.closest('.addMore').querySelector('.addmorebtn');
    console.log(addMoreInput)
    console.log(addmorebtn.dataset.addmrbtndata, 'datasete')
    ArrayObj.forEach((ele) => {

        if (ele.id == addmorebtn.dataset.addmrbtndata) {
            console.log('ifffffffff')
            ele.userItems.push({ uItems: addMoreInput, uId: ele.id })
        }

    })
    drawOption()

    const draw_nameP = document.querySelectorAll('.draw_nameP');
    // draw_nameP[0].click();
    draw_nameP.forEach((i1) => {
        if (i1.dataset.drmenu == addmorebtn.dataset.addmrbtndata) {
            i1.click();
        }
    })

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}
function funAddMrbtn3(e) {

    let addMoreInput = e.target.closest('.addMore').querySelector('input').value;
    let addmorebtn = e.target.closest('.addMore').querySelector('.addmorebtn');
    let allItems = e.target.closest('.containersInfo').querySelector('#allItems');
    let allItem_render = e.target.closest('.containersInfo').querySelector('.allItem_render');
    console.log(addMoreInput)
    console.log(addmorebtn.dataset.addmrbtndata, 'datasete')

    let htmlStrfun3allItem = "";
    allItem_render.innerHTML = "";

    ArrayObj.forEach((ele) => {

        if (ele.id == addmorebtn.dataset.addmrbtndata) {
            console.log('ifffffffff')
            ele.userItems.push({ uItems: addMoreInput, uId: ele.id })


            ele.userItems.forEach((item, idx) => {
                // allItem_render.innerHTML +=`<li>${item.uItems}</li>`
                htmlStrfun3allItem += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i> <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i> </li>`
            })

        }

    })

    allItem_render.innerHTML = htmlStrfun3allItem;

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems3)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem2)
    })


    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

    // allItems.click();
    allItems.classList.add('open')



}

function editItem(e) {

    commonEditCode(e);

    renderItemsCard();

}
function editItem2(e) {

    commonEditCode(e);

    renderingdeleteDrwItems3Li(e);

}
function editItem3(e) {

    commonEditCode(e);

    renderingEditDrwItems3LiSearch(e)

}
function editItem4(e) {
    let containersInfo = e.target.closest('.containersInfo').getAttribute('data-cninf');
    commonEditCode(e);

    drawOption();

    const draw_nameP = document.querySelectorAll('.draw_nameP');
    // draw_nameP[0].click();
    draw_nameP.forEach((i1) => {
        if (i1.dataset.drmenu == containersInfo) {
            i1.click();
        }
    })

}

function commonEditCode(e) {

    const dataEditIcon = e.target.getAttribute('data-drwItemEdit');
    const containerInfodata = e.target.closest('.containersInfo').getAttribute('data-cninf');
    console.log(dataEditIcon, 'dataEditIcon')
    console.log(containerInfodata, 'containerInfodata')

    const updateItemeName = prompt('edit your Item')
    console.log(updateItemeName)

    if (containerInfodata != null) {
        ArrayObj.forEach((ele) => {
            ele.userItems.forEach((item, idx) => {

                if (updateItemeName !== null) {
                    if (ele.id == containerInfodata && dataEditIcon == idx) {
                        item.uItems = updateItemeName;
                    }
                }
            })
        })
    }

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}

// --------------------------------------------------

//Search Input

// search_input.addEventListener('keypress' , (e)=>{
//     console.log(e)
//     // if(e.keyCode == 32){
//         return (
//             e.charCode != 32
//         )
//     // }
// })


searchIcon.addEventListener('click', (e) => {

    // let timeOut = setTimeout(() => {
    Search()
    // }, 1000);

    // return () => clearTimeout(timeOut)



})

function Search() {

    let serach_drwa = '';
    let searchDrLi = ''

    if (search_input.value.trim() === "") {
        serach_drwa = '';
    } else {

        ArrayObj.forEach((ele, id2) => {


            function objectAreEqual(obj, item) {
                return JSON.stringify(obj) === JSON.stringify(item);
            }

            const removeDublicateItems = ele.userItems.filter((item, index, self) => {
                return self.findIndex(obj => objectAreEqual(obj, item)) === index;
            })

            console.log(removeDublicateItems, 'removeDublicateItems');

            removeDublicateItems.forEach((item, idx) => {

                var eTargetVal = search_input.value.toLowerCase();
                // var eTargetVal = e.target.value.toLowerCase()
                var userItemsItem = item.uItems.toLowerCase()
                var containerN0 = ele.containerN[0].toLowerCase()
                if ((userItemsItem.indexOf(eTargetVal) > -1 || containerN0.indexOf(eTargetVal) > -1) && search_input.value !== '') {

                    // console.log('draw name', ele.containerN[0])
                    // console.log('item.uItems', item.uItems)



                    searchDrLi = ` <li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i>  <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i> </li>`

                    serach_drwa += `
                   <div class="containersInfo" data-cninf="${ele.id}">
                    <i class="fa-solid fa-trash draww" data-drwdel="${id2}"></i>
                    <h2>Draw <span>${ele.containerN[0]}</span> <i class="fa-solid fa-pen-to-square edit_Draw" data-drwEdit="${id2}"> </i> </h2>
                     <ul class="items_render">
                       ${searchDrLi}
                    </ul>
                    <div class="addMore"> <input type="text"> <button class="addmorebtn" data-addmrbtndata="${ele.id}"><i class="fa-solid fa-plus"></i></button></div>
                      <p id="allItems" data-allitem="${ele.id}">All items <i class="fa-solid fa-angle-down"></i></p>
                      <ul class="allItem_render" data-allrenderr="${ele.id}">
            
                  </ul>
                           </div>
                       `
                    // if(ele.id ==  )

                }

            })
        })

    }

    // console.log('input val', e.target.value)

    box.innerHTML = serach_drwa;


    let allItems = document.querySelectorAll('#allItems');
    let allItem_render = document.querySelectorAll('.allItem_render');


    if (allItems !== null) {

        allItems.forEach((itembtn) => {
            itembtn.addEventListener('click', (e) => {

                let allItem_renderSecond = e.target.closest('.containersInfo').querySelector('.allItem_render');
                allItem_renderSecond.innerHTML = "";
                // let htmlStr_allItem = "";
                itembtn.classList.toggle('open');

                // console.log(itembtn.dataset.allitem, 'itemBtndata')
                ArrayObj.forEach((ele) => {
                    ele.userItems.forEach((item, idx) => {

                        allItem_render.forEach((eleallrender) => {



                            if (ele.id == itembtn.dataset.allitem && ele.id == eleallrender.dataset.allrenderr) {

                                if (itembtn.classList.contains('open')) {
                                    eleallrender.innerHTML += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i>  <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i> </li>`
                                } else {
                                    eleallrender.innerHTML = ""
                                }
                            }

                        })

                    })
                })

                // --
                const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
                drawItemTrash.forEach((itemTrashBtn) => {
                    itemTrashBtn.addEventListener('click', deleteDrwItems3)
                })

                // ---
                let edit_item = document.querySelectorAll('.edit_item');

                edit_item.forEach((item) => {
                    item.addEventListener('click', editItem2)
                })

            })
        })



    }

    const faTrash = document.querySelectorAll('.fa-trash.draww')
    console.log(faTrash)
    faTrash.forEach((button) => {

        button.addEventListener('click', deleteDrwa)

    })

    //--
    const DrwNameEdit = document.querySelectorAll('.edit_Draw')
    console.log(DrwNameEdit)
    DrwNameEdit.forEach((item) => {

        item.addEventListener('click', editDrwNamefun)

    })

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems2)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem3)
    })

    // ---
    let addmorebtn = document.querySelectorAll('.addmorebtn');

    addmorebtn.forEach((addmrbtn) => {
        addmrbtn.addEventListener('click', funAddMrbtn3)
    })

}




// renderItemsCard()


// Your draw

const yourDraw__row = document.querySelector('.yourDraw__row');
const yourDraw__row1 = document.querySelector('.yourDraw__row1');

yourDraw__row.addEventListener('click', () => {

    yourDraw__row.classList.toggle('open');

    if (yourDraw__row.classList.contains('open')) {
        yourDraw__row1.style.height = (yourDraw__row1.scrollHeight) + 'px';
    } else {
        yourDraw__row1.style.height = 0;
    }
})

// -----

function drawOption() {

    // let htmlStr_AllShow = ''

    yourDrawOptionItems();

    if (yourDraw__row.classList.contains('open')) {
        yourDraw__row1.style.height = (yourDraw__row1.scrollHeight) + 'px';
    }

    const draw_nameP = document.querySelectorAll('.draw_nameP');
    draw_nameP.forEach((itemDr) => {
        itemDr.addEventListener('click', (e) => {

            drawOptionOnRendering(itemDr);

        })
    })

    let showAllDraw = document.querySelector('.showAllDraw');
    showAllDraw.addEventListener('click', () => {
        renderItemsCard();
    })


}

function yourDrawOptionItems() {
    let htmlStr_drawerName = "";
    ArrayObj.forEach((ele) => {
        if (ele.containerN[0] !== undefined) {
            htmlStr_drawerName += `   <p class="draw_nameP" data-drmenu="${ele.id}">Draw ${ele.containerN[0]}</p>`
        }
    });

    yourDraw__row1.innerHTML = `<p class="showAllDraw">show All Draws</p> ${htmlStr_drawerName}`;
}

function drawOptionOnRendering(itemDr) {
    console.log(itemDr.dataset.drmenu)

    let htmlStr_drawoption = '';
    let htmlStr_li = ''

    ArrayObj.forEach((ele, id2) => {
        ele.userItems.forEach((item, idx) => {
            if (ele.id == itemDr.dataset.drmenu) {

                htmlStr_li += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"> </i> <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i> </li>`

                htmlStr_drawoption = `<div class="containersInfo" data-cninf="${ele.id}">
                <i class="fa-solid fa-trash draww" data-drwdel="${id2}"></i>
                <h2>Draw <span>${ele.containerN[0]}</span> <i class="fa-solid fa-pen-to-square edit_Draw" data-drwEdit="${id2}"> </i> </h2>
                <div class="addMore"> <input type="text"> <button class="addmorebtn" data-addmrbtndata="${ele.id}"><i class="fa-solid fa-plus"></i></button></div>
                <ul class="items_render">
                ${htmlStr_li}
                </ul>
                </div>`

            }
        })
    })

    ArrayObj.forEach((ele, id2) => {

        if (ele.id == itemDr.dataset.drmenu && ele.userItems.length == 0) {
            htmlStr_drawoption = `<div class="containersInfo" data-cninf="${ele.id}">
                <i class="fa-solid fa-trash draww" data-drwdel="${id2}"></i>
                <h2>Draw <span>${ele.containerN[0]}</span> <i class="fa-solid fa-pen-to-square edit_Draw" data-drwEdit="${id2}"> </i> </h2>
                <div class="addMore"> <input type="text"> <button class="addmorebtn" data-addmrbtndata="${ele.id}"><i class="fa-solid fa-plus"></i></button></div>
                <ul class="items_render">
               
                </ul>
                </div>`
        }

    })

    box.innerHTML = htmlStr_drawoption;

    const faTrash = document.querySelectorAll('.fa-trash.draww')
    console.log(faTrash)
    faTrash.forEach((button) => {

        button.addEventListener('click', deleteDrwa)

    })

    //--
    const DrwNameEdit = document.querySelectorAll('.edit_Draw')
    console.log(DrwNameEdit)
    DrwNameEdit.forEach((item) => {

        item.addEventListener('click', editDrwNamefun)

    })

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem4)
    })

    // ---
    let addmorebtn = document.querySelectorAll('.addmorebtn');

    addmorebtn.forEach((addmrbtn) => {
        // addmrbtn.addEventListener('click', funAddMrbtn)
        addmrbtn.addEventListener('click', funAddMrbtn2)
    })

}

function deleteDrwa(e) {
    const deleteIconDataSet = e.target.getAttribute('data-drwdel')
    // alert(deleteIconDataSet)

    ArrayObj.splice(deleteIconDataSet, 1)
    console.log(ArrayObj, 'delArr')
    yourDraw__row1.style.height = 'auto';
    renderItemsCard()
    drawOption()
    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}

function editDrwNamefun(e) {

    // const dataEditIcon = e.target.getAttribute('data-drwItemEdit');
    const containerInfodata = e.target.closest('.containersInfo').getAttribute('data-cninf');
    const containerInfospan = e.target.closest('.containersInfo').querySelector('h2 span');
    // console.log(dataEditIcon, 'dataEditIcon')
    console.log(containerInfodata, 'containerInfodata')

    const updateItemeName = prompt('edit your Draw name')
    console.log(updateItemeName)

    ArrayObj.forEach((ele) => {


        if (updateItemeName !== null) {
            if (ele.id == containerInfodata) {
                ele.containerN[0] = updateItemeName;
            }
        }

    })

    containerInfospan.innerHTML = updateItemeName;

    yourDrawOptionItems();


    const draw_nameP = document.querySelectorAll('.draw_nameP');
    draw_nameP.forEach((itemDr) => {
        itemDr.addEventListener('click', (e) => {

            drawOptionOnRendering(itemDr);

        })
    })

    localStorage.setItem('appdata', JSON.stringify(ArrayObj))
}

function deleteDrwItems(e) {
    let deleteItemSataSet = e.target.getAttribute('data-drwitemdel');
    let carContainersInfo = e.target.closest('.containersInfo');
    console.log(deleteItemSataSet, 'datasetouioui')
    let items_render2 = e.target.closest('.containersInfo').querySelector('.items_render')
    console.log(items_render2, 'render222')
    let htmlStrItem_render2 = "";


    ArrayObj.forEach((ele) => {

        ele.userItems.forEach((item, idx) => {

            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id && deleteItemSataSet == idx) {
                ele.userItems.splice(deleteItemSataSet, 1);

            }

        })
    })

    // ----
    ArrayObj.forEach((ele) => {
        ele.userItems.forEach((item, idx) => {
            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id) {
                htmlStrItem_render2 += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i>  <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i>`
            }
        })
    })

    items_render2.innerHTML = htmlStrItem_render2;

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem4)
    })

    // drawOption()
    // renderItemsCard()
    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}
// ----------22--
function deleteDrwItems2(e) {
    let deleteItemSataSet = e.target.getAttribute('data-drwitemdel');
    let carContainersInfo = e.target.closest('.containersInfo');
    console.log(deleteItemSataSet, 'datasetouioui')
    // let items_render2 = e.target.closest('.items_render');
    // console.log(items_render2,'render222')
    // let htmlStrItem_render2 = "";


    ArrayObj.forEach((ele) => {

        ele.userItems.forEach((item, idx) => {

            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id && deleteItemSataSet == idx) {
                ele.userItems.splice(deleteItemSataSet, 1);

            }

        })
    })



    // drawOption()
    // renderItemsCard()
    Search();
    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}

function deleteDrwItems3(e) {
    let deleteItemSataSet = e.target.getAttribute('data-drwitemdel');
    let carContainersInfo = e.target.closest('.containersInfo');
    console.log(deleteItemSataSet, 'datasetouioui')




    ArrayObj.forEach((ele) => {

        ele.userItems.forEach((item, idx) => {

            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id && deleteItemSataSet == idx) {
                ele.userItems.splice(deleteItemSataSet, 1);

            }

        })
    })

    // ----


    renderingdeleteDrwItems3Li(e);

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems3)
    })

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem2)
    })


    localStorage.setItem('appdata', JSON.stringify(ArrayObj))

}

function renderingdeleteDrwItems3Li(e) {
    let items_render1 = e.target.closest('.containersInfo').querySelector('.items_render');
    let items_render2 = e.target.closest('.containersInfo').querySelector('.allItem_render');
    let carContainersInfo = e.target.closest('.containersInfo');
    console.log(items_render2, 'renderAllAllAll')

    let htmlStrItem_render2 = "";

    ArrayObj.forEach((ele) => {
        ele.userItems.forEach((item, idx) => {
            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id) {
                htmlStrItem_render2 += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i> <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i>`
            }
        })
    })

    items_render2.innerHTML = htmlStrItem_render2;

    items_render1.innerHTML = "";
}
function renderingEditDrwItems3LiSearch(e) {
    let items_render1 = e.target.closest('.containersInfo').querySelector('.items_render');
    let items_render2 = e.target.closest('.containersInfo').querySelector('.allItem_render');
    let carContainersInfo = e.target.closest('.containersInfo');
    console.log(items_render2, 'renderAllAllAll')
    const dataEditIcon = e.target.getAttribute('data-drwItemEdit');
    const containerInfodata = e.target.closest('.containersInfo').getAttribute('data-cninf');

    let htmlStrItem_render2 = "";
    let htmlStrSearchTop = "";

    ArrayObj.forEach((ele) => {
        ele.userItems.forEach((item, idx) => {
            // if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id) {
            if (ele.id == containerInfodata && dataEditIcon == idx) {
                htmlStrSearchTop += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i> <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i>`
            }
        })
    })

    ArrayObj.forEach((ele) => {
        ele.userItems.forEach((item, idx) => {
            if (ele.id == item.uId && carContainersInfo.dataset.cninf == ele.id) {
                htmlStrItem_render2 += `<li>${item.uItems} <i class="fa-solid fa-pen-to-square edit_item" data-drwItemEdit="${idx}"></i> <i class="fa-solid fa-trash drwItem" data-drwItemdel="${idx}"></i>`
            }
        })
    })

    items_render1.innerHTML = htmlStrSearchTop;
    items_render2.innerHTML = htmlStrItem_render2;

    // ---
    let edit_item = document.querySelectorAll('.edit_item');

    edit_item.forEach((item) => {
        item.addEventListener('click', editItem3)
    })

    // --
    const drawItemTrash = document.querySelectorAll('.fa-trash.drwItem');
    drawItemTrash.forEach((itemTrashBtn) => {
        itemTrashBtn.addEventListener('click', deleteDrwItems2)
    })

}

drawOption();

ArrayObj.forEach((ele, idx) => {

    if (ele.containerN.length == 0) {
        ArrayObj.splice(idx)
    }

})
localStorage.setItem('appdata', JSON.stringify(ArrayObj))

const newArr = [
    { id: 0, name: 'a' },
    { id: 1, name: 'b' },
    { id: 2, name: 'c' },
    { id: 3, name: 'd' },
    { id: 4, name: 'e' },
]