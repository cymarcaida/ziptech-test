import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "1df7ca444b37b2cf9d286e5ffc1e5c81ab448cc7a8ef0e2651e3ca8b27cc5ee609be363cb9588cbd7bf7887e41e8890414a85cbda732db961b0950fd85ed0f4a",
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
