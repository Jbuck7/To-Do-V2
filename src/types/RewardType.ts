export interface Reward {
  id: string;
  name: string;
  icon: string;
  cost: number;
  purchased: { [date: string]: boolean };
} 