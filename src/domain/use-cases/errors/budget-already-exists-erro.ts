export class BudgetAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`budgets ${identifier} already exists`)
  }
}
