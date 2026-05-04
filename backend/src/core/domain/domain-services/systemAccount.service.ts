import { CreateSystemAccountDTO } from "../dtos/systemAccount.dto";
import { ISystemAccountRepository } from "../repositories/systemAccount.repository.interface";

export class SystemAccountService{
    constructor(private readonly systemAccountRepository: ISystemAccountRepository){};

    async createAccount(accountData: CreateSystemAccountDTO){
        
    }

}