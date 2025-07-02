import { z } from 'zod';

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

const CategorySchema = z.union([
  z.literal('clothing'),
  z.literal('books'),
  z.literal('electronics'),
]);

const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: CategorySchema,
});
