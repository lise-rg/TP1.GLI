/**La fonction paint de la classe Forme configurera juste la couleur et
 l'épaisseur du trait du contexte du canvas. Ces fonctions paint prendront donc en paramètre
 le contexte du canvas.**/

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas

    this.shapes.forEach((values,keys)=>{
        console.log(values,keys)
    })

    this.shapes.forEach(function (value, key, map) {
        value.paint(ctx);
    })
};

Shape.prototype.paint = function(ctx) {
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
}

Line.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.closePath();
};

Rectangle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.rect(this.startX, this.startY, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
};

Circle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.arc(this.startX, this.startY,  this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
};

Drawing.prototype.updateShapeList = function(id, shape) {
    let ul = document.getElementById("shapeList");
    let li = document.createElement("li");
    li.id = "li" + id;
    let shapeText;

    switch (shape) {
        case 0 :
            shapeText = document.createTextNode("rectangle");
            break;
        case 1 :
            shapeText = document.createTextNode("line");
            break;
        case 2 :
            shapeText = document.createTextNode("circle");
            break;
    }
    li.appendChild(shapeText);

    let button = document.createElement("button");
    button.className = "btn btn-default";
    button.id = "button" + id;
    button.innerHTML = '<span class="glyphicon glyphicon-remove-sign"></span>';
    li.appendChild(button);

    ul.appendChild(li);
}