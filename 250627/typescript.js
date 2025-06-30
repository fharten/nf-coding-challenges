// Exercise 1: Basic Types and Interfaces
var getUserInfo = function (user) {
    return "User ".concat(user.id, ": ").concat(user.name, " (").concat(user.email, ")");
};
console.log(getUserInfo({ id: 2, name: 'Lukas', email: 'lukas@web.de' }));
var isActive = function (account) {
    if (account.status === 'active')
        return true;
    return false;
};
console.log(isActive({ username: 'Joerg', status: 'inactive' }));
console.log(isActive({ username: 'Joerg', status: 'active', lastLogin: new Date() }));
console.log(isActive({ username: 'Joerg', status: 'pending' }));
// Exercise 3: Type Assertions
var getLength = function (input) {
    if (typeof input === 'string')
        return input.length;
    return input;
};
console.log(getLength('helloimastring'));
console.log(getLength(7));
var printValues = function (obj) {
    console.log(obj);
};
// Exercise 5: Higher-Order Functions
var applyOperation = function (a, b, operation) {
    var result = operation(a, b);
    return result;
};
console.log(applyOperation(6, 8, function (x, y) { return x + y; }));
console.log(applyOperation(2, 9, function (x, y) { return x * y; }));
console.log(applyOperation(60, 8, function (x, y) { return x / y; }));
console.log(applyOperation(56, 18, function (x, y) { return x - y; }));
var getArea = function (shape) {
    if (shape.kind === 'rectangle')
        return shape.height * shape.width;
    return shape.size * shape.size;
};
console.log(getArea({ kind: 'square', size: 40 }));
console.log(getArea({ kind: 'rectangle', height: 40, width: 4 }));
var getEmail = function (profile) {
    var _a;
    if ((_a = profile.contact) === null || _a === void 0 ? void 0 : _a.email)
        return profile.contact.email;
    return 'No email provided';
};
console.log(getEmail({ contact: { email: 'lukas@web.de' } }));
console.log(getEmail({}));
