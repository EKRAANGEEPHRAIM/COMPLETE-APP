import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUser: CreateUserDto) {
    const user = await this.userService.create(createUser);
    if (!user) {
      throw new BadRequestException('User creation failed');
    }

    return user;
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query('role') role?: string) {
    const user = await this.userService.findAll(role);
    if (!user) {
      throw new NotFoundException('Users not found');
    }

    return user;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.remove(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
