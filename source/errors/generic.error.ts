import * as messages from '../constants/messages.json';

export async function execute(error) {
    console.log('Error: ',error)
    return { 
        message: messages.server_error, 
        statusCode: 500
    }
}