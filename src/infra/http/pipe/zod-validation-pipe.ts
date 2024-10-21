import {
  PipeTransform,
  BadRequestException,
} from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      console.log('Parsed value:', parsedValue)
      return parsedValue
    } catch (error) {
      console.error('Validation error:', error)
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          error: fromZodError(error),
        })
      }
      throw new BadRequestException('Validation failed')
    }
  }
}
