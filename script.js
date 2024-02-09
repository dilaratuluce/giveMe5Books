async function fetchData(){
    try{
        const bookName = document.getElementById("bookName").value.toLowerCase();
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?" 
                                    + "q=" + bookName
                                    + "+title:" + bookName
                                    + "+&key=AIzaSyBJgB9IXRRCLVLTQPZp6u4ePhAsPKo9EoE");
        if(!response.ok){
            throw new Error("No book fetched");
        }
        const data = await response.json();
        console.log(data);

        let bookNum = data.totalItems;
        console.log(bookNum);
        if(bookNum > 5) bookNum = 5;

      /*let bookCover;
        let imgElement;
        let bookElement;
        let bookTitle;
        let volumeInfo;
        let bookDescription;
        let bookAuthors;*/
        let i = 0;
        let displayedBooks = 0;

        while (i < bookNum) {
            try{
                volumeInfo = data.items[i].volumeInfo;
                bookCover = volumeInfo.imageLinks.thumbnail;
                bookTitle = volumeInfo.title;
                bookDescription = volumeInfo.description || "No description found for this book";
                bookAuthors = volumeInfo.authors;
                bookPublisher = volumeInfo.publisher;
                bookPageCount = volumeInfo.pageCount;
                bookPreviewLink = volumeInfo.previewLink;
                
                if (bookDescription.length > 300){
                    bookDescription = bookDescription.substr(0, 300) + "...";
                }

                if (bookAuthors.length < 1) {
                    bookAuthors.push("Unknown author");
                }

                if (!bookPublisher) {
                    bookPublisher = "Unknown publisher";
                }

                if (!bookPageCount) {
                    bookPageCount = "Unknown page count";
                }
                
                bookElement = document.getElementById("book-item" + displayedBooks);
                bookElement.style.display = "block";
                imgElement = document.getElementById("bookImage" + displayedBooks);
                imgElement.src = bookCover;
                imgElement.style.display = "block";
                bookTitleElement = document.getElementById("bookName" + displayedBooks);
                bookTitleElement.textContent = bookTitle;
                bookDescriptionElement = document.getElementById("card-description" + displayedBooks);
                bookDescriptionElement.textContent = bookDescription;

                bookAuthorElement = document.getElementById("author" + displayedBooks);
                bookAuthorElement.textContent =  bookAuthors[0];

                bookPublisherElement = document.getElementById("publisher" + displayedBooks);
                bookPublisherElement.textContent = bookPublisher;

                bookPageCountElement = document.getElementById("page-count" + displayedBooks);
                bookPageCountElement.textContent =  bookPageCount;

                bookPreviewElement = document.getElementById("book-preview" + displayedBooks);
                bookPreviewElement.setAttribute('href', bookPreviewLink);
                console.log(bookPreviewElement.getAttribute("href"));

                i++;
                displayedBooks++;
                bookNum++; 
           }
           catch(error){
                console.log("I catched an error");
                i++;
                continue;
           }
        }
    }
    catch(error){
        console.error(error);
    }

}