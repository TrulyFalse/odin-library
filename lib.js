// console.log("It works.");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read": "not read yet"}`;
    }
}

console.log(new Book("House of Leaves", "Mark Z. Danielewski", 736, false).info());
