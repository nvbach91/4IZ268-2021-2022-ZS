$(document).ready(() => {

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    const apiKey = 'AIzaSyDymDgnqW1KgU8Q4PwVHbMdOCcEs8t128M';

    const bookInput = $('#book-input');
    const bookList = $('.book-list');
    const sortingButtons = $('.sort-buttons');
    const sortingRating = $('#sort-rating');
    const sortingPages = $('#sort-pages');
    const savedBooks = $('.saved-books');
    const spinner = $('<div class="loader"></div>');
    const saved = [];
    let books = [];
    let tempBooks = [];
    let searchedUrl;
    let loadingUrl;

    $(document).ready(function () {
        if (localStorage.getItem("savedBooks") !== (null)) {
            retrieve();
        };
    });

    $('#search-form').on("submit", function (e) {
        e.preventDefault();

        if (bookInput.val().trim()) {
            bookList.empty();
            checkActive();
            spinner.appendTo(bookList);
            searchedUrl = `${apiUrl}${'+intitle:'}${bookInput.val()}${'&maxResults=12&key='}${apiKey}`;
            loadingUrl = searchedUrl;

            loadBooks();
        }
    });

    const loadBooks = () => {
        books = [];

        $.getJSON(loadingUrl).done((resp) => {
            console.log(loadingUrl);
            if (resp.totalItems === 0) {

                const noBookText = $(`<p class="w-100">Book not found, try again.</p>`);
                books.push(noBookText);
                if (sortingButtons.hasClass("active") === false) {
                    sortingButtons.addClass("d-none");
                }
            }
            else {
                resp['items'].forEach((r) => {
                    const book = addBook(r);
                    books.push(book);
                });
                sortingButtons.removeClass("d-none");
            }

            bookList.append(books);
        }).always(() => {
            spinner.detach();
        });
    }

    const addBook = (r) => {
        const book = $(`<div class="col-md-4 book">`);
        const container = $(`<div class="card mb-4 shadow-sm h-100 container"></div>`);
        const viewButton = $(`<a href="${r['volumeInfo']['canonicalVolumeLink']}"class="btn btn-sm btn-outline-secondary view" target="_blank">View</a>`);
        const saveButton = $(`<button type="button" id="save-button-${r['id']}" class="btn btn-sm btn-outline-secondary save-button">Save</button>`);
        const buttonsContainer = $(`<div class="d-flex justify-content-between">`);
        const buttons = $(`<div class="card-body buttons">`);
        const tag = $(`<span class="badge badge-secondary"></span>`);

        buttons.append(viewButton, saveButton);
        buttonsContainer.append(buttons);

        let img = $(`<img class="card-img-top" alt="..." src="http://www.uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg">`);

        if ('imageLinks' in r['volumeInfo']) {
            img = $(`<img class="card-img-top" alt="..." src="${r['volumeInfo']['imageLinks']['thumbnail']}">`);
        }

        const textField = $(`<div class="card-body">`);
        const title = $(`<h3 class="card-title">${r['volumeInfo']['title']}</h3>`);
        const infoText = $(`<ul class="list-group list-group-flush text-left align-items-bottom">`);
        const bookRating = $(`<li class="list-group-item rating">Book rating: ${r['volumeInfo']['averageRating']}</li>`);
        const bookPages = $(`<li class="list-group-item pages">Pages: ${r['volumeInfo']['pageCount']} pages</li>`);
        const ebook = $(`<li class="list-group-item ebook">Ebook: ${r['saleInfo']['isEbook']}</li>`);
        infoText.append(bookRating, bookPages, ebook);
        textField.append(title, infoText, buttonsContainer);

        if (r.ebook === true) {
            textField.append(tag.text("ebook"));
        }

        textField.append(infoText, buttonsContainer);
        container.append(img, textField);
        book.append(container);
        return book;
    }

    sortingRating.click(() => {
        sortBooks("relevance");
    });
    sortingPages.click(() => {
        sortBooks('newest');
    });

    const sortBooks = (sortType) => {
        checkActive();

        books = [];

        let baseUrl = loadingUrl.replace(/&orderBy=(?:newest|relevance)/, "");

        if (sortType === "relevance") {

            baseUrl = baseUrl + '&orderBy=relevance';
            //loadingUrl = baseUrl = baseUrl + '&key=' + apiKey;
            loadingUrl = baseUrl;
            sortingPages.addClass("active");
        };
        if (sortType === "newest") {

            baseUrl = baseUrl + '&orderBy=newest';
            //loadingUrl = baseUrl = baseUrl + '&key=' + apiKey;
            loadingUrl = baseUrl;
            sortingRating.addClass("active");
        };

        bookList.empty();

        spinner.appendTo(bookList);
        loadBooks();
    }

    bookList.on("click", ".save-button", function () {

        const container = $(this).closest('.container').clone();
        const bookName = container.find(".card-title").text();
        const bookUrl = container.find(".view").attr("href");
        const bookImg = container.find(".card-img-top").attr("src");
        const bookPages = container.find(".pages").text();
        var inArray = false;

        const bookData = {
            title: bookName,
            sourceUrl: bookUrl,
            bookHasPages: bookPages,
            image: bookImg,
        }

        saved.forEach((r) => {
            if (r["title"] == bookData.title) {
                inArray = true;
            }
        });

        if (inArray === false) {
            saved.push(bookData);
            console.log(saved);
            const savedHtml = addSavedBook(bookData);
            savedBooks.append(savedHtml);
            localStorage.setItem("savedBooks", JSON.stringify(saved));
        }
    });

    const addSavedBook = (bookData) => {
        const savedBook = $(`<div class= "book">`);
        const container = $(`<div class="card mb-4 shadow-sm h-100 container"></div>`);
        const viewButton = $(`<a href="${bookData.sourceUrl}"class="btn btn-sm btn-outline-secondary view" target="_blank">View</a>`);
        const removeButton = $(`<div class= "btn btn-sm btn-outline-secondary remove-button">Remove</div>`);
        const buttonsContainer = $(`<div class="d-flex justify-content-between">`);
        const buttons = $(`<div class="card-body buttons">`);
        buttons.append(viewButton, removeButton);
        buttonsContainer.append(buttons);

        const img = $(`<img class="card-img-top" alt="..."src="${bookData.image}">`);
        const textField = $(`<div class="card-body">`);
        const title = $(`<h3 class="card-title">${bookData.title}</h3>`);
        const infoText = $(`<ul class="list-group list-group-flush text-left align-items-bottom">`);

        textField.append(title, infoText, buttonsContainer);
        container.append(img, textField);
        savedBook.append(container);
        return savedBook;
    }

    savedBooks.on("click", ".remove-button", function () {
        var position = 0;
        var x = 0;
        const deletedBook = $(this).closest('.book');
        const deletedBookTitle = deletedBook.find(".card-title").text();
        deletedBook.remove();

        saved.forEach((r) => {

            if (r["title"] == deletedBookTitle) {
                position = x;
            }
            x += 1;
        })
        saved.splice(position, 1);
        localStorage.setItem("savedBooks", JSON.stringify(saved));
    });

    const checkActive = () => {
        if (sortingRating.hasClass("active") === true) {
            sortingRating.removeClass("active")
        };
        if (sortingPages.hasClass("active") === true) {
            sortingPages.removeClass("active")
        };
    }

    function retrieve() {
        tempBooks = [];
        const storage = JSON.parse(localStorage.getItem("savedBooks")); //conversion to js object
        storage.forEach((r) => {
            const book = addSavedBook(r);
            tempBooks.push(book);
            saved.push(r);
        });
        savedBooks.append(tempBooks);
    };
});