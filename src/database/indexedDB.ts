import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  Product!: Table<Product>;
  Favorite!: Table<Favorite>;

  constructor() {
    super("Caisse");
    this.version(1).stores({
      Product:
        "++id, idProduct, Bacodes, name, price, purchasePrice, quantity, brand, image, isPackage, quantityPackage, idProductPackage", // Primary key and indexed props
      Favorite: "++id, idFavorite, name, color, icon, Products",
    });
  }
}

export const indexedDB = new MySubClassedDexie();
