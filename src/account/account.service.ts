import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../firebase/account.repository';
import { LoginDto } from 'src/auth/login.dto';

export type User = any;

@Injectable()
export class AccountService {
	constructor(private accountRepository: AccountRepository) { }

	async retrieveAccountForLogin(loginInfo: LoginDto) {
		try {
			const users = await this.accountRepository.findByUsername(loginInfo.username)
			const loginUser = users[0]
			if (loginUser.password != loginInfo.password) {
				throw new NotFoundException(`Password is wrong!`);
			}
			return loginUser
		} catch (error) {
			throw error;
		}
	}

	retrieveUsers() {
		return this.accountRepository.findAll();
	}
}