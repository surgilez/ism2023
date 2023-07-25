export interface IFilters {
  value: string;
  param: string;
}

export interface IFiltersQuery {
  [key: string]: string;
}

export interface ISearchQuery {
  [key: string]: { [key: string]: string | { [key: string]: string } };
}
