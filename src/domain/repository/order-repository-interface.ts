import { Order } from "../../domain/entity/order";
import { RepositoryInterface } from "./repository-interface";


export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}