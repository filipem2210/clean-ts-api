import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const validationError = sut.validate({ field: 'any_value' })
    expect(validationError).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const validationError = sut.validate({ field: 'any_value' })
    expect(validationError).toEqual(new Error())
  })

  test('Should not return validation succeeds', () => {
    const { sut } = makeSut()
    const validationError = sut.validate({ field: 'any_value' })
    expect(validationError).toBeFalsy()
  })
})
