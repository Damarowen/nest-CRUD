import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth.credentials.dto";
import { UserEntity } from '../entity/auth.entity'



@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        //* extract input
        const { username, password } = authCredentialsDto;

        //* set user
        const user = new UserEntity();
        user.username = username;
        user.password = password

        try {
            await user.save();
            return user;
        } catch (err) {
            console.log(err)
            //* 23505 duplicate error
            if (err.code === 'ER_DUP_ENTRY') {

                throw new ConflictException('Username Already Exist')
            } else {
                throw new InternalServerErrorException();
            }
        }


    }

}