import { Customer } from "../../domain/entity/customer";
import { RepositoryInterface } from "./repository-interface";

export interface CustomerRepositoryInterface 
  extends RepositoryInterface<Customer> {}