import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
