import { Category } from 'src/common/enums/category';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productname: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: Category })
  category: Category;
}
