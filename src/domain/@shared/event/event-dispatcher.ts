import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandleInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";



export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandleInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandleInterface[] } {
    return this.eventHandlers;
  }
  
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler: EventHandleInterface<EventInterface>) => {
        eventHandler.handle(event);
      });
    }
  }
  
  register(eventName: string, eventHandler: EventHandleInterface<EventInterface>): void {
    if(!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: EventHandleInterface<EventInterface>): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }
  
  unregisterAll(): void {
    this.eventHandlers = {};
  }

}