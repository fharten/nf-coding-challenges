"use strict";
class NoTax {
    getTax(income) {
        return income;
    }
}
class FlatTax {
    getTax(income) {
        return income * 0.1;
    }
}
let tax;
class ProgressiveTax {
    getTax(income) {
        if (income < 20000)
            tax = income * 0.1;
        if (income < 80000)
            tax = 20000 * 0.1 + (income - 20000) * 0.3;
        if (income > 80000)
            tax = 20000 * 0.1 + 60000 * 0.3 + (income - 80000) * 0.9;
        return tax;
    }
}
class TaxCalculator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    calculate(income) {
        return this.strategy.getTax(income);
    }
}
const calculator = new TaxCalculator(new FlatTax());
console.log(calculator.calculate(1000)); // $100 flat tax
const calculator2 = new TaxCalculator(new FlatTax());
console.log(calculator2.calculate(150000)); // $15000 flat tax
const calculator3 = new TaxCalculator(new ProgressiveTax());
console.log(calculator3.calculate(150000));
