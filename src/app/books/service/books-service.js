import {Inject,Service} from 'annotations/ng-decorator';

@Service({
    serviceName: 'booksService'
})
@Inject('Restangular', 'localStorageService')
class BooksService {
    constructor(Restangular, localStorageService) {
        this.Restangular = Restangular;
        this.localStorageService = localStorageService;
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
        return _.find(this.getBooks(), function (book) {
            return book.id == id;
        })
    }
}
