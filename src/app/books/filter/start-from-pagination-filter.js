import {Inject,Filter} from 'annotations/ng-decorator';

class PaginationFilters {
    
    @Filter({
        filterName: 'startFrom'
    })
    static startFromFilter() {
        return (input, start) => {
            start = +start;
            return input.slice(start);
        };
    }
}