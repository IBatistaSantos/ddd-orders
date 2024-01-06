import { Address } from "./addres";


describe('Address', () => {
  it('should be created', () => {
    const address = new Address('Street 1', 1, 'City 1', 'State 1','Zip 1');
    expect(address).toBeInstanceOf(Address);
  })

  it('should be created with toString', () => {
    const address = new Address('Street 1', 1, 'City 1', 'State 1','Zip 1');
    expect(address.toString()).toBe('Street 1 1, City 1 State 1 Zip 1');
  })

  it('should throw error when street is invalid', () => {
    expect(() => new Address('', 1, 'City 1', 'State 1','Zip 1')).toThrow('Street is required');
  })

  it('should throw error when city is invalid', () => {
    expect(() => new Address('Street 1', 1, '', 'State 1','Zip 1')).toThrow('City is required');
  })

  it('should throw error when state is invalid', () => {
    expect(() => new Address('Street 1', 1, 'City 1', '','Zip 1')).toThrow('State is required');
  })

  it('should throw error when zip is invalid', () => {
    expect(() => new Address('Street 1', 1, 'City 1', 'State 1','')).toThrow('Zip is required');
  })
})