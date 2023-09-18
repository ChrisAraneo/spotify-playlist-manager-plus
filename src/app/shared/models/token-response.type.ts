import { TokenType } from './token-type.enum';

export type TokenResponse = {
  access_token: string;
  expired_in: number;
  token_type: TokenType;
};
