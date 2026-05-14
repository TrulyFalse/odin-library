// console.log("It works.");

const bookCollection = [];

function Book(title, author, category, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.read = read;

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
    let form = new FormData(document.querySelector("#add-book-dialog form"));
    let libraryContainer = document.querySelector(`main`);
    e.preventDefault();
    addBookToCollection(form);
    displayBooks(bookCollection, libraryContainer);
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
        bookmark.addEventListener("click", () => bookmark.classList.toggle("read"));
        if (item.read !== null) {
            bookmark.classList.toggle("read");
            bookmark.textContent = "Read";
        } else
            bookmark.textContent = "Not Read";

        cover.append(bookmark);
        bookCard.append(cover);

        let fields = document.createElement('div');
        fields.classList.toggle('fields');

        let title = document.createElement('div');
        title.textContent = item.title;
        let author = document.createElement('div');
        author.textContent = item.author;
        let category = document.createElement('div');
        category.textContent = item.category;
        let pages = document.createElement('div');
        pages.textContent = item.pages;

        fields.append(title, author, category, pages);
        bookCard.append(fields);
        displayContainer.append(bookCard);
    }
}