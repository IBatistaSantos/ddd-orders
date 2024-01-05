import { EventHandleInterface } from "../../../../domain/event/@shared/event-handler.interface";
import { AddressUpdatedEvent } from "../address-updated.event";


export class SendMailWhenAddressUpdatedCustomerHandler implements EventHandleInterface<AddressUpdatedEvent> {
  handle(event: AddressUpdatedEvent): void {
   const { eventData } = event
   console.log(`Endereço do cliente: ${eventData.id}, ${eventData.nome} alterado para: ${eventData.address}`)
  }
}