import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserCreateDto } from 'src/modules/user/dto';
import { Admin } from '../../admin/entities/admin.entity';
import { User } from '../../user/entities/user.entity';


@Injectable()
export class AuthService {
  private adminRepository: Repository<Admin>;
  private userRepository: Repository<User>;

  constructor(
    private jwtService: JwtService,
    private connection: Connection,
  ) {
    this.adminRepository = this.connection.getRepository(Admin);
    this.userRepository = this.connection.getRepository(User);
  }

  async validateUser(login: string, pass: string): Promise<Admin | User | null> {

    //проверяем наличие такого логина в бд в табл юзер и админ
    const user: Admin | User = await this.adminRepository.findOne({ where: { login } })
      ? await this.adminRepository.findOne({ where: { login } }) as Admin
      : await this.userRepository.findOne({ where: { login } })
        ? await this.userRepository.findOne({ where: { login } }) as User
        : null;

    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...secureUser } = user;
      return secureUser;
    }

    return null;
  }

  async login(user: Admin | User) {
    const payload = { id: user.id, isAdmin: user.isAdmin };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(newUser: UserCreateDto) {
    const checkDuplicates = await this.userRepository.findOne({ where: { login: newUser.login } });
    if (checkDuplicates) {
      throw new UnauthorizedException('Пользователь с таким логином уже существует!');
    } else {
      const nu = this.userRepository.create({
        login: newUser.login,
        passwordHash: await bcrypt.hash(newUser.password, 10),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });

      await this.userRepository.insert(nu);
      return {
        message: 'Успех! Ваш аккаунт создан, войдите используя новый логин и пароль.'
      }
    }
  }
}