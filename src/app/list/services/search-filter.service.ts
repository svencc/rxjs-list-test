import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Person } from '../model/person';
import { SearchState, SearchType } from '../model/searchState';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor() { }

  public prepareFilter(dataSource$: Observable<Person[]>, searchState$: Observable<SearchState>): Observable<Person[]> {

    return combineLatest(dataSource$, searchState$).pipe(
      map<[Person[], SearchState], Person[]>((combined: [Person[], SearchState]) => {
        const data = combined[0];
        const search = combined[1];
        return data.filter(
          (person) => this.applyFilterState(search, person)
        );
      })
    );
  }

  private applyFilterState(searchState: SearchState, person: Person): boolean {
    switch (searchState.type) {
      case SearchType.NO_SEARCH:
        return true;
      case SearchType.QUERY_STRING:
        return (this.searchCaseInsensitive(person.name, searchState.query)
          || this.searchCaseInsensitive(person.surname, searchState.query));
      case SearchType.THUMB_INDEX:
        return (this.startsWith(person.name, searchState.query)
          || this.startsWith(person.surname, searchState.query));
    }
  }

  private searchCaseInsensitive(haystack: string, needle: string): boolean {
    return -1 < haystack.toLowerCase().search(
      needle.toLowerCase()
    );
  }

  private startsWith(haystack: string, firstLetter: string): boolean {
    return haystack.toLowerCase()[0] === firstLetter.toLowerCase();
  }
}
