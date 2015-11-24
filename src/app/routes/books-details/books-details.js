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
        selectedBook(booksService, $stateParams){
            return booksService.getBookById($stateParams.id)
        }
    }
})

@Inject('$scope', 'books', 'selectedBook', '$state')
//
class BooksList {
    constructor($scope, books, selectedBook, $state) {
        this.$scope = $scope;
        this.books = books;
        this.$state = $state;
        this.selectedBook = selectedBook;

    }

    showAllBooks() {
        this.$state.go("books");
    }

    initPaginationControls() {
        this.currentPage = 1;
        this.totalItems = this.books.length;
        this.entryLimit = 4; // items per page
        this.noOfPages = Math.ceil(this.totalItems / this.entryLimit);
    }

    addFilterWatch() {
        var _this = this;
        _this.$scope.$watch('vm.filter', function (newVal, oldVal) {
            _this.filtered = _this.$filter('filter')(_this.books, newVal, true);
            _this.handlePagination();
        }, true);
    }

    addSearchWatch() {
        var _this = this;
        _this.$scope.$watch('vm.search', function (newVal, oldVal) {
            _this.filter = {genre: {}};
            _this.filtered = _this.$filter('filter')(_this.books, newVal, function (searchModel, expected) {
                return searchModel.toLowerCase().indexOf(expected.toLowerCase()) > -1;

            });
            _this.handlePagination();
        }, true);
    }


}
