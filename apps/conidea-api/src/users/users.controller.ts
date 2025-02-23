import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { UserRole } from '@conidea/model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('/current')
  getLoggedIn() {
    return this.userService.getLoggedIn();
  }

  @Put(':id/login')
  login(@Param('id') id: string, @Body('test') test: string) {
    Logger.log(`Logging in User with ID ${id} ${test}`, Controller.name);
    return this.userService.logIn(id);
  }

  @Put(':id/role')
  switchRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return this.userService.switchUserRole(id, role);
  }
}
