import * as z from 'zod/v4';
import axios from 'axios';

// Exercise 1: Basic Object Schema
// Goal: Create a schema for a User object with the following structure:

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean().default(false).optional(),
  bio: z.string().optional(),
});

type User = z.infer<typeof UserSchema>;

const user1: User = {
  id: 1,
  name: 'Florian',
  email: 'florian@web.de',
  //isAdmin: false,
};

const parsed = UserSchema.safeParse(user1);
if (parsed.success) {
  console.log(parsed.data);
} else {
  console.error(parsed.error.format());
}

const data = [
  { id: 1, name: 'Alice', email: 'a@a.com', isAdmin: true },
  { id: 2, name: 'Bob', email: 'b@b.com' },
  { id: 3, name: 'Invalid', email: 123 },
];

const ListOfUsersSchema = z.array(UserSchema);
type ListOfUsers = z.infer<typeof ListOfUsersSchema>;

const parsedArray = ListOfUsersSchema.safeParse(data);
if (parsedArray.success) {
  console.log(parsedArray.data);
} else {
  console.error(parsedArray.error.format());
}

const CategorySchema = z.literal(['clothing', 'books', 'electronics']);

const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: CategorySchema,
});
type Product = z.infer<typeof ProductSchema>;

const product1: Product = {
  name: 'Shirt',
  price: 29.99,
  category: 'clothing',
};

const parsedProduct = ProductSchema.safeParse(product1);
if (parsedProduct.success) {
  console.log(parsedProduct.data);
} else {
  console.error(parsedProduct.error.format());
}

const NameSchema = z.object({
  name: z.string().transform((name) => name.toUpperCase()),
});
type Name = z.infer<typeof NameSchema>;
const name: Name = { name: 'john doe' };

const parsedName = NameSchema.safeParse(name);
if (parsedName.success) {
  console.log(parsedName.data);
} else {
  console.error(parsedName.error.format());
}

const PasswordSchema = z.object({
  password: z
    .string()
    .refine((val) => val.length > 7)
    .regex(/\d+/g)
    .regex(/([A-Z])+/g),
});
type Password = z.infer<typeof PasswordSchema>;
const password1 = { password: 'test' };
const password2 = { password: 'test1' };
const password3 = { password: 'tesT13243242343' };

const parsedPassword = PasswordSchema.safeParse(password3);
if (parsedPassword.success) {
  console.log(parsedPassword.data);
} else {
  console.error(parsedPassword.error.format());
}

const ToDoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});
type ToDo = z.infer<typeof ToDoSchema>;

const getTodo = async (): Promise<void> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  if (!res.ok) throw new Error('failed to get todo.');

  const data: ToDo = await res.json();

  const parsedRes = ToDoSchema.safeParse(data);

  if (parsedRes.success) {
    console.log(parsedRes.data);
  } else {
    console.error(parsedRes.error.format());
  }
};

getTodo();
