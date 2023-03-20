// Get the book's id from localStorage
let bookId = JSON.parse(localStorage.getItem('bookDetails'))[0];

//  set localStorage for saved books
let saveArray = localStorage.getItem('savedBooks') ? JSON.parse(localStorage.getItem('savedBooks')) : [];
localStorage.setItem('savedBooks', JSON.stringify(saveArray));

// change button text for saved books
if (JSON.parse(localStorage.getItem('savedBooks')).includes(`${bookId}`)){
    document.querySelector(".save-button").textContent = "Unsave"
}

//  add/remove id of saved book to/from localStorage
document.querySelector(".save-button").addEventListener('click', saveBook)
function saveBook(){
    if (document.querySelector(".save-button").textContent == "Unsave"){
        deleteBook()        
    }
    else{
        addBook()
    }
}
 
function deleteBook(){
    saveArray.splice(saveArray.indexOf(`${bookId}`),1)
    localStorage.setItem('savedBooks',JSON.stringify(saveArray))
    document.querySelector(".save-button").textContent = "Save"
}

function addBook(){
    saveArray.push(`${bookId}`)
    localStorage.setItem('savedBooks',JSON.stringify(saveArray))
    document.querySelector(".save-button").textContent = "Unsave"
}

// Fetch book's details
fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then(response => {return response.json()})
    .then(data => {
        let cover = data.volumeInfo.imageLinks.thumbnail
        let name = data.volumeInfo.title
        let author = data.volumeInfo.authors
        let pages = data.volumeInfo.pageCount
        let description = data.volumeInfo.description
        displayBook(cover,name,author,pages,description)
    })

// Function to create a container for book details
function displayBook(cover,name,author,pages,description){
    let backgroundImage = document.createElement("img")
    document.querySelector(".book-header").appendChild(backgroundImage)
    backgroundImage.src = `${cover}`
    backgroundImage.setAttribute("class","background-image")

    document.querySelector(".book-cover").src = `${cover}`
    document.querySelector(".book-name").textContent = name
    document.querySelector(".book-author").textContent = author
    document.querySelector(".book-pages").textContent = `pages: ${pages}`
    document.querySelector('.book-description-text').innerHTML += (description)
}