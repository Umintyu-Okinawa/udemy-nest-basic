import { UserStatus } from "@prisma/client";

export type JwtPayload = {
  sub: string;
  name: string;
  status: UserStatus;
};