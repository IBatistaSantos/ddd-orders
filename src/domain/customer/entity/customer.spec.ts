import { Address } from "../value-object/addres";
import { Customer } from "./customer";



describe('Customer', () => {
  it('should be created', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.isActive()).toBeFalsy();
  })

  it('should change name', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  })

  it('should be activated', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street 1', 1, 'City 1', 'State 1','Zip 1');

    customer.changeAddress(address);
    expect(customer.isActive()).toBeTruthy();
  })

  it('should be deactivated', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street 1', 1, 'City 1', 'State 1','Zip 1');
    customer.changeAddress(address);
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(200);
    expect(customer.rewardPoints).toBe(300);
  })



  it('should throw error when name is invalid', () => {
    expect(() => new Customer('1', 'John')).toThrow('Name must be at least 5 characters long');
  })

  it('should throw error when id is invalid', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('Id is required');
  })

  it('should throw error when activate customer without address', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.activate()).toThrow('Address is mandatory for activating customer');
  })
});