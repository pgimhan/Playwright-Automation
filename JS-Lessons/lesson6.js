// conditional statement

/*
if(condition){
    //execute some code here
}else{
    //execute some code here
}
*/

// If hour between 6 and 12 print "Good Morning"
// If hour between 12 and 18 print "Good Afternoon"
// otherwise print "Good Evening"

var hour = 20

if(hour>=6 && hour<12){
    console.log("Good Morning"); 
}else if(hour>=12 && hour<18){
    console.log("Good Afternoon");
}else{
    console.log("Good Evening");
}

// example 2
var ageIsMoreThanEighteen = true
var isUSCitizen = true

if(ageIsMoreThanEighteen && isUSCitizen){
    console.log('This Customer is elegible for DL');
}else{
    console.log('This Customer is not elegible for DL');
    
}