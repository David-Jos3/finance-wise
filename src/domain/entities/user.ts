import { randomUUID } from 'node:crypto'

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: string
  private _props: UserProps

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = {
      ...props,
      updatedAt: props.updatedAt ?? null,
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._props.name
  }

  get email(): string {
    return this._props.email
  }

  get password(): string {
    return this._props.password
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date | null {
    return this._props.updatedAt
  }
}
