// for loops
var output = "";
for (i = 0; i < 10; ++i) {
    output += i + ", ";
}
console.log("For loop: " + output);

// while loops;
var i = 3;
output = "";
while (i < 100) {
    output += i + ", ";
    i = i * 2;
}
console.log("While loop: " + output);

// Do-while loops:
i = 3;
output = "";
do {
    output += i + ", ";
    i = i * 2;
} while (i < 100);
console.log("Do while loop: " + output);