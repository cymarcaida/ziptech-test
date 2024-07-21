import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;
}