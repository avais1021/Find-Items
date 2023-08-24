//accordian
let addParent = document.querySelector('.addParent');
let addItems = document.querySelector('.addItems');
let containerName = document.querySelector('#containerName');
let yourItems = document.querySelector('#yourItems');
let addBtn = document.querySelector('#addBtn');
let save = document.querySelector('#save');
let ArrayObj = []
let htmlitems = document.querySelector('.items');


addParent.addEventListener('click', () => {
    addParent.classList.toggle('open');
    if (addParent.classList.contains('open')) {
        addItems.style.height = (addItems.scrollHeight) + 'px';
    } else {
        addItems.style.height = '0px'
    }
})

// document.addEventListener('change')

containerName.addEventListener('change', (e) => {
    console.log(e.target.value)
    // if (containerName.value !== '') {
    //     ArrayObj.push({ id : ArrayObj.length , containerN: e.target.value , userItems : []  })
    // }
    console.log(ArrayObj)
})

addBtn.addEventListener('click', () => {

    if (containerName.value !== '') {
        ArrayObj.push({ id: ArrayObj.length, containerN: containerName.value, userItems: [] })
    }


    if (yourItems.value !== '') {
        ArrayObj[0].userItems.push({ uItems: yourItems.value })


        // ArrayObj.forEach((ele, idx  )=>{
        //         if(ele.id == )
        // })


        setTimeout(() => {
            save.style.display = "block";
        }, 1000)
    }

    var htmlstr = '';
    ArrayObj.forEach((ele) => {
        console.log(ele)
        ele.userItems.forEach((item) => {
            console.log(item.uItems)
            htmlstr += `<p>${item.uItems}</p>`;
            htmlitems.innerHTML = htmlstr;
        })
    })

    addItems.style.height = (addItems.scrollHeight) + 'px';

    console.log(ArrayObj)
})

var counter = 1;
save.addEventListener('click', () => {
    containerName.value = '';
    htmlitems.innerHTML = '';
    save.style.display = 'none'
    addItems.style.height = '66px';
    console.log(counter,'counter')
    save.dataset.sb = counter++;
})



