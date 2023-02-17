import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  //providers - thingsThatCanBeUsedAsDependenciesForOtherClasses
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
