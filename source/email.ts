import nodemailer from 'nodemailer';
import * as message from './constants/messages.json'
import 'dotenv/config'

export async function sendConfirmationEmail(userEmail: string, codigo: string){
    let transporter = nodemailer.createTransport({ 
        host: process.env.HOST_SEND_EMAIL,
        port: Number(process.env.PORT_SEND_EMAIL),
        service: process.env.SERVICE_SEND_EMAIL,
        secure: false,
        auth: { 
            user: process.env.USER_SEND_EMAIL, 
            pass: process.env.PASSWORD_SEND_EMAIL
        },
        debug: false,
        logger: true
    });
    const mailOptions = {
        from: process.env.USER_SEND_EMAIL,
        to: userEmail,
        subject: message.subject_register_email,
        html: `
        <p>Muito bem vindo ao ms-user-generic!</p>
        <p>Para concluir o cadastro no nosso sistema por favor clique aqui
        <a href="http://localhost:3000/confirm/email/${codigo}">aqui</a>
        </p>
        `
    };
    await transporter.sendMail(mailOptions, (err, info) => {
        if(err){
          console.log(err);
        }else{
          console.log(info);
        }
     });
}