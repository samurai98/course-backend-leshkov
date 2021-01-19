import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  passwordHash?: string;

  @Column({ nullable: false })
  nickName: string;

  @Column({ default: true })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}