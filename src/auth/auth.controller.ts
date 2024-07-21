import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('login')
	login(@Body() loginInfo: LoginDto) {
		try {
			return this.authService.login(loginInfo);
		} catch (error) {
			return error
		}
	}

	@Get('users')
	async getAll() {
		try {
			return await this.authService.retrieveLogins();
		} catch (error) {
			return error
		}
	}

	// @Get('google')
	// @UseGuards(GoogleGuard)
	// async googleAuth(@Req() req: any) {
	// 	// Initiates the Google OAuth2 login flow, nothing needed here since the guard handles it
	// }

	// @Get('google/callback')
	// @UseGuards(GoogleGuard)
	// async googleAuthRedirect(@Req() req: any, @Res() res: any) {
	// 	const user = await this.authService.validateUser(req.user);
	// 	const jwt = await this.authService.login(user);
	// 	res.cookie('jwt', jwt.access_token, { httpOnly: true }); // Set JWT as a cookie
	// 	return res.redirect('/'); // Redirect to the home page or a protected route
	// }
}