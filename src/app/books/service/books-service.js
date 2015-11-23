import {Inject,Service} from 'annotations/ng-decorator';

@Service({
    serviceName: 'booksService'
})
@Inject('Restangular')
class BooksService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getBooks() {
        return this.Restangular.one('booksApp/src/data/books.json').getList();
    }

    getCategories() {
        return this.Restangular.all('booksApp/src/data/category.json').getList();
    }

    getBookTypes() {
        return this.Restangular.all('booksApp/src/data/book-type.json').getList();
    }
}
