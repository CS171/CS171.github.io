var variableFunction = function(v) {
    if (v > 10) {
        return "big";
    } else {
        return "small";
    }
};
// works as expected
console.log("variableFunction of 30: " +  variableFunction(30));
// But later you can reassign that function, and then you’d be calling something else:

variableFunction = function(x) { return x - 5; };
// returns 25 instead of "big";
console.log("reassigned variableFunction of 30: " +  variableFunction(30));