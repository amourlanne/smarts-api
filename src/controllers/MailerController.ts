import { Inject } from 'typedi';
import { MailerService } from '../service/MailerService';
import { Authorized, Body, JsonController, Post, Req, Res } from 'routing-controllers';
import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';

@JsonController()
export class MailerController {
  @Inject()
  private mailerService: MailerService;

  @Post("/send-email")
  public async httpPost(@Req() request: Request, @Res() response: Response)  {

    let mailOptions = {
      template: 'reset-password',
      message: {
        from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
        to: 'forget-password@gmail.com',
      },
      locals: {
        userName:"alexis.mourlanne",
        hash: "ssdjkbfjhedkjdbkjdbudkj;bcnk;"
      }
    };

    return this.mailerService.sendMail(mailOptions)
  }
}
