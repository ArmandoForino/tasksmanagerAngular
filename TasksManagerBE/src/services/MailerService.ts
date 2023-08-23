import nodemailer from 'nodemailer';
import { CONFIGS as mailerConfig } from '../configs/mailerConfig';

export class MailerService {

    private static instance: MailerService;
    private transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: mailerConfig.host,
            port: mailerConfig.port,
            auth: {
                user: mailerConfig.auth.user,
                pass: mailerConfig.auth.pass
            }
        });
    }

    public static getInstance = () => {
        if(!MailerService.instance) {
            MailerService.instance = new MailerService();
        }
        return MailerService.instance;
    }

    sendEmail = async(to:string, subject:string, html:string, from:string= mailerConfig.adminMail) => {
        try {
            const mail = await this.transporter?.sendMail({
                from, to, subject, html
            })
        } catch(error) {
            console.log(`Errore invio mail`)
        }
    }

}