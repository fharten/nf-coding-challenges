type Ingredients = {
  flour?: number;
  sugar?: number;
  eggs?: number;
  milk?: number;
  apples?: number;
  oil?: number;
  cocoa?: number;
};

export const recipe1: Ingredients = {
  flour: 500,
  sugar: 200,
  eggs: 1,
};
export const available1: Ingredients = {
  flour: 1200,
  sugar: 1200,
  eggs: 5,
  milk: 200,
};

export const recipe2: Ingredients = {
  apples: 3,
  flour: 300,
  sugar: 150,
  milk: 100,
  oil: 100,
};
export const available2: Ingredients = { sugar: 500, flour: 2000, milk: 2000 };

export const recipe3: Ingredients = {
  flour: 100,
  sugar: 50,
};
export const available3: Ingredients = { flour: 1000, sugar: 300 };

export const recipe4: Ingredients = {
  eggs: 2,
};
export const available4: Ingredients = { eggs: 1 };

export const recipe5: Ingredients = {
  flour: 200,
  sugar: 100,
  cocoa: 50,
};
export const available5: Ingredients = { flour: 1200, sugar: 500, cocoa: 300 };
