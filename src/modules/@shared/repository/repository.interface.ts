export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<number>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
