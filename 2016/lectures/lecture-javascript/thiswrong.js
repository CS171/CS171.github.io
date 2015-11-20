function yetAnotherObject() {
    return {
        x: 3,
        get: function () {
            return this.x
        }
    };
}

obj = yetAnotherObject()
console.log("As expected: " + obj.get()); // fine
var t = obj.get;
console.log("Problem: " + t()); // *NOT* fine