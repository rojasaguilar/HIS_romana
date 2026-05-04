import { Request, Response } from 'express';
import { LoginUseCase } from '../../../core/usecases/systemAccount/login.usecase';
import { env } from '../../../infraestructure/config/environment';
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(
    req: Request<{ email: string; password: string }>,
    res: Response,
  ) {
    const { email, password } = req.body;

    const { refreshToken, accessToken } = await this.loginUseCase.execute(
      email,
      password,
    );

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          Number(env.REFRESH_EXPIRES?.replace('d', '')) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      //   secure: true,
    };

    res.cookie('refresh', refreshToken, cookieOptions);

    res.status(200).json({
      accessToken: accessToken,
    });
  }
}
