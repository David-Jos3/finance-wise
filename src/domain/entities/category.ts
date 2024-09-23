import { randomUUID } from 'node:crypto'

export interface CategoryProps {
  name: string
  description?: string | null
  expensesId: string
  budgetsId: string
  incomesId: string

}

export class Category {
  private _id: string
  private _props: CategoryProps

  constructor(private props: CategoryProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = {
      ...props,
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._props.name
  }

  get description(): string | null {
    return this._props.description
  }
}
