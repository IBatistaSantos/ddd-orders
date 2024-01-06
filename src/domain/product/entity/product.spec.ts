import { Product } from "./product";

describe('Product', () => {
  it('should be created', () => {
    const product = new Product('1', 'Product 1', 10);

    expect(product).toBeInstanceOf(Product);
  })

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 10);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  })

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  })
  
  it('should throw error when id is invalid', () => {
    expect(() => new Product('', 'Product 1', 10)).toThrow('Id is required');
  })

  it('should throw error when name is invalid', () => {
    expect(() => new Product('1', '', 10)).toThrow('Name is required');
  })

  it('should throw error when price is invalid', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrow('Price must be greater than zero');
  })
})