import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository-interface";
import { CustomerModel } from "../../infrastructure/database/sequelize/model/customer.model";
import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/addres";


describe('CustomerRepository', () => {

  let sequelize: Sequelize;
  let repository: CustomerRepositoryInterface;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();

    repository = new CustomerRepository();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'State 1', '12345');
    customer.changeAddress(address);

    await repository.save(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel?.toJSON()).toEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      state: address.state,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  });

  it('should update a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'State 1', '12345');
    customer.changeAddress(address);
    await repository.save(customer);

    customer.changeName('Customer 2');
    const address2 = new Address('Street 2', 2, 'City 2', 'State 2', '54321');
    customer.changeAddress(address2);
    customer.addRewardPoints(10);
    await repository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel?.toJSON()).toEqual({
      id: customer.id,
      name: 'Customer 2',
      street: 'Street 2',
      number: address2.number,
      zipcode: address2.zip,
      city: address2.city,
      state: address2.state,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  });

  it('should delete a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'State 1', '12345');
    customer.changeAddress(address);
    await repository.save(customer);

    await repository.delete(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel).toBeNull();
  });

  it('should find a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'State 1', '12345');
    customer.changeAddress(address);
    await repository.save(customer);

    const foundCustomer = await repository.find(customer.id);

    expect(foundCustomer).toEqual(customer);
  });

  it('should not find a customer', async () => {
    await expect(repository.find('1')).rejects.toThrow();
  });

  it('should find all customers', async () => {
    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('Street 1', 1, 'City 1', 'State 1', '12345');
    customer1.changeAddress(address1);
    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'City 2', 'State 2', '54321');
    customer2.changeAddress(address2);
    await repository.save(customer1);
    await repository.save(customer2);

    const customers = await repository.findAll();

    expect(customers).toEqual([customer1, customer2]);
  });


})