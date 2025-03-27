import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './users.service';
import { UserRole } from '@conidea/model';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_all_users' })
  async getAllUsers() {
    Logger.debug('Getting all users', UserController.name);
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'get_loggedIn' })
  async getLoggedIn() {
    Logger.debug('Getting logged in user', UserController.name);
    return this.userService.getLoggedIn();
  }

  @MessagePattern({ cmd: 'log_in' })
  async logIn({ id }: { id: string }) {
    Logger.debug(`Logging in User with ID ${id}`, UserController.name);
    return this.userService.logIn(id);
  }

  @MessagePattern({ cmd: 'switch_role' })
  async switchRole({ id, role }: { id: string; role: UserRole }) {
    Logger.debug(`Switching role for User with ID ${id}`, UserController.name);
    return this.userService.switchUserRole(id, role);
  }
}
