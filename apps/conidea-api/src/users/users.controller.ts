import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}
