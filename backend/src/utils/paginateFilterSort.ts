import { IFilters, IFiltersQuery, ISearchQuery } from '@interfaces/IParams';
import { Request } from 'express';

export const generateFilters = (filters: IFilters[]): IFiltersQuery => {
  const filtersQuery: IFiltersQuery = {};
  filters.forEach((filter: IFilters) => {
    filtersQuery[filter.param] = filter.value;
  });
  return filtersQuery;
};

export const generateSearch = (searches: IFilters[]): ISearchQuery => {
  const searchQuery: ISearchQuery = {};
  searches.forEach((filter: IFilters, i) => {
    if (i > 0) {
      searchQuery.OR = { [filter.param]: { contains: filter.value } };
    } else {
      searchQuery[filter.param] = { contains: filter.value };
    }
  });
  return searchQuery;
};

export const paginateFilterSort = <T, K>(req: Request, where?: K): T => {
  const { filters, sort, skip, take, valueSort } = req.query;
  let args = {} as T;
  const existFilter = !!filters;
  const existSort = valueSort && sort;
  if (existFilter) {
    const filtersArray: IFilters[] = JSON.parse(filters as string);
    const filtersObject = generateFilters(filtersArray);
    if (where) {
      args = { ...args, where: { ...filtersObject, ...where } };
    } else {
      args = { ...args, where: filtersObject };
    }
  } else if (where) {
    args = { ...args, where };
  }
  if (existSort) {
    args = { ...args, orderBy: { [sort.toString()]: valueSort.toString() === 'true' ? 'asc' : 'desc' } };
  }
  if (take) {
    args = { ...args, take: Number(take) };
  }
  if (skip) {
    args = { ...args, skip: (Number(skip) - 1) * Number(take) };
  }
  return args;
};

export const filterQuery = <T, K>(req: Request, where?: K): T => {
  const { filters } = req.query;
  let args = {} as T;
  const existFilter = !!filters;
  if (existFilter) {
    const filtersArray: IFilters[] = JSON.parse(filters as string);
    const filtersObject = generateFilters(filtersArray);
    if (where) {
      args = { ...args, where: { ...filtersObject, ...where } };
    } else {
      args = { ...args, where: filtersObject };
    }
  } else if (where) {
    args = { ...args, where };
  }
  return args;
};
