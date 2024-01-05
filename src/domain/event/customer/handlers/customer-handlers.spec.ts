import { EventDispatcher } from "../../../../domain/event/@shared/event-dispatcher";
import { DisplayConsoleLogWhenCustomerIsCreatedHandler } from "./display-console-log-when-customer-is-created.handler";
import { CustomerCreatedEvent } from "../customer-created.event";
import { AddressUpdatedEvent } from "../address-updated.event";
import { SendMailWhenAddressUpdatedCustomerHandler } from "../handlers/send-mail-when-address-updated-customer.handler";
import { Customer } from "../../../../domain/entity/customer";
import { Address } from "../../../../domain/entity/addres";

describe('Customer events tests', () => {})

it ('should notify handlers for customer context', () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new DisplayConsoleLogWhenCustomerIsCreatedHandler();
  const eventHandler2 = new DisplayConsoleLogWhenCustomerIsCreatedHandler();

  eventDispatcher.register(CustomerCreatedEvent.name, eventHandler);
  eventDispatcher.register(CustomerCreatedEvent.name, eventHandler2);

  const notifySpy = jest.spyOn(eventHandler, "handle");
  const notifySpy2 = jest.spyOn(eventHandler2, "handle");

  const customerCreatedEvent = new CustomerCreatedEvent({
    id: "1",
    name: "Product 1",
  });

  eventDispatcher.notify(customerCreatedEvent);
  expect(notifySpy).toHaveBeenCalledTimes(1);
  expect(notifySpy2).toHaveBeenCalledTimes(1);
})

it ('should notify handlers when address is updated', () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new DisplayConsoleLogWhenCustomerIsCreatedHandler();

  eventDispatcher.register(AddressUpdatedEvent.name, eventHandler);

  const notifySpy = jest.spyOn(eventHandler, "handle");

  const customer = new Customer('124', 'Israel Batista')
  const address = new Address('Rua 1', 123, 'Cidade 1', 'Estado 1','12345678')
  customer.changeAddress(address)

  const addressUpdatedEvent = new AddressUpdatedEvent({
    id: customer.id,
    name: customer.name,
    address: customer.address
  });

  eventDispatcher.notify(addressUpdatedEvent);
  expect(notifySpy).toHaveBeenCalledTimes(1);

})

