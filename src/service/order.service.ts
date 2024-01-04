import { Order } from "../entity/order"


export class OrderService {

  static total(orders: Order[]) {
    return orders.reduce((total, order) => {
      return total + order.total()
    }, 0)
  }
}