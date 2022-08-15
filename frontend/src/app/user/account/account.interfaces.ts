export interface Account {
  orders?: Order[];
  whishlist?: WhishlistItem[];
  addressBook?: AddressBook[];
  Profile?: Profile;
  cart?: CartItem[];
}

export interface Order {}

export interface WhishlistItem {
  date: string;
  product: any;
  quantity?: number;
  user: string;
  id?: string;
  _id?: string;
}

export interface AddressBook {}

export interface Profile {}

export interface CartItem {
  date: string;
  product: any;
  quantity: number;
  user: string;
  _id?: string;
}
