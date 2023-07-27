import * as messages from '../constants/messages.json';

export async function execute(objectSend, result: any) {
    let expected = result.error.errors[0].expected
    let received = result.error.errors[0].received
    let attr = result.error.errors[0].path[0]
    try {
        return {
            data: {
                expected,
                received,
                attr,
                body: objectSend
            },
            message: messages.credentials.invalid,
            errorCode: 1,
            statusCode: 400,
        }
    } catch (err: any) {
        console.log('Error: ',err)
        return { 
            message: messages.server_error, 
            statusCode: 500
        }
    }
}
