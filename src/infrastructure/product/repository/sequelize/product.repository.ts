import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository-interface";
import { Product } from "../../../../domain/product/entity/product";
import { ProductModel } from "../../../product/repository/sequelize/model/product.model";


export class ProductRepository implements ProductRepositoryInterface {
  private readonly productModel: typeof ProductModel;

  constructor() {
    this.productModel = ProductModel;
  }

  async save(product: Product): Promise<void> {
    await this.productModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async delete(product: Product): Promise<void> {
    const target = await this.productModel.findByPk(product.id);
    if (target) {
      await target.destroy();
    }
  }

  async update(product: Product): Promise<void> {
    const target = await this.productModel.findByPk(product.id);
    if (target) {
      target.name = product.name;
      target.price = product.price;
      await target.save();
    }
  }

  async find(id: string): Promise<Product> {
    const target = await this.productModel.findByPk(id);
    if (target) {
      return new Product(target.id, target.name, target.price);
    }
    throw new Error("Not Found");
  }

  async findAll(): Promise<Product[]> {
    const targets = await this.productModel.findAll();
    return targets.map((target) => {
      return new Product(target.id, target.name, target.price);
    });
  }
}