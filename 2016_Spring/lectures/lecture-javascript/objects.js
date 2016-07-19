obj = {
    key1: 3,
    key2: 4
};

// accessing an object either via the familiar . notation
console.log("Value of key1: " + obj.key1);
// or when refering to them as string
console.log("Value of key2: " + obj["key2"]);
// not that this gets you immediately a hash-table (dictionary) implementation!


// consequently
otherObject = {
    "stringKey1": "3",
    "stringKey2": "4"
}
console.log("Value of stringKey: " + otherObject.stringKey);

// you can extend objects dynamically:
otherObject.newKey = "dynamicallyAdded";
console.log("Value of newKey: " + otherObject.newKey);