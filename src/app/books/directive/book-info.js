import template from './book-info.html';
import {View} from 'annotations/directive-decorator';
import moment from 'moment';
import duration from 'moment-duration-format';


@View({
    template: template,
    bind: {
        book: "="
    }
})
//
class BookInfo {
    constructor($state) {
        this.$state = $state;
    }

    calcDate(date) {
        let publishDate = moment(date);
        let today = moment(new Date());
        let diff = today.diff(publishDate, 'days');
        var format = moment.duration(diff, "days").format('Y[y], M[m], D[d]');
        return format + ' ago';
    }

    showDetails(book) {
        console.log(book.id);
        this.$state.go("books-details", {id: book.id});
    }
}

export default BookInfo
