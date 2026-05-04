import { Request, Response } from 'express';
import { RegisterRecepcionistUseCase } from '../../../core/usecases/recepcionist/register-recepcionist.usecase';
import { CreateReceptionistDTO } from '../../../core/domain/dtos/receptionist.dto';
import { env } from '../../../infraestructure/config/environment';

export class ReceptionistController {
  constructor(
    private registerReceptionistUseCase: RegisterRecepcionistUseCase,
  ) {}

  async registerReceptionist(
    req: Request<CreateReceptionistDTO>,
    res: Response,
  ) {
    const data = req.body;
    const responseData = await this.registerReceptionistUseCase.execute(data);

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          Number(env.REFRESH_EXPIRES?.replace('d', '')) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      //   secure: true,
    };

    res.cookie('refresh', responseData.refreshToken, cookieOptions);

    res.status(200).json({
      accessToken: responseData.accessToken,
    });
  }
}
