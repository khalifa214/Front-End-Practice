const dataBooks = [];
const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'BOOK_APPS';


function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
};

function loadDataStorage () {
    const callData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(callData);

    if (data !== null) {
        for (let book of data) {
            dataBooks.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
};

function generateId() {
    return +new Date();
};

function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(dataBooks);
      localStorage.setItem(STORAGE_KEY, parsed);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('inputBook');
    submitButton.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
        resetValueInput();
    })

    if (isStorageExist()) {
        loadDataStorage();
      }
});

function generateBooksObject(id, title, author, year, isCompleted) {
    return {id, title, author, year, isCompleted};
};

function statusReadBook () {
    const inputBookisComplete = document.getElementById('inputBookIsComplete');
    let status;

    if (inputBookisComplete.checked) {
        status = true;
    } else {
        status = false;
    }

    return status;
}

function addBook() {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const yearBook = parseInt(document.getElementById('inputBookYear').value);
    const generateID = generateId();
    const isCompleted = statusReadBook();

    const dataObjectBooks = generateBooksObject(generateID, titleBook, authorBook, yearBook, isCompleted);

    dataBooks.push(dataObjectBooks);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
};

document.addEventListener(RENDER_EVENT, function() {
    const unCompleteReadBooks = document.getElementById('incompleteBookshelfList');
    unCompleteReadBooks.innerHTML = '';
    const completeReadBooks = document.getElementById('completeBookshelfList');
    completeReadBooks.innerHTML = '';

    for (const bookItem of dataBooks) {
        const bookElement = makeBookContent(bookItem);

        if (!bookItem.isCompleted) {
            unCompleteReadBooks.append(bookElement);
        } else {
            completeReadBooks.append(bookElement);
        }
    }
});

function makeBookContent(dataObjectBooks) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = dataObjectBooks.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = `Penulis: ${dataObjectBooks.author}`;
    const bookYear = document.createElement('p');
    bookYear.innerText = `Tahun: ${dataObjectBooks.year}`;

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(bookTitle, bookAuthor, bookYear);
    container.setAttribute('id', `book-${dataObjectBooks.id}`);

    if (dataObjectBooks.isCompleted) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');

        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = 'Belum selesai di Baca';

        undoButton.addEventListener('click', function () {
            changeStatusCompleted(dataObjectBooks.id);
        })

        const removeButton = document.createElement('button');
        removeButton.classList.add('red');
        removeButton.innerText = 'Hapus buku';

        removeButton.addEventListener('click', function() {
            removeBookList(dataObjectBooks.id);
        })

        buttonContainer.append(undoButton, removeButton);

        container.append(buttonContainer);
    } else {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');

        const finishButton = document.createElement('button');
        finishButton.classList.add('green');
        finishButton.innerText = 'Selesai di Baca';

        finishButton.addEventListener('click', function() {
            changeStatusCompleted(dataObjectBooks.id);
        })

        const removeButton = document.createElement('button');
        removeButton.classList.add('red');
        removeButton.innerText = 'Hapus buku';

        removeButton.addEventListener('click', function() {
            removeBookList(dataObjectBooks.id);
        })

        buttonContainer.append(finishButton, removeButton);

        container.append(buttonContainer);
    }

    return container;
};


const checkButton = document.getElementById('inputBookIsComplete');
checkButton.addEventListener('click', function(){
    const textSubmit = document.querySelector('#bookSubmit span');

    if (checkButton.checked) {
        textSubmit.innerText = 'Selesai dibaca';
    } else {
        textSubmit.innerText = 'Belum selesai dibaca'
    }
});


const removeBookList = (bookId) => {
    let index = 0;
    for (let book of dataBooks) {
        if (book.id === bookId) {
            alert(`Buku ${book.title} telah dihapus`);
            dataBooks.splice(index, 1);
        }
        
        index++;
    }

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
};


const changeStatusCompleted = (bookId) => {
    let index = 0;
    for (let book of dataBooks) {
        if (book.id === bookId) {
            if (book.isCompleted === true) {
                dataBooks[index].isCompleted = false;
            } else if (book.isCompleted === false) {
                dataBooks[index].isCompleted = true;
            }
            
        }
        index++
    }
    
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
};

const searchSubmit = document.getElementById('searchBook');

const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset Filter';
        resetButton.classList.add('red');
        resetButton.setAttribute('type', 'reset');

        searchSubmit.append(resetButton);

searchSubmit.addEventListener('reset', function() {
            document.dispatchEvent(new Event(RENDER_EVENT));
});

searchSubmit.addEventListener('submit', function(event) {
    const bookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
   
    let filterBook = dataBooks.filter(book => book.title.toLowerCase().includes(bookTitle));

    if(filterBook.length == 0) {
        alert('Judul Buku Tidak Ada');
        resetValueInput();
        document.dispatchEvent(new Event(RENDER_EVENT));

    } else {

        const unCompleteReadBooks = document.getElementById('incompleteBookshelfList');
        unCompleteReadBooks.innerHTML = '';
        const completeReadBooks = document.getElementById('completeBookshelfList');
        completeReadBooks.innerHTML = '';

        for (const bookItem of filterBook) {
            const bookElement = makeBookContent(bookItem);

            if (!bookItem.isCompleted) {
                unCompleteReadBooks.append(bookElement);
            } else {
                completeReadBooks.append(bookElement);
            }
        }

        resetValueInput();

    }
    event.preventDefault();

});



function resetValueInput() {
    const input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
};