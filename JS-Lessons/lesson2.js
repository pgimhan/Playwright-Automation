//concatination and interpolation
var price = 20
var itemName = 'bottle'
var messageToPrint1 = "The price for your " + itemName + " is " + price + " dollars"  //concatenation
var messageToPrint2 = `The price for your ${itemName} is ${price} dollars` // interpolation
console.log(messageToPrint1);
console.log(messageToPrint2);

