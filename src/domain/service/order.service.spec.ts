import { Customer } from "../entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"
import { OrderService } from "./order.service"



describe('OrderService', () => {
  it('should get total of all orders', () => {
    const oderItem = new OrderItem('i1', 'Item 1', 100, 'productId', 1)
    const oderItem2 = new OrderItem('i2', 'Item 2', 200, 'productId', 2)

    const order = new Order('o1', 'customerId',  [oderItem])
    const order2 = new Order('o2', 'customerId',  [oderItem2])

    const total = OrderService.total([order, order2])

    expect(total).toBe(500)
  })

  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1')
    const oderItem = new OrderItem('i2', 'Item 2', 200, 'productId', 2)

    const order = OrderService.placeOrder(customer, [oderItem])

    expect(customer.rewardPoints).toBe(200)
    expect(order.total()).toBe(400)
  })

  it('should throw error when place an order without items', () => {
    const customer = new Customer('c1', 'Customer 1')

    expect(() => OrderService.placeOrder(customer, [])).toThrow('Order must have at least one item')
  })
})