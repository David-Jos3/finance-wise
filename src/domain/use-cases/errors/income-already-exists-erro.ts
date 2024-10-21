export class IncomeAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`income ${identifier} already exists`)
  }
}
