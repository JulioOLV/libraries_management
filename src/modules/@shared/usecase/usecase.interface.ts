export default interface Usecase<T, J> {
  execute(input: T): Promise<J>;
}
