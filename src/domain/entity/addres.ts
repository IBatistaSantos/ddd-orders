
export class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;
  _state: string;
 

  constructor(street: string, number: number, city: string, state: string, zip: string){
    this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._number = number;
    this.validate();
  }


  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zip() {
    return this._zip;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }


  validate() {
    if (!this._street) {
      throw new Error('Street is required');
    }

    if (!this._city) {
      throw new Error('City is required');
    }

    if (!this._state) {
      throw new Error('State is required');
    }

    if (!this._zip) {
      throw new Error('Zip is required');
    }
  }

  toString() {
    return `${this._street} ${this._number}, ${this._city} ${this._state} ${this._zip}`;
  }
}