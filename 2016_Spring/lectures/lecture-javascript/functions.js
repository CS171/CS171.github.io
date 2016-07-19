function someFunction(v) {
    if (v < 10) {
        return v;
    } else {
        return v*v;
    }
}

// this is how you should use this function
console.log("Function for 30: " + someFunction(30));
console.log("Function for -5: " + someFunction(-5));

// But, as usual, JavaScript lets you do strange things that are convenient sometimes, and confusing at other times:
console.log("Function for string 50: " + someFunction("50"));
console.log("Function for string: " + someFunction("what?"));
console.log("Function with more parameters: " + someFunction(30, "huh?"));
console.log("Function with no parameters: " + someFunction());


