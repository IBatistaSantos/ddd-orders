import { Product } from "../../../../domain/product/entity/product";
import { ProductModel } from "../../repository/sequelize//model/product.model";
import { Sequelize } from "sequelize-typescript";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository-interface";
import { ProductRepository } from "./product.repository";


describe('ProductRepository', () => {

  let sequelize: Sequelize;
  let repository: ProductRepositoryInterface;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    repository = new ProductRepository();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const product = new Product('1', 'Product 1', 10);

    await repository.save(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel?.toJSON()).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  });

  it('should update a product', async () => {
    const product = new Product('1', 'Product 1', 10);
    await repository.save(product);

   product.changeName('Product 2');
    product.changePrice(20);
    await repository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel?.toJSON()).toEqual({
      id: product.id,
      name: 'Product 2',
      price: 20
    })
  });

  it('should delete a product', async () => {
    const product = new Product('1', 'Product 1', 10);
    await repository.save(product);

    await repository.delete(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel).toBeNull();
  });

  it('should find a product', async () => {
    const product = new Product('1', 'Product 1', 10);
    await repository.save(product);

    const foundProduct = await repository.find(product.id);

    expect(foundProduct).toEqual(product);
  });

  it('should not find a product', async () => {
    await expect(repository.find('1')).rejects.toThrow();
  });

  it('should find all products', async () => {
    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);
    await repository.save(product1);
    await repository.save(product2);

    const products = await repository.findAll();

    expect(products).toEqual([product1, product2]);
  });
});