import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Purchase } from './purchase .enitiy';
import { Category } from './category.enitiy';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
