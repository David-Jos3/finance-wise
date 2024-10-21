import { randomUUID } from 'node:crypto'

export interface BudgetProps {
  amount: number
  userId: string
  categoryId: string
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Budget {
  private _id: string
  private _props: BudgetProps

  constructor(private props: BudgetProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = {
      ...props,
    }
  }

  get id(): string {
    return this._id
  }

  get amount(): number {
    return this._props.amount
  }

  get userId(): string {
    return this._props.userId
  }

  get categoryId(): string {
    return this._props.categoryId
  }

  get startDate(): Date | null {
    return this._props.startDate
  }

  get endDate(): Date | null {
    return this._props.endDate
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date | null {
    return this._props.updatedAt
  }
}
