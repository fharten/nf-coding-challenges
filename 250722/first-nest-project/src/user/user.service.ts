import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity'; // Adjust path

@Injectable()
export class UserService {
  constructor(
    // Inject TypeORM's Repository for the User entity
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user); // Creates a new entity instance (not yet saved to DB)
    return this.usersRepository.save(newUser); // Saves the instance to the database
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, user); // Updates by ID directly
    return this.usersRepository.findOne({ where: { id } }); // Returns the updated user
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id); // Deletes by ID
  }
}
