import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_all_users' })
  async getAllUsers() {
    Logger.debug('Getting all users', UserController.name);
    return this.userService.findAll();
  }
}
