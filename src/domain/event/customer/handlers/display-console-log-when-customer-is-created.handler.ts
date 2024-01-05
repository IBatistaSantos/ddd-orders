import { EventHandleInterface } from "../../../../domain/event/@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";


export class DisplayConsoleLogWhenCustomerIsCreatedHandler implements EventHandleInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}