const getId = id => document.getElementById(id);

let book = JSON.stringify({ book: [] });
!localStorage.bookshelf && localStorage.setItem("bookshelf",book);
let bookList = JSON.parse(localStorage.getItem('bookshelf'));

let isComplete = false;

const toggleComplete = () => {
	isComplete = getId('input-complete').checked;
}

const addBook = () => {
	let id = bookList.book.length + 1;
	let title = getId('input-title').value;
	let author = getId('input-author').value;
	let year = getId('input-year').value;
	let bookDetail = { id, title, author, year, complete: isComplete };

	bookList.book.push(bookDetail);
	renderList();
}

const listenSearch = e => renderList(true,e.value.toLowerCase());

const switchComplete = e => {
	let id = e.dataset.id;
	for (i=0;i<bookList.book.length;i++){
		if (id == bookList.book[i].id){
			bookList.book[i].complete = !bookList.book[i].complete;
		}
	}

	renderList();
}

const deleteBook = e => {
	let id = e.dataset.id;
	let bookTitle;
	for (i=0;i<bookList.book.length;i++){
		bookTitle = bookList.book[i].title;
		(id == bookList.book[i].id) && bookList.book.splice(i,1);
	}

	let customDialog = getId('custom-dialog');
	customDialog.innerHTML = `Buku ${bookTitle} berhasil dihapus`;
	customDialog.style.transform = 'translateY(-100px)';
	setTimeout(() => {
		customDialog.style.transform = 'translateY(0px)';
	},3000);

	renderList();
}

const contentHTML = book => `<article class="book-item">
	<h3>${book.title}</h3>
	<p>Penulis: ${book.author}</p>
	<p>Tahun: ${book.year}</p>

	<div class="action">
		<button data-id='${book.id}'
			class="${book.complete ? 'green' : 'orange'}"
			onclick='switchComplete(this)'>
			${book.complete ? 'Selesai' : 'Belum selesai'} dibaca
		</button>
		<button class="red" data-id='${book.id}' onclick='deleteBook(this)'>Hapus buku</button>
	</div>
</article>`;

const renderList = (search=false,val=null) => {
	localStorage.setItem('bookshelf',JSON.stringify(bookList));
	let completeBook = '';
	let incompleteBook = '';

	for (i in bookList.book){
		let bookTitle = bookList.book[i].title.toLowerCase();
		if (search && (bookTitle.search(val) == -1)){
			continue;
		} else {
			bookList.book[i].complete ?
				completeBook += contentHTML(bookList.book[i]) :
				incompleteBook += contentHTML(bookList.book[i]);
		}
	}

	getId('complete-bookshelf-list').innerHTML = completeBook;
	getId('incomplete-bookshelf-list').innerHTML = incompleteBook;
}

renderList();