import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 'ERROR' })
  firstName: string;

  @Column({ default: 'ERROR LastName' })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}