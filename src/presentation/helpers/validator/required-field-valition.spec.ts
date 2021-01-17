import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

describe('RequiredField Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const validationError = sut.validate({ name: 'any_name' })
    expect(validationError).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('field')
    const validationError = sut.validate({ field: 'any_field' })
    expect(validationError).toBeFalsy()
  })
})
