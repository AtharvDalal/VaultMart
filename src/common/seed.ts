// import { OnModuleInit } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Category } from 'src/products/entities/category.enitiy';
// import { Repository } from 'typeorm';

// export class CategorySeeder implements OnModuleInit {
//   constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//   ) {}

//   async onModuleInit() {
//     const categories = ['Electronics', 'Clothing', 'Groceries'];

//     for (const name of categories) {
//       const exist = await this.categoryRepository.findOne({ where: { name } });
//       if (!exist) {
//         const category = this.categoryRepository.create({ name });
//         await this.categoryRepository.save(category);
//       }
//     }

//     console.log('Categories seeded SuccessFully');
//   }
// }
