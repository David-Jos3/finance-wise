export class CategoryAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`Category ${identifier} already exists`)
  }
}
