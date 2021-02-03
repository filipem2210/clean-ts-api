import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = makeSut()
    const validationError = sut.validate({ name: 'any_name' })
    expect(validationError).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const validationError = sut.validate({ field: 'any_field' })
    expect(validationError).toBeFalsy()
  })
})
