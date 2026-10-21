export type CategoryType = 'all' | 'kidney_bladder' | 'brain_energy' | 'vessels' | 'post_op';

export type TimingType = 'morning' | 'afternoon' | 'evening' | 'as_needed';

export interface Supplement {
  id: string;
  name: string;
  tradeNames: string[];
  category: 'kidney_bladder' | 'brain_energy' | 'vessels' | 'post_op';
  target: string;
  dosage: string;
  timing: TimingType;
  withFood: 'before' | 'with' | 'after' | 'any';
  instructions: string;
  priceMoscow: string;
  pharmacyExample: string;
  badge: string;
  priority: 'high' | 'medium' | 'conditional';
  notes?: string;
  searchUrl?: string;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  title: string;
  description: string;
  ingredients: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  benefits: string[];
  kidneySafetyNote?: string;
}

export interface DayPlan {
  id?: string;
  dayNumber: number;
  dayName: string;
  focus: string;
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  meals: Meal[];
}

export interface GroceryItem {
  id: string;
  category: 'vegetables' | 'protein' | 'dairy' | 'grains' | 'fruits_berries' | 'healthy_fats' | 'beverages';
  name: string;
  amount: string;
  note?: string;
  storeTip: string;
  estPrice: string;
}

export interface CheckupItem {
  id: string;
  title: string;
  code?: string;
  why: string;
  targetValues: string;
  labPriceMoscow: string;
  urgency: 'critical' | 'recommended' | 'optional';
  preparation: string;
}

export interface PostOpGuideline {
  phase: string;
  timeframe: string;
  summary: string;
  allowed: string[];
  restricted: string[];
  scarCare: string;
  lymphaticTips: string[];
}
