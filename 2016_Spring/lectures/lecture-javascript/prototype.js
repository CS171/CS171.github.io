// Inheritance, with no classes
base = {
    v1: 1,
    v2: 2
};

derived = {
    v1: 5,
    v3: 3,
    v4: 4
};

console.log("Base v1: " + base.v1);
console.log("Derived v1: " + derived.v1);
console.log("Derived v2: " + derived.v2);

// this calls sets the prototype of derived to be the base
Object.setPrototypeOf(derived, base);
console.log("Derived v1: " + derived.v1);
console.log("Derived v2: " + derived.v2);

// Instead of using setPrototypeOf, use:
v = Object.create(null); // this is just the same as {}
v2 = Object.create(v);
v3 = Object.create(v2); // etc.