export interface ITopCategoryData {
  category: string;
  totalSold: number;
}

export interface ITotalProfit {
  currentProfit: number;
  previousProfit: number;
}

export interface IRecentSales {
  id: string;
  productName: string;
  price: number;
  seller: string;
}

export interface Inventory {
  id: string;
  productName: string;
  category: string;
  totalStock: number;
  stock: number;
  price: number;
  color: string;
}

export interface Sales {
  id: string;
  productName: string;
  price: number;
  profit: number;
  quantity: number;
  seller: string;
  category: string;
  color: string;
  date: string;
}
