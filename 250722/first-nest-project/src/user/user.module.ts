import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entity/user.entity'; // Adjust path if your entity is elsewhere

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Makes the User Repository available
  providers: [UserService],
  exports: [UserService], // Export if other modules (like AppModule) need to use UsersService
})
export class UserModule {}
