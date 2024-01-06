import { CustomerModel } from "../../repository/sequelize/model/customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { RepositoryInterface } from "../../../../domain/@shared/repository/repository-interface";
import { Address } from "../../../../domain/customer/value-object/addres";


export class CustomerRepository implements RepositoryInterface<Customer> {
  private readonly customerModel: typeof CustomerModel;

  constructor() {
    this.customerModel = CustomerModel;
  }

  async save(entity: Customer): Promise<void> {
    await this.customerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })    
  }

  async delete(entity: Customer): Promise<void> {
    await this.customerModel.destroy({
      where: {
        id: entity.id
      }
    })
  }
  
  async update(entity: Customer): Promise<void> {
   const target = await this.customerModel.findByPk(entity.id);

    if (target) {
      target.name = entity.name;
      target.street = entity.address.street;
      target.number = entity.address.number;
      target.zipcode = entity.address.zip;
      target.city = entity.address.city;
      target.state = entity.address.state;
      target.active = entity.isActive();
      target.rewardPoints = entity.rewardPoints;
      await target.save();
    }
  }

  async find(id: string): Promise<Customer> {
    const target = await this.customerModel.findByPk(id);
    if (target) {
      const customer = new Customer(target.id, target.name);
      const address = new Address(target.street, target.number, target.city, target.state, target.zipcode);
      customer.changeAddress(address);
      customer.addRewardPoints(target.rewardPoints);
      return customer;
    }

    throw new Error("Not Found");
  }

  async findAll(): Promise<Customer[]> {
    const targets = await this.customerModel.findAll();

    return targets.map((target) => {
      const customer = new Customer(target.id, target.name);
      const address = new Address(target.street, target.number, target.city, target.state, target.zipcode);
      customer.changeAddress(address);
      customer.addRewardPoints(target.rewardPoints);
      return customer;
    });
  }
}

