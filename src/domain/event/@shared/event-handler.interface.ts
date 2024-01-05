import { EventInterface } from "./event.interface";


export interface EventHandleInterface<T extends EventInterface=EventInterface> {
  handle(event: T): void
}