import { HttpException } from "@nestjs/common";

export const CustomError = (response: string, status: number): HttpException => {
  throw new HttpException(response, status)
}