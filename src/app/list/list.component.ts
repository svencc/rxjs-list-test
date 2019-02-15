import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { Person } from './model/person';
import { DataProviderService } from './services/data-provider.service';
import { DataProviderInterface } from './services/data-provider.interface';
import { SearchState, SearchType } from './model/searchState';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchFilterService } from './services/search-filter.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild('search')
  private search: ElementRef;

  @ViewChild('thumbIndex')
  private thumbIndex: ElementRef;
  private thumbIndexSubject: Subject<SearchState> = new BehaviorSubject<SearchState>({
    type: SearchType.NO_SEARCH
  });

  public filteredPersons$: Observable<Person[]>;

  constructor(
    @Inject(DataProviderService) private dataProvider: DataProviderInterface,
    private searchFilterService: SearchFilterService
  ) { }

  public ngOnInit() {
    this.dataProvider.getData();
    this.filteredPersons$ = this.searchFilterService.prepareFilter(
      this.dataProvider.persons$,
      this.mergeFilterStateObservable()
    );
  }

  private mergeFilterStateObservable(): Observable<SearchState> {
    return merge(
      fromEvent(
        this.search.nativeElement, 'keyup').pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map<Event, SearchState>(
          (event: Event) => {
            return {
              type: SearchType.QUERY_STRING,
              query: (event.target as any).value
            };
          }
        )
      ),
      this.thumbIndexSubject.asObservable(),
    );
  }

  public letterClicked($letter: string) {
    this.thumbIndexSubject.next({
      type: SearchType.THUMB_INDEX,
      query: $letter
    });
  }
}
