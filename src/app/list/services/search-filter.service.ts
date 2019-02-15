import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { SearchState, SearchType } from '../model/searchState';
import { debounce, debounceTime, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor() { }

  public prepareFilter(dataSource: Observable<Person[]>, searchState: Observable<SearchState>): Observable<Person[]> {
    return searchState.pipe(
      switchMap((search: SearchState) => {
        return dataSource.pipe(
          map((persons: Person[]) => {
            return persons.filter( (person) => this.applyFilterState(search, person)
            );
          })
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
      case SearchType.DATA_PROVIDED:
        return true;
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
