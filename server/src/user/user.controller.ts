import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { Public } from '~/common/decorators';
import { RequestWithUser } from '~/user/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  async getMe(@Req() req: RequestWithUser) {
    return this.userService.getMe(req.user.sub);
  }
}
