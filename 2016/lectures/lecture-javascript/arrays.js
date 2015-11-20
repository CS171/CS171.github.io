var c = [0,1,2];
var e = []; // empty array declaration
console.log(c[0]);
// you can but should not use arrays of different type
var multiTypeArray = [0, "This", "is", true, "unfortunately"];
console.log(multiTypeArray[1]);
console.log(multiTypeArray[3]);

// you can access the length of the array using the length attribute
var myLength = multiTypeArray.length;
console.log("Length: " + myLength);

// you can nest arrays
var nested = [[1, 2], [3, 4], [5, 6]];
console.log("First element of second array: " + nested[1][0]);

// extend arrays
c.push(3);
var newLength = c.push(4);
// remove last element from array
var lastElement = c.pop();

// find index of entry:
var pos = c.indexOf(2);