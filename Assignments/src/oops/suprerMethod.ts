// Define the Shape interface
interface Shape {
    calculateArea(): number;
}

// Define an abstract class implementing the Shape interface
abstract class AbstractShape implements Shape {
    // Abstract method to calculate the area
    abstract calculateArea(): number;
}

// Define a subclass Rectangle that extends AbstractShape
class Rectangle1 extends AbstractShape {
    constructor(private width: number, private height: number) {
        super(); // Call the constructor of the superclass
    }

    // Implement the calculateArea method for Rectangle
    calculateArea(): number {
        return this.width * this.height;
    }
}

// Create an instance of Rectangle and calculate its area
const rectangle1: AbstractShape = new Rectangle1(5, 10);
console.log(rectangle1.calculateArea()); // Output: 50

// :: Here, super() is called within the constructor of Rectangle to explicitly call the constructor of its superclass AbstractShape. This is necessary because AbstractShape may have its own constructor (even though it's not defined explicitly in this case), and calling super() ensures that any necessary initialization defined in the superclass constructor is executed before the initialization of the subclass.

// ::  In this particular example, super() doesn't take any arguments because AbstractShape doesn't have a constructor defined. However, if AbstractShape had a constructor with parameters, super() would need to pass arguments accordingly.
