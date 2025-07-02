import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserDto } from "./dto/user.create.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findUser(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async createUser(UserInfo: UserDto) {
    const existingUser = await this.findUser(UserInfo.email);
    if (existingUser) {
      throw new HttpException(
        "User already exists with this email",
        HttpStatus.CONFLICT
      );
    }
    const user = this.usersRepository.create({
      firstName: UserInfo.firstName,
      lastName: UserInfo.lastName,
      email: UserInfo.email,
      hashPassword: await this.hashPassword(UserInfo.password),
    });
    return this.usersRepository.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    // console.log("Comparing passwords");
    // console.log("Plain Password:", plainPassword);
    // console.log("Hashed Password:", hashedPassword);
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
