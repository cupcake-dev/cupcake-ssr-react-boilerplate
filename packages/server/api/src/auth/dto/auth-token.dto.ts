import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensInterface } from '@cupcake/common';
import { MapFromSource } from 'class-mapper';

export class AuthTokenDto implements AuthTokensInterface {
  @ApiProperty()
  @MapFromSource((source: AuthTokensInterface) => source.accessToken)
  public accessToken: string;
}
