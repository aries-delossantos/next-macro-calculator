"use server";

import { Goal, Macro, Result } from "../types/result";

type Data = {
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  goal?: string;
  activity?: string;
};

const getTDEE = (data: Data) => {
  const stressFactor = getStressFactor(data.activity);

  if (data.gender === "m") {
    return (
      (10 * Number(data.weight) +
        6.25 * Number(data.height) -
        5 * Number(data.age) -
        5) *
      Number(stressFactor)
    );
  }

  return (
    (10 * Number(data.weight) +
      6.25 * Number(data.height) -
      5 * Number(data.age) -
      161) *
    Number(stressFactor)
  );
};

const getStressFactor = (activity?: string): number | null => {
  switch (activity) {
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    case "super":
      return 1.9;
    default:
      return 1.2;
  }
};

const getGoal = (tdee: number, goal: string): Goal => {
  if (goal === "lose") {
    return {
      calories: tdee - tdee * 0.2,
      macro: {
        protein: 0.4,
        carb: 0.4,
        fat: 0.2,
      },
    };
  } else {
    return {
      calories: tdee + 500,
      macro: {
        protein: 0.3,
        carb: 0.4,
        fat: 0.3,
      },
    };
  }
};

const getMactroPercentage = (tdee: number, goal: Goal): Macro => {
  return {
    protein: Math.ceil((goal.calories * goal.macro.protein) / 4),
    carb: Math.ceil((goal.calories * goal.macro.carb) / 4),
    fat: Math.ceil((goal.calories * goal.macro.fat) / 9),
  };
};

const getMacro = (
  data: Data,
  tdee: number
): Pick<Result, "goal" | "allocation"> => {
  const goal = getGoal(tdee, data.goal!);
  const allocation = getMactroPercentage(tdee, goal);

  return {
    goal,
    allocation,
  };
};

export const compute = async (formData: FormData): Promise<Result> => {
  const data: Data = {
    age: formData.get("age")?.toString(),
    gender: formData.get("gender")?.toString(),
    height: formData.get("height")?.toString(),
    weight: formData.get("weight")?.toString(),
    goal: formData.get("goal")?.toString(),
    activity: formData.get("activity")?.toString(),
  };

  console.log("data", data);

  const tdee = getTDEE(data);
  console.log("tdee", tdee);

  const { goal, allocation } = getMacro(data, tdee);

  console.log("goal", goal);
  console.log("kcalGoal", allocation);

  return {
    tdee: tdee,
    allocation: allocation,
    goal: goal,
  };
};
