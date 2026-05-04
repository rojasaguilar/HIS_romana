import { SystemAccount } from "../../../../core/domain/entities/systemAccout.entity";
import { ISystemAccountRepository } from "../../../../core/domain/repositories/systemAccount.repository.interface";

export class SystemAccountRepository implements ISystemAccountRepository{
    save(account: SystemAccount): Promise<SystemAccount> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<SystemAccount | null> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<SystemAccount | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<SystemAccount[]> {
        throw new Error("Method not implemented.");
    }
}