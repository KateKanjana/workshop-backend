export interface ISearchService<T> {
  search(query: any, body: any): Promise<T[]>;
}
