import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/getUser.decorator';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserEntity } from './entity/user.entity';
import { ResponseJwt } from './jwt/jwt.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ResponseJwt> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:UserEntity) {
        console.log(user)
    }

}
