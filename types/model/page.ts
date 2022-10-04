export type Page<T> = {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPageSize: number;
};
