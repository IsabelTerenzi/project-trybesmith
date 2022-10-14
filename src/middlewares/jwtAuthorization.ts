import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Payload } from '../interfaces/userInterface';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const createToken = (payload: Payload): string => {
  const token = jwt.sign(payload, 'secret', jwtConfig as SignOptions);
  return token;
};

export const authenticateToken = (token: string): JwtPayload => {
  const tok = jwt.verify(token, 'secret');
  return tok as JwtPayload;
};