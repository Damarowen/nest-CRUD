import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth.credentials.dto";
import { UserEntity } from '../entity/user.entity'
import * as bcrypt from 'bcrypt'


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    async signUp(authCredentialsDto: AuthCredentialsDto) {


        try {
            //* extract input
            const { username, password } = authCredentialsDto;


            //* set hash and salt
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);

            //* set user
            const user = new UserEntity();
            user.username = username;
            user.password = bcryptPassword;
            await user.save();
            return user;

        } catch (err) {
            console.log(err)
            
            //* if username already been used
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username Already Exist')
            } else {
                throw new InternalServerErrorException();
            }
        }


    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        //* find user in db
        const user = await this.findOne({ username });

        //* if user not found
        if (!user) {
            throw new BadRequestException(`${username} is not found `);
        }

        //* check password 

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        //* if password not match
        if (!validPassword) {
            throw new BadRequestException(`${password} is an invalid password `);
        }
        return user;
    }

  
}