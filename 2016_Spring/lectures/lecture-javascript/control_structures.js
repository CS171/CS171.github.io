// The familiar if
if (1 == parseFloat("1")) {
    console.log("First if");
} else if (2 == parseFloat("3")) {
    console.log("Else if");
} else {
    console.log("else");
}

// The ternary if operator
// CONDITION ? WHAT_HAPPENS_IF_CONDITION_TRUE : WHAT_HAPPENS_IF_CONDITION_FALSE
4%2 == 0 ? console.log(true) : console.log(false);

// Switch statements
var i = "some case";
switch (i) {
    case "string literals ok":
        console.log("Yes");
        break;
    case "some case":
        console.log("Unlike C");
        break;
    default:
        console.log("Default");
}