export interface IMenu {
  label: string;
  href: string;
}

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
