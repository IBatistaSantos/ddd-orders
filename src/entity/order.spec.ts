import { Order } from "./order";
import { OrderItem } from "./order_item";



describe('Order', () => {
  it('should be created', () => {
    const item1 = new OrderItem('1', 'Item 1', 10, "product1", 1);
    const item2 = new OrderItem('2', 'Item 2', 20, "product2", 2);
    
    const order = new Order('1', '1', [item1, item2]);

    expect(order).toBeInstanceOf(Order);
    expect(order.getTotal()).toBe(50);
  })

  it('should throw error when quantity is less or equal zero', () => {
    const item1 = new OrderItem('1', 'Item 1', 10, "product1", 0);
    const item2 = new OrderItem('2', 'Item 2', 20, "product2", 2);
    
    expect(() => new Order('1', '1', [item1, item2])).toThrow('Quantity must be greater than zero');
  })

  it('should throw error when id is invalid', () => {
    expect(() => new Order('', '1', [])).toThrow('Id is required');
  })

  it('should throw error when customerId is invalid', () => {
    expect(() => new Order('1', '', [])).toThrow('Customer Id is required');
  })

  it('should throw error when items is invalid', () => {
    expect(() => new Order('1', '1', [])).toThrow('Order must have at least one item');
  })
})