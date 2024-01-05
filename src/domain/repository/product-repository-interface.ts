import { Product } from "../../domain/entity/product";
import { RepositoryInterface } from "./repository-interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}