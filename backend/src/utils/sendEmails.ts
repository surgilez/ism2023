import { tokens } from '@config/env';
import { IAuthConfig } from '@interfaces/IConfig';
import { AES, enc } from 'crypto-js';
import prisma from 'database';
import { createTransport, SendMailOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface IAttachment {
  filename: string;
  content?: Buffer | string;
  encoding?: string;
}

interface IPropsMailOptions {
  to: string;
  txt?: string;
  url?: string;
  title: string;
  content: string;
  attachments?: IAttachment[];
  from?: string;
}

interface IContact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const configSendEmail = async (): Promise<SMTPTransport.Options> => {
  const config = await prisma.config.findFirst();
  if (config === null) throw new Error('No se pudo obtener la configuración de correo');
  const { user, pass } = config.auth as unknown as IAuthConfig;
  return {
    host: config?.host,
    secure: config?.secure,
    port: Number(config?.port),
    auth: { user, pass: AES.decrypt(pass, tokens.accessToken).toString(enc.Utf8) },
  };
};

const mailOptions = ({ to, title, txt, content, attachments, from }: IPropsMailOptions): SendMailOptions => {
  const options: SendMailOptions = {
    from: {
      name: 'servicio automático',
      address: from || '',
    },
    to,
    subject: txt,
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <div style="display:flex;align-items: center;">
      <img src="https://portal.internationalsm.com/images/logo.png" alt="logo" style="width: 2rem; height:1.25rem; margin-right:0.75rem">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">International ISM - ${title}</h2>
    </div>
    ${content}
    </div>
  `,
    attachments,
  };
  return options;
};

export const sendEmailForgotPassword = async (to: string, url: string, txt: string): Promise<unknown> => {
  try {
    const config = await configSendEmail();
    const transport = createTransport({ ...config });
    const options = mailOptions({
      title: 'Recuperación de contraseña',
      content: `<h3>¿Olvidaste tu contraseña?</h3><p>Recibimos una solicitud para restablecer la contraseña de su cuenta.</p><p>Para restablecer su contraseña, haga clic en el botón de abajo.</p> ${txt && url
        ? `<a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        <p>O copie y pegue la URL en su navegador</p>
        <div>${url}</div>`
        : ''
        }`,
      to,
      txt,
      from: config.auth?.user,
    });

    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    const { message } = error as Error;
    throw Error(message);
  }
};

export const sendVoucher = async (to: string, attachments: IAttachment[]): Promise<unknown> => {
  try {
    const config = await configSendEmail();
    const transport = createTransport({ ...config });
    const options = mailOptions({
      title: 'Envío de voucher',
      content: `<h3>Comprobante de artículos comprados</h3><p>Aquí se adjunta todos los vouchers de los artículos comprados</p>`,
      to,
      txt: 'Envío de voucher de Internacional ISM',
      attachments,
      from: config.auth?.user,
    });
    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    const { message } = error as Error;
    throw Error(message);
  }
};

export const sendContact = async (data: IContact): Promise<unknown> => {
  try {
    const config = await configSendEmail();
    const transport = createTransport({ ...config });
    const { user } = config.auth as { user: string };
    const options = mailOptions({
      title: 'Contactarse',
      content: `
      <h3>¡Hay una persona que desea contactarse con nosotros!</h3>
      <h4>Datos para ponerse en contacto con la persona</h4>
      <p>
      El nombre es: ${data.name}
      <br/>
      El correo electrónico es: ${data.email}
      <br/>
      El numero de teléfono es: ${data.phone}
      <br/>
      El mensaje que ha dejado ha sido el siguiente: 
      </p>
      <p>" ${data.message} "</p>`,
      to: user,
      txt: 'Alguien quiere contactarse con nosotros',
      from: user,
    });

    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    const { message } = error as Error;
    throw Error(message);
  }
};

export const sendEmailCuenta = async (to: string, url: string, txt: string, contrasenia:String): Promise<unknown> => {
  try {
    const config = await configSendEmail();
    const transport = createTransport({ ...config });
    const options = mailOptions({
      title: 'Cuenta creada con exito',
      content: `<h3>Tu cuenta ha sido creada con exito</h3><p>Se creo una contraseña temporal.</p><p>Por favor cambia tu contraseña para evitar futuros inconvenientes.</p>
        <br/> 
        <p href=style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Usuario: ${to}</p>
        <p href=style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Contaseña: ${contrasenia}</p>
        <br/> 
        `,
      to,
      txt,
      from: config.auth?.user,
    });

    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    const { message } = error as Error;
    throw Error(message);
  }
};
