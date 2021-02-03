import { Controller } from '../../../../presentation/protocols'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
