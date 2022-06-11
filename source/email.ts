import nodemailer from 'nodemailer';
import 'dotenv/config'

export async function sendConfirmationEmail(userEmail: string, codigo: string){
    let transporter = nodemailer.createTransport({ 
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
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
        subject: 'Bem vindo ao ms-user-generic',
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