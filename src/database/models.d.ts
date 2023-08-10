type Product = {
  id?: number;
  idProduct: string;
  name: string;
  price: number;
  purchasePrice: number;
  quantity: number;
  brand: string;
  image: string;
  Barcodes: Barcode[];
} & (isPackage | isNotPackage);

type Barcode = {
  id?: number;
  name: string;
  code: string;
};

type Favorite = {
  id?: number;
  name: string;
  color: string;
  icon: string;
  Products: Product[];
};

type isPackage = {
  isPackage: true;
  quandtityPackage: number;
  Product: Product;
};

type isNotPackage = {
  isPackage?: false;
};
