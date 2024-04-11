
// //CRUD -> create read update delete
let elList = document.querySelector('.product__list')
let elUpTitle = document.querySelector('.up__title')
let elUpPrice = document.querySelector('.up__price')
let elUpImg = document.querySelector('.up__img')
fetch('https://6512b81cb8c6ce52b39613bf.mockapi.io/books')
.then((res)=> res.json())
.then((data)=> mapper(data))


function mapper(data){
    window.localStorage.setItem('data', JSON.stringify(data))
    data.forEach((item) => {
        let newLi = document.createElement('li')
        newLi.innerHTML = `
        <div class="card mt-2" style="width: 18rem;">
        <img src=${item.img} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">${item.price}</a>
          <button class="btn btn-danger" onclick="delBook(${item.id})">del</button>
          <button 
          class="btn btn-success" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          onclick="setId(${item.id})"
          ><i class="bi bi-pen"></i></button>
        </div>
      </div>
        `
        elList.appendChild(newLi)
    });
}

function setBook(e){
    e.preventDefault()

    let book = {
        title: e.target.title.value,
        price: e.target.price.value,
        img: e.target.img.value,
    }
    fetch('https://6512b81cb8c6ce52b39613bf.mockapi.io/books', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(book)
    })
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .then(()=> location.reload())
}


function delBook(id){
    fetch(`https://6512b81cb8c6ce52b39613bf.mockapi.io/books/${id}`, {
        method:'DELETE',
        headers:{'content-type':'application/json'},
    })
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .then(()=> location.reload())
}


function setId(id){
    let data = JSON.parse(window.localStorage.getItem('data')).find((item)=> item.id == id)
    elUpTitle.value = data.title
    elUpPrice.value = data.price
    elUpImg.value = data.img
    window.localStorage.setItem('id', id)
}

function upBook(e){
    e.preventDefault()
    let id = window.localStorage.getItem('id')
    let book = {
        title: e.target.title.value,
        price: e.target.price.value,
        img: e.target.img.value,
    }
    fetch(`https://6512b81cb8c6ce52b39613bf.mockapi.io/books/${id}`,{
        method:'PUT',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(book)
    })
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .then(()=> location.reload())
}

