// class Bottle {
//     constructor(public name: string) {}

//     pourLiquid(): void {
//         console.log("Pouring liquid from the bottle");
//     }
// }

// class WaterBottle extends Bottle {
//     constructor(name: string) {
//         super(name);
//     }

//     pourLiquid(): void {
//         console.log("Pouring water from the bottle");
//     }
// }

// class SodaBottle extends Bottle {
//     constructor(name: string) {
//         super(name);
//     }

//     pourLiquid(): void {
//         console.log("Pouring soda from the bottle");
//     }
// }

// // Function demonstrating polymorphism with bottles
// function pourFromBottle(bottle: Bottle): void {
//     bottle.pourLiquid();
// }

// // Create instances of WaterBottle and SodaBottle
// const waterBottle = new WaterBottle("Aquafina");
// const sodaBottle = new SodaBottle("Coca-Cola");
// const bottle = new SodaBottle("Simple-Bottle");

// // Call the function with different bottle instances
// pourFromBottle(waterBottle); // Output: "Pouring water from the bottle"
// pourFromBottle(sodaBottle);  // Output: "Pouring soda from the bottle"
// pourFromBottle(bottle);  
