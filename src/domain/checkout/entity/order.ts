import { OrderItem } from "./order_item";

export class Order {
  private _id: string
  private _customerId: string
  private _total: number
  private _items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  getTotal() {
    return this._total;
  }

  get items() {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price(), 0);
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required');
    }

    if (!this._customerId) {
      throw new Error('Customer Id is required');
    }

    if (this._items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero');
    }
  }
}