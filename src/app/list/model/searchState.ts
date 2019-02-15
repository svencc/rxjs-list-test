export class SearchState {
  type: SearchType;
  query?: string;
}

export enum SearchType {
  NO_SEARCH,
  THUMB_INDEX,
  QUERY_STRING,
  DATA_PROVIDED
}
