// Let's build something that looks like OOP
function createObject(content) {
    var result = {
        get: function() {
            return content;
        },
        set: function(newValue) {
            content = newValue;
        },
        twice: function() {
            return content * 2;
        }
    };
    return result;
}

f = createObject("something");
console.log("Get: " + f.get());
console.log("Twice: " + f.twice());
f.set(20);
console.log("Get: " + f.get());
console.log("Twice: " + f.twice());