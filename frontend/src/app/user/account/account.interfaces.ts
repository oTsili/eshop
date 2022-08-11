import { Product } from '../product/product.interface';

export interface Account {
  orders: Order[];
  whishlist: WhishlistItem[];
  addressBook: AddressBook[];
  Profile: Profile;
}

export interface Order {}

export interface WhishlistItem {
  date: string;
  product: Product;
  quantity: number;
}

export interface AddressBook {}

export interface Profile {}
