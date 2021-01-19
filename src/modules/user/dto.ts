import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class UserUpdateDto {
  @ApiProperty()
  login: string;

  @ApiProperty({
    required: false
  })
  password?: string;

  @ApiProperty({
    required: false
  })
  firstName?: string;

  @ApiProperty({
    required: false
  })
  lastName?: string;
}
