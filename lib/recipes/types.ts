export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;

  // Nutritional info
  nutrition: {
    protein: number; // grams
    calories: number;
    carbs: number;
    fat: number;
  };

  // GLP-1 specific
  isGlp1Friendly: boolean;
  glp1Notes?: string;

  // Preparation
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;

  // Content
  ingredients: Ingredient[];
  instructions: string[];

  // Categorization
  category: RecipeCategory;
  tags: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
}

export type RecipeCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'smoothie';
