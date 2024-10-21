export class ExpenseAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`Expense ${identifier} already exists`)
  }
}
