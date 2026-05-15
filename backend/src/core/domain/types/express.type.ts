import { UserPayloadDTO } from "../dtos/systemAccount.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayloadDTO;
    }
  }
}