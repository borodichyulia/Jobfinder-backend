import * as nodemailer from 'nodemailer';

export class MailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'jobfinder01@mail.ru',
        pass: 'MDarC2caUxd9u3XRKg1D', //password is wrong
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'jobfinder01@mail.ru',
      to: to,
      subject: 'Активация аккаунта на Job Finder',
      text: '',
      html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
}
