import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';


class ResetPasswordController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const ResetPassword = new ResetPasswordService();

    await ResetPassword.execute({
      token,
      password
    });

    return res.status(204).json()
  }
}

export default ResetPasswordController;
