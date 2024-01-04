import { Product } from "entity/product";



export class ProductService {
  static increasePrice(products: Product[], percentage: number) {
    products.forEach((product) => {
      const newPrice = product.price * (1 + percentage / 100);
      product.changePrice(newPrice);
    });
  }
}