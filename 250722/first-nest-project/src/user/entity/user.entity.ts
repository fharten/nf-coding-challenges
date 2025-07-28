import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class User {
  @PrimaryGeneratedColumn() // Marks 'id' as the primary key, and it auto-increments
  id: number;

  @Column({ length: 100, nullable: false }) // 'firstName' column, string, max 100 chars, not null
  firstName: string;

  @Column({ nullable: true }) // 'lastName' column, can be null
  lastName?: string; // `?` in TypeScript means the property is optional

  @Column({ unique: true, nullable: false }) // 'email' column, unique and not null
  email: string;
}
