import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// partial type means that all fields are optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
