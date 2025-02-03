import { Exclude } from 'class-transformer';
import { Purchase } from 'src/products/entities/purchase .enitiy';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  phoneno: string;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
