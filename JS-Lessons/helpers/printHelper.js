export function printAge(age){
    console.log(`My age is ${age}`);
}

class CustomerDetails{
    printFirstName(fName){
        console.log(fName);
    }

    /**
     * this method will print last name
     * @param {string} lName 
     */
    printLastName(lName){
        console.log(lName);
    }
}

export const cDetails = new CustomerDetails()