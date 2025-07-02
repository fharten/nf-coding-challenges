"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const z = __importStar(require("zod/v4"));
// Exercise 1: Basic Object Schema
// Goal: Create a schema for a User object with the following structure:
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    isAdmin: z.boolean().default(false).optional(),
    bio: z.string().optional(),
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
const ListOfUsersSchema = z.array(UserSchema);
const parsedArray = ListOfUsersSchema.safeParse(data);
if (parsedArray.success) {
    console.log(parsedArray.data);
}
else {
    console.error(parsedArray.error.format());
}
const CategorySchema = z.literal(['clothing', 'books', 'electronics']);
const ProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    category: CategorySchema,
});
const product1 = {
    name: 'Shirt',
    price: 29.99,
    category: 'clothing',
};
const parsedProduct = ProductSchema.safeParse(product1);
if (parsedProduct.success) {
    console.log(parsedProduct.data);
}
else {
    console.error(parsedProduct.error.format());
}
const NameSchema = z.object({
    name: z.string().transform((name) => name.toUpperCase()),
});
const name = { name: 'john doe' };
const parsedName = NameSchema.safeParse(name);
if (parsedName.success) {
    console.log(parsedName.data);
}
else {
    console.error(parsedName.error.format());
}
const PasswordSchema = z.object({
    password: z
        .string()
        .refine((val) => val.length > 7)
        .regex(/\d+/g)
        .regex(/([A-Z])+/g),
});
const password1 = { password: 'test' };
const password2 = { password: 'test1' };
const password3 = { password: 'tesT13243242343' };
const parsedPassword = PasswordSchema.safeParse(password3);
if (parsedPassword.success) {
    console.log(parsedPassword.data);
}
else {
    console.error(parsedPassword.error.format());
}
const ToDoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
});
const getTodo = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!res.ok)
        throw new Error('failed to get todo.');
    const data = yield res.json();
    const parsedRes = ToDoSchema.safeParse(data);
    if (parsedRes.success) {
        console.log(parsedRes.data);
    }
    else {
        console.error(parsedRes.error.format());
    }
});
getTodo();
