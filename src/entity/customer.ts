import { Address } from "./addres";


export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();

  }

   isActive () {
    return this._active;
  }

  get name() {
    return this._name;
  }

  changeName(newName: string) {
    this._name = newName;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.activate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory for activating customer');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  validate() {
    if (this._name.length < 5) {
      throw new Error('Name must be at least 5 characters long');
    }

    if (!this._id) {
      throw new Error('Id is required');
    }
  }
}