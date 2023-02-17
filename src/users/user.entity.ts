import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id);
  }
}
