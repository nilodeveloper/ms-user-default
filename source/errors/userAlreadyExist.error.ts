import * as messages from '../constants/messages.json'
import * as genericError from './generic.error'

export async function execute() {
    try {
        return {
            message: messages.register.user_already_exist,
            statusCode: 401
        }
    } catch (err) {
        return genericError.execute(err)
    }
}