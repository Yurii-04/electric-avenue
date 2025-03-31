import { Controller, Get } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { GetCurrentUserId, Public } from '~/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  async getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }
}
