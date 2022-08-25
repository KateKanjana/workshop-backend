export interface ICRUDService<U, V> {
  create(requestDTO: U): Promise<U>;
  read(id: string): Promise<U>;
  update(requestDTO: U): Promise<U>;
  delete(id: string): Promise<V>;
}
