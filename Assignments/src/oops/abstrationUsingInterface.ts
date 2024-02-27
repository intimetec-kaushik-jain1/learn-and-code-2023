interface Shape {
  calculateArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }
}
class Square implements Shape {
  constructor(private side: number) {}

  calculateArea(): number {
    return this.side * this.side;
  }
}

let rectangle: Shape = new Rectangle(5, 10);
let square: Shape = new Square(5);
console.log(rectangle.calculateArea()); // Output: 50
console.log(square.calculateArea()); // Output: 25

// :: This demonstrates abstraction because it allows us to work with shapes in a generalized way without 
// :: needing to know the specific details of each shape's implementation. We can treat any shape that 
// :: implements the Shape interface uniformly, focusing on their common behavior rather than their individual
// :: implementations.
