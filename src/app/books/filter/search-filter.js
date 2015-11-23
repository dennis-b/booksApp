/**
 * Created by den on 11/23/2015.
 */
import {Inject,Filter} from 'annotations/ng-decorator';

class BooksSearchFilters {

    @Filter({
        filterName: 'booksSearch'
    })
    static booksSearchFilters() {
        return (input, searchQuery) => {
            console.log(input);
            console.log(searchQuery);
        };
    }
}