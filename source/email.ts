import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(userEmail: string){
    let transporter = nodemailer.createTransport({ 
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: { 
            user: 'msusergeneric@yahoo.com', 
            pass: 'euazmzyopbzplqvx' 
        },
        debug: false,
        logger: true
    });
    const mailOptions = {
        from: 'msusergeneric@yahoo.com', // sender address
        to: userEmail, // receiver (use array of string for a list)
        subject: 'Bem vindo ao ms-user-generic', // Subject line
        html: `
        
        <p>Muito bem vindo ao ms-user-generic!</p>
        <p>Para concluir o cadastro no nosso sistema por favor clique no link abaixo</p>

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