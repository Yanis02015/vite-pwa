// Code generated by tygo. DO NOT EDIT.
export type Status = 'valid' | 'invalid'
export type Role = 'admin' | 'manager' |'cashier' | 'product-manager'

//////////
// source: Company.go

export interface Company {
  ID: string /* uuid */;
  Email: string;
  Roles: Role[];
  Name: string;
  Country: string;
  Firstname: string;
  Lastname: string;
  CreatedAt: string /* RFC3339 */;
  UpdatedAt: string /* RFC3339 */;
}

//////////
// source: Store.go

export interface Store {
  ID: string /* uuid */;
  Email: string;
  Name: string;
  Address: string;
  CompanyID: string /* uuid */;
  Company?: Company;
  CreatedAt: string /* RFC3339 */;
  UpdatedAt: string /* RFC3339 */;
}

//////////
// source: Worker.go

export interface Worker {
  ID: string /* uuid */;
  Firstname: string;
  Lastname: string;
  Email: string;
  Roles: Role[];
  Status: Status;
  StoreID: string /* uuid */;
  Store?: Store;
  CreatedAt: string /* RFC3339 */;
  UpdatedAt: string /* RFC3339 */;
}