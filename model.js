function Drawing() {
    this.shapes = new Map();
}

function Shape(startX, startY, lineWidth, color) {
    this.startX = startX;
    this.startY = startY;
    this.lineWidth = lineWidth;
    this.color = color;
}

function Line(startX, startY, endX, endY, lineWidth, color) {
    Shape.call(this, startX, startY, lineWidth, color);
    this.endX = endX;
    this.endY = endY;
}

function Rectangle(startX, startY, height, width, lineWidth, color) {
    Shape.call(this, startX, startY, lineWidth, color);
    this.height = height;
    this.width = width;
}

function Circle(startX, startY, radius, lineWidth, color) {
    Shape.call(this, startX, startY, lineWidth, color);
    this.radius = radius;
    //this.radiusY = radiusY;
}