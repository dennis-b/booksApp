import template from './books-details.html';
import {RouteConfig} from 'annotations/route-decorator';
import {Inject,Service} from 'annotations/ng-decorator';

@RouteConfig('books-details', {
    url: '/books-details/:id',
    template: template,
    resolve: {
        books: (booksService) => {
            return booksService.getBooks()
        },
        selectedBook: (booksService, $stateParams)=> {
            return booksService.getBookById($stateParams.id)
        }
    }
})

@Inject('$scope', 'books', 'selectedBook', '$state', 'booksService')
//
class BooksList {
    constructor($scope, books, selectedBook, $state, booksService) {
        this.$scope = $scope;
        this.books = books;
        this.$state = $state;
        this.booksService = booksService;
        this.selectedBook = selectedBook;
        this.initSimilarBooks();

    }

    showAllBooks() {
        this.$state.go("books");
    }

    initSimilarBooks() {
        let _this = this;
        this.booksService.getSimilarBooks(this.selectedBook).then(function (similarBooks) {
            _this.similarBooks = similarBooks;
        });
    }

}
