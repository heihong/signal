export interface TripI {
  id?: number;
  nature: string;
  amount: number;
  comment?: string;
  purchasedOn: string;
  updatedAt?: Date;
  distance: number;
  invites?: number;
}

export interface RestaurantI {
  id?: number;
  nature: string;
  amount: number;
  comment?: string;
  purchasedOn: string;
  updatedAt?: Date;
  distance?: number;
  invites: number;
}

export interface ExpensesI {
  items: RestaurantI[] | TripI[];
  count: number;
}
