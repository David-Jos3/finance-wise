import { randomUUID } from 'node:crypto'

export interface IncomeProps {
  amount: number
  description?: string
  userId: string
  categoryId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Income {
  private _id: string
  private _props: IncomeProps

  constructor(private props: IncomeProps, id?: string) {
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

  get description(): string | null {
    return this._props.description
  }

  get userId(): string {
    return this._props.userId
  }

  get categoryId(): string {
    return this._props.categoryId
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date | null {
    return this._props.updatedAt
  }
}
