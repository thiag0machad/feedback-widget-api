import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '4f81dcd2a7204b',
    pass: '8176dcbfbf630d',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Thiago Machado <contatocostathiago@gmail.com',
      subject: subject,
      html: body,
    })
  }
}
