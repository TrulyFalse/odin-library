// console.log("It works.");

const bookCollection = [];

function Book(title, author, category, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.read = read !== null;

    this.info = function(){
        return `${this.title} by ${this.author}, Category: ${this.category}, ${this.pages} pages, ${this.read ? "read": "not read yet"}`;
    }
}
// console.log(new Book("House of Leaves", "Mark Z. Danielewski", "Horror", 736, false).info());

function addBookToCollection(form) {
    let newBook = new Book(form.get('title'), form.get('author'), form.get('category'), form.get('pages'), form.get("read"));
    bookCollection.push(newBook);
}

let addBookBtn = document.querySelector(`#add-book-dialog form button[type="submit"]`);
addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isFormValid = document.forms["add-book-form"].reportValidity();
    if(!isFormValid) return;

    let form = new FormData(document.querySelector("#add-book-form"));
    let libraryContainer = document.querySelector(`main`);
    let dialog = document.querySelector("#add-book-dialog");
    addBookToCollection(form);
    displayBooks(bookCollection, libraryContainer);
    dialog.close();
    document.forms["add-book-form"].reset();
});

function displayBooks(bookArray, displayContainer){
    let booksLeftToDisplay = bookArray.filter((item) => displayContainer.querySelector(`div[data-book-id='${item.id}']`) === null);
    
    for (let item of booksLeftToDisplay){
        // <div class="book-card">
        //     <div class="cover">
        //         <div class="bookmark read">Read</div>
        //     </div>
        //     <div class="fields">
        //          <!-- All field data -->
        //     </div>
        // </div>
        let bookCard = document.createElement("div");
        bookCard.classList.toggle("book-card");
        bookCard.setAttribute("data-book-id", item.id);

        let cover = document.createElement("div");
        cover.classList.toggle("cover");

        let bookmark = document.createElement("div");
        bookmark.classList.toggle("bookmark");
        bookmark.addEventListener("click", () => {
            item.read = !item.read;
            bookmark.classList.toggle("read");
            bookmark.textContent = item.read ? "Read" : "Not Read";
        });
        if (item.read) {
            bookmark.classList.toggle("read");
            bookmark.textContent = "Read";
        } else
            bookmark.textContent = "Not Read";

        cover.append(bookmark);
        bookCard.append(cover);

        let fields = document.createElement('div');
        fields.classList.toggle('fields');

        let title = document.createElement('h3');
        title.classList.toggle("title");
        title.textContent = item.title;
        let author = document.createElement('div');
        author.classList.toggle("author");
        author.textContent = 'by ' + item.author;
        let category = document.createElement('div');
        category.classList.toggle("category");
        category.textContent = item.category;
        let pages = document.createElement('div');
        pages.classList.toggle("pages");
        pages.textContent = item.pages + ' pages';

        fields.append(title, author, category, pages);
        bookCard.append(fields);
        displayContainer.append(bookCard);
    }
}