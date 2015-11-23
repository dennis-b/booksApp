import moment from 'moment';
import duration from 'moment-duration-format';
import template from './books-list.html';
import {RouteConfig} from 'annotations/route-decorator';
import {Inject,Service} from 'annotations/ng-decorator';

@RouteConfig('books', {
    url: '/books',
    template: template,
    resolve: {
        books: (booksService) => {
            return booksService.getBooks()
        },
        categories: (booksService) => {
            return booksService.getCategories()
        },
        bookTypes: (booksService) => {
            return booksService.getBookTypes()
        }
    }
})

@Inject('$scope', 'books', 'categories', '$filter', 'bookTypes')
//
class BooksList {
    constructor($scope, books, categories, $filter, bookTypes) {
        this.initBooksModel(books);
        this.initData($scope, books, categories, $filter, bookTypes);
        this.initPaginationControls();
        this.addFilterWatch();
        this.addSearchWatch();
    }

    initData($scope, books, categories, $filter, bookTypes) {
        this.books = books;
        this.filtered = books;
        this.$filter = $filter;
        this.categories = categories;
        this.bookTypes = bookTypes;
        this.$scope = $scope;
        this.filter = {genre: {}};
        this.search = {};
    }

    initBooksModel(books) {
        angular.forEach(books, function (book, key) {
            book.searchModel = book.name + "_" + book.author.name;
        });


        console.log(this.temp)
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

    handlePagination() {
        this.totalItems = this.filtered ? this.filtered.length : 0;
        this.noOfPages = Math.ceil(this.totalItems / this.entryLimit);
        this.currentPage = 1;
    }

    calcDate(date) {
        let publishDate = moment(date);
        let today = moment(new Date());
        let diff = today.diff(publishDate, 'days');
        var format = moment.duration(diff, "days").format('Y[y], M[m], D[d]');
        return format + ' ago';
    }

    showDetails(book) {
        console.log(book);
    }
}
