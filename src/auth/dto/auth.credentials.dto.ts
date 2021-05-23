import {  IsNotEmpty, IsString} from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @IsNotEmpty({ message: 'The username is required' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'The password is required' })
    password: string;

}


