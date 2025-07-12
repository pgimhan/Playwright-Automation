// Loops

// For Loop
for(let i=0; i<5; i++){
    console.log('Hello world'+i);
}

var cars = ['BMW', 'Toyota', 'Benz']

// For of loops
for(let car of cars){
    console.log(car);
    if(car == 'Toyota'){
        break
    }
}

// ES6 Syntax
cars.forEach( car =>{
    console.log(car);
})





















