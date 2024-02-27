abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("Moving...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

let myDog: Animal = new Dog();
myDog.makeSound(); // Output: "Woof! Woof!"
myDog.move(); // Output: "Moving..."
