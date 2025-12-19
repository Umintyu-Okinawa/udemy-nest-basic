import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/jwtpayload';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, status } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          status,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    const { email, password } = credentialsDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: user.id,
        name: user.name,
        status: user.status,
      };
      const token = this.jwtService.sign(payload);
      return { accessToken: token };
    }
    throw new UnauthorizedException();
  }
}
