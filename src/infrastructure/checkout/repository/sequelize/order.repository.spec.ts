
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/repository/sequelize/model/customer.model";
import { OrderItemModel } from "../../repository/sequelize/model/order-item.model";
import { OrderModel } from "../../repository/sequelize/model/order.model";
import { ProductModel } from "../../../product/repository/sequelize/model/product.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/addres";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { Product } from "../../../../domain/product/entity/product";
import { OrderRepository } from "./order.repository";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Order } from "../../../../domain/checkout/entity/order";


describe('OrderRepository', () => {
  let sequelize: Sequelize
  let customer: Customer
  let product: Product
  let orderItem: OrderItem
  let order: Order

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel, CustomerModel, OrderItemModel, OrderModel]);
    await sequelize.sync();

    customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 100, 'City 1', 'State 1', '123456')
    customer.changeAddress(address)

    product = new Product('1', 'Product 1', 10)
    
    orderItem = new OrderItem('1', product.name, product.price, product.id, 1)
    order = new Order('1', customer.id, [orderItem])

  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.save(customer)

    const productRepository = new ProductRepository()
    await productRepository.save(product)

    const order = new Order('1', customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.save(order)


    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toEqual({
      id: '1',
      customer_id: customer.id,
      total: 10,
      items: [{
        id: '1',
        order_id: order.id,
        product_id: orderItem.productId,
        quantity: orderItem.quantity,
        price: orderItem.price(),
        name: product.name,
      }]
    })
  });

  it('should delete an order', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.save(customer)

    const productRepository = new ProductRepository()
    await productRepository.save(product)

    const order = new Order('1', customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.save(order)

    await orderRepository.delete(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel).toBeNull()
  })

  it('should throw an error when order is not found for deleted', async () => {
    const orderRepository = new OrderRepository()
    await expect(orderRepository.delete(order)).rejects.toThrow('Order not found')
  })


  it('should find an order', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.save(customer)

    const productRepository = new ProductRepository()
    await productRepository.save(product)

    const orderRepository = new OrderRepository()
    await orderRepository.save(order)

    const orderFound = await orderRepository.find(order.id)
    expect(orderFound).toEqual(order)
  });

  it('should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository()
    await expect(orderRepository.find('1')).rejects.toThrow('Order not found')
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.save(customer)

    const productRepository = new ProductRepository()
    await productRepository.save(product)

    const orderRepository = new OrderRepository()
    await orderRepository.save(order)

    const orders = await orderRepository.findAll()
    expect(orders).toEqual([order])

  });


  it('should update an order', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.save(customer)

    const productRepository = new ProductRepository()
    await productRepository.save(product)

    const orderRepository = new OrderRepository()
    await orderRepository.save(order)


    const product2 = new Product('2', 'Product 2', 20)
    await productRepository.save(product2)


    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 2)
    order.addItem(orderItem2)
    await orderRepository.update(order)


    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });


    expect(orderModel?.toJSON()).toEqual({
      id: '1',
      customer_id: customer.id,
      total: 50,
      items: [{
        id: '1',
        order_id: order.id,
        product_id: orderItem.productId,
        quantity: orderItem.quantity,
        price: orderItem.price(),
        name: product.name,
      },
      {
        id: '2',
        order_id: order.id,
        product_id: orderItem2.productId,
        quantity: orderItem2.quantity,
        price: orderItem2.price(),
        name: product2.name,
      }]
    })
  });

  it('should throw an error when order is not found for update', async () => {
    const orderRepository = new OrderRepository()
    await expect(orderRepository.update(order)).rejects.toThrow('Order not found')
  })
})