// Declerative functions

printName()
function printName() {
    console.log('Prabuddha');
}

// Anonymus function

var hello = function () {
    console.log('Hello 1');
}

hello()

// ES6 function syntax or Arrow functions

var hello2 = () => {
    console.log('Hello 2');
}

hello2()

// Function with arguments

function stuName(fname, lname) {
    console.log(fname + ' ' + lname);
}

stuName('John', 'Harrison')

// Function with return

function multiplyBy5(num) {
    var result = num * 5
    return result
}

var myResult = multiplyBy5(50)
console.log(myResult);

// Import functions

import { printAge } from './helpers/printHelper.js'
printAge(26)

// Import everything

import * as helper from './helpers/printHelper.js'
helper.printAge(30)