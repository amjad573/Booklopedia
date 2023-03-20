
let save = JSON.parse(localStorage.getItem('savedBooks'))
function createBookContainer(url, name, author, id) {
    let bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", `book-container ${id}`);
    bookContainer.addEventListener("click", add);
  
    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", `${url}`);
    bookCover.setAttribute("class", `book-cover ${id}`);
    bookCover.addEventListener("click", add);
  
    let bookName = document.createElement("p");
    bookName.setAttribute("class", `book-name ${id}`);
    bookName.addEventListener("click", add);
  
    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", `book-author ${id}`);
    bookAuthor.addEventListener("click", add);
  
    let nameText = document.createTextNode(name);
    let authorText = document.createTextNode(author);
    bookName.appendChild(nameText);
    bookAuthor.appendChild(authorText);
  
    bookContainer.appendChild(bookCover);
    bookContainer.appendChild(bookName);
    bookContainer.appendChild(bookAuthor);
  
    document.querySelector(".books-container").appendChild(bookContainer);
  }

for(let i=0; i<save.length; i++){ 
    display(save[i])
}
  function display(id){
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
   .then(response => {return response.json()})
        .then(data => {
            let cover = data.volumeInfo.imageLinks.thumbnail
            let name = data.volumeInfo.title
            let author = data.volumeInfo.authors[0]
            if(name.length > 30){
                name = name.slice(0,30) + "..."     
            }
            if(author.length > 15){
                author = author.slice(0,15) + "..."
            }
            createBookContainer(cover,name,author,id)
        })   
}
// function add(){
//     console.log(1)
// }
function add(event){
    console.log(1)
    let array = []
    array.push(event.target.className.split(" ")[1])
    localStorage.setItem("bookDetails", JSON.stringify(array))
    window.location.href = "..\\Book page\\book.html"
}
        
