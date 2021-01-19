import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwtAdmin') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    if(payload.isAdmin) {
      const { iat, exp, isAdmin, ...res } = payload;
      return res;
    } else {
      throw new UnauthorizedException('Доступ только для администраторов!');
    }
  }
}