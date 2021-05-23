import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import {  ResponseJwt } from './jwt/jwt.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }


    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<ResponseJwt> {
        const data = await this.userRepository.signIn(authCredentialsDto);

        const payload = { data };
        const token = await this.jwtService.sign(payload)

        const response: ResponseJwt = {data : data, token: token}
        return response;
    }


}
