import { EventHandleInterface } from "../../../@shared/event/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";



export class SendEmailWhenProductIsCreatedHandler implements EventHandleInterface<ProductCreatedEvent> {
  
  handle(event: ProductCreatedEvent): void {
   console.log(`SendEmailWhenProductIsCreatedHandler: ${JSON.stringify(event)}`);
  }
}