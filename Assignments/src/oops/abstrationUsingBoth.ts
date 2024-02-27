interface Printable {
    print(): void;
}

abstract class Vehicle {
    abstract drive(): void;
}

class Car extends Vehicle implements Printable {
    drive(): void {
        console.log("Driving car...");
    }

    print(): void {
        console.log("Printing car details...");
    }
}

let myCar: Vehicle = new Car();
myCar.drive(); // Output: "Driving car..."

let printableCar: Printable = new Car();
printableCar.print(); // Output: "Printing car details..."
