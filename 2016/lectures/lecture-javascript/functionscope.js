function anotherFunction(v2) {
    var x = v2 * 10;
    var y = v2 / 2;
    return x * y;
}
var returnedValue = anotherFunction(4);

console.log("Returned value: " + returnedValue + "; x or y however, are not defined in this scope. \n Calling x or y would result in an error.");
