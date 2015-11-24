import {Inject,Service} from 'annotations/ng-decorator';

@Service({
    serviceName: 'booksService'
})
@Inject('Restangular', 'localStorageService', '$q')
class BooksService {
    constructor(Restangular, localStorageService, $q) {
        this.Restangular = Restangular;
        this.localStorageService = localStorageService;
        this.$q = $q;
    }

    getBooks() {
        var books = this.localStorageService.get('books');
        if (books) {
            return books;
        }
        var _this = this;
        return this.Restangular.one('booksApp/src/data/books.json').getList().then(function (books) {
            _this.localStorageService.set('books', books);
            return books;
        })

    }

    getCategories() {
        return this.Restangular.all('booksApp/src/data/category.json').getList();
    }

    getBookTypes() {
        return this.Restangular.all('booksApp/src/data/book-type.json').getList();
    }

    getBookById(id) {
        var books = this.getBooks();
        return _.find(books, function (book) {
            return book.id == id;
        })
    }

    getSimilarBooks(selectedBook) {
        let similarArr = this.getSimilarBooksArr(selectedBook);
        return this.$q.when(similarArr);
    }

    getSimilarBooksArr(selectedBook) {
        let books = this.getBooks();
        let similarArr = [];
        for (var i = 0; i < books.length; i++) {
            var book = books[i];
            if (book.name != selectedBook.name && book.genre.category === selectedBook.genre.category) {
                similarArr.push(book);
                if (similarArr.length == 3) {
                    return similarArr
                }
            }
        }
        return similarArr;
    }
}
