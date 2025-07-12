export function printName() {
    console.log('K Sangakkara');
}

class StudentDetails {
    /**
     * This will print student age
     * @param {number} x
     */
    printAge(x) {
        console.log(`Student age is ${x}`);

    }

    /**
     * This will print student name
     * @param {string} name 
     */
    printName(name){
        console.log(`Student name is ${name}`);
        
    }

}

export let std1 = new StudentDetails()

