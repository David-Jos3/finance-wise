import { randomUUID } from 'node:crypto'

export interface ExpenseProps {
  amount: number
  description?: string
  date: Date
  userId: string
  categoryId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Expense {
  private _id: string
  private _props: ExpenseProps

  constructor(private props: ExpenseProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = { ...props }
  }

  get id(): string {
    return this._id
  }

  get amount(): number {
    return this._props.amount
  }

  set amount(value: number) {
    this._props.amount = value
  }

  get description(): string | null {
    return this._props.description ?? null
  }

  set description(value: string | null) {
    this._props.description = value ?? undefined
  }

  get date(): Date {
    return this._props.date
  }

  set date(value: Date) {
    this._props.date = value
  }

  get userId(): string {
    return this._props.userId
  }

  get categoryId(): string {
    return this._props.categoryId
  }

  set categoryId(value: string) {
    this._props.categoryId = value
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date | null {
    return this._props.updatedAt ?? null
  }

  set updatedAt(value: Date | null) {
    this._props.updatedAt = value
  }
}
