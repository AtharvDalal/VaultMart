import { Category } from 'src/common/enums/category';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column()
  brand: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  color: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @Column()
  weight: string;

  @Column('date')
  release_date: Date;

  @Column()
  warranty: string;

  @Column()
  discount: string;
}
