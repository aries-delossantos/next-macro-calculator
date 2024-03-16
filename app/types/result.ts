export type Result = {
  tdee: number;
  goal: Goal;
  allocation: Macro;
};

export type Macro = {
  protein: number;
  carb: number;
  fat: number;
};

export type Goal = {
  calories: number;
  macro: Macro;
};
