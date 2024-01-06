import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepositoryInterface } from "./../../../../domain/checkout/repository/order-repository-interface";
import { OrderModel } from "./../../../checkout/repository/sequelize/model/order.model";
import { OrderItemModel } from "./../../../checkout/repository/sequelize/model/order-item.model";
import { OrderItem } from "./../../../../domain/checkout/entity/order_item";


export class OrderRepository implements OrderRepositoryInterface {
  private readonly orderModel: typeof OrderModel;
  private readonly orderItemModel: typeof OrderItemModel;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }

  async save(entity: Order): Promise<void> {
    await this.orderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price(),
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async delete(entity: Order): Promise<void> {
    const order = await this.orderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
  }

  async update(entity: Order): Promise<void> {
    const order = await this.orderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await Promise.all(order.items.map(async (item) => {
      await item.destroy();
    }));

    await order.update({
      customer_id: entity.customerId,
      total: entity.total(),
    })

    entity.items.forEach(async (item) => {
      await this.orderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price(),
        product_id: item.productId,
        quantity: item.quantity,
        order_id: order.id,
      });
    })

    await order.save();

  }

  async find(id: string): Promise<Order> {
    const target = await this.orderModel.findOne({
      where: { id },
      include: ["items"]
    })

    if (!target) {
      throw new Error("Order not found");
    }

    const items = target.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    return new Order(target.id, target.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const targets = await this.orderModel.findAll({
      include: ["items"]
    });
    
    return targets.map((target) => {
      const items = target.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
      return new Order(target.id, target.customer_id, items)
    });
  }

}