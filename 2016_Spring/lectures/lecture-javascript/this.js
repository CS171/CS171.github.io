function otherObject(value) {
    return {
        x: value,
        get: function () {
            return this.x;
        },
        set: function (newValue) {
            this.x = newValue;
        }
    };
}

other = otherObject(3);
other.x;
other.get();
other.set(5);
other.get();
other.x; // compare example to "createObject"