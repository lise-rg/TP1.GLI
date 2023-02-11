
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	var dragX = 0;
	var dragY = 0;
	var dropX = 0;
	var dropY = 0;
	var isMousePressed = false;

	// Developper les 3 fonctions gérant les événements
	DnD.prototype.mousePressed = function(event) {
        isMousePressed = true;
        dragX = getMousePosition(canvas, event).x;
        dragY = getMousePosition(canvas, event).y;
        console.log("Initial position : " + dragX + " - " + dragY);
	};

	DnD.prototype.mouseMoved = function(event) {
	    if(isMousePressed) {
            dropX = getMousePosition(canvas, event).x;
            drop_y = getMousePosition(canvas, event).y;
            console.log("Current position : " + dropX + " - " + dropY);
        }
    };

    DnD.prototype.mouseReleased = function(event) {
        if(isMousePressed) {
            dropX = getMousePosition(canvas, event).x;
            dropY = getMousePosition(canvas, event).y;
            console.log("Final position : " + dropX + " - " + dropY);

            // for testing
            var ctx = canvas.getContext('2d');
            //Draws the path
            ctx.beginPath();
            ctx.moveTo(dragX, dragY);
            ctx.lineTo(dropX, dropY);
            ctx.closePath();

            ctx.stroke();

            isMousePressed = false;
        }
    };

	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener('mousedown', this.mousePressed, false);
	canvas.addEventListener('mousemove', this.mouseMoved, false);
	canvas.addEventListener('mouseup', this.mouseReleased, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



