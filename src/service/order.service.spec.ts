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
})