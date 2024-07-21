import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly accountService: AccountService,
		private readonly jwtService: JwtService) { }

	async login(loginInfo: LoginDto) {
		try {
			const user = await this.accountService.retrieveAccountForLogin(loginInfo)
			const payload = { username: user.username, sub: user.id };
			const generatedToken = this.jwtService.sign(payload);
			return {
				access_token: generatedToken,
			};
		} catch (error) {
			throw error
		}
	}

	retrieveLogins() {
    return this.accountService.retrieveUsers();
  }
}