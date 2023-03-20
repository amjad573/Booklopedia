let details = JSON.parse(localStorage.getItem('catagoryDetails'))[0]
let categoryName = document.createElement("h3");
categoryName.setAttribute("class", "header-text");
let text = document.createTextNode(`${details} Category`);

categoryName.appendChild(text);
document.querySelector(".category-hearder").appendChild(categoryName);

function creatBookContainer(url, name, author, bookId) {
  let bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", `book-contanier ${bookId}`);
  bookContainer.addEventListener("click", addBook);

  let bookCover = document.createElement("img");
  bookCover.setAttribute("src", `${url}`);
  bookCover.setAttribute("class", `book-cover ${bookId}`);
  bookCover.addEventListener("click", addBook);

  let bookName = document.createElement("p");
  bookName.setAttribute("class", `book-name ${bookId}`);
  bookName.addEventListener("click", addBook);

  let bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("class", `book-author ${bookId}`);
  bookAuthor.addEventListener("click", addBook);

  let nameText = document.createTextNode(name);
  let authorText = document.createTextNode(author);
  bookName.appendChild(nameText);
  bookAuthor.appendChild(authorText);

  bookContainer.appendChild(bookCover);
  bookContainer.appendChild(bookName);
  bookContainer.appendChild(bookAuthor);

  document.querySelector(".category-container").appendChild(bookContainer);
}
/**The fetch function */
fetch(
  `https://www.googleapis.com/books/v1/volumes?q=subject:${details}&maxResults=40`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.items.forEach((element) => {
      if (
        element.volumeInfo.hasOwnProperty("imageLinks") &&
        element.volumeInfo.hasOwnProperty("authors") &&
        element.volumeInfo.hasOwnProperty("description")
      ) {
        let cover = element.volumeInfo.imageLinks.thumbnail;
        let name = element.volumeInfo.title;
        let author = element.volumeInfo.authors[0];
        let bookId = element.id;
        if (name.length > 35) {
          name = name.slice(0, 35) + "...";
        }
        if (author.length > 25) {
          author = author.slice(0, 25) + "...";
        }
        creatBookContainer(cover, name, author, bookId);
      }
    });
  });

  //**When the user click on the book img,name,auothor this function will take the user to the book details page */
  function addBook(event){
    let bookArray = []
    bookArray.push(event.target.className.split(" ")[1])
    localStorage.setItem("bookDetails", JSON.stringify(bookArray))
    window.location.href = "..\\Book page\\book.html"
}



