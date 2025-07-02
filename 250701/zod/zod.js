"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Exercise 1: Basic Object Schema
// Goal: Create a schema for a User object with the following structure:
const UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    isAdmin: zod_1.z.boolean().default(false).optional(),
    bio: zod_1.z.string().optional(),
});
const user1 = {
    id: 1,
    name: 'Florian',
    email: 'florian@web.de',
    //isAdmin: false,
};
const parsed = UserSchema.safeParse(user1);
if (parsed.success) {
    console.log(parsed.data);
}
else {
    console.error(parsed.error.format());
}
const data = [
    { id: 1, name: 'Alice', email: 'a@a.com', isAdmin: true },
    { id: 2, name: 'Bob', email: 'b@b.com' },
    { id: 3, name: 'Invalid', email: 123 },
];
const ListOfUsersSchema = zod_1.z.array(UserSchema);
const parsedArray = ListOfUsersSchema.safeParse(data);
if (parsedArray.success) {
    console.log(parsedArray.data);
}
else {
    console.error(parsedArray.error.format());
}
