export interface GetPagenatedApiResponse<T> {
  data: T[];
  items: number;
  first: number;
  last: number;
  prev: number | null;
  next: number | null;
}
