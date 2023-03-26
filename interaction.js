function DnD(canvas, interactor) {
	this.dragX = 0;
    this.dragY = 0;
    this.dropX = 0;
    this.dropY = 0;
    this.isMousePressed = false;
    this.interactor = interactor;

	this.mousePressed = function(event) {
        this.isMousePressed = true;
        let pos = getMousePosition(canvas, event);
        this.dragX = this.dropX = pos.x;
        this.dragY = this.dropY = pos.y;
        this.interactor.onInteractionStart(this);
	}.bind(this);

    this.mouseMoved = function(event) {
	    if(this.isMousePressed) {
            let pos = getMousePosition(canvas, event);
            this.dropX = pos.x;
            this.dropY = pos.y;
            this.interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    this.mouseReleased = function(event) {
        if(this.isMousePressed) {
            let pos = getMousePosition(canvas, event);
            this.dropX = pos.x;
            this.dropY = pos.y;
            this.interactor.onInteractionEnd();
            this.isMousePressed = false;
        }

        document.getElementById("");
    }.bind(this);

	canvas.addEventListener('mousedown', this.mousePressed, false);
	canvas.addEventListener('mousemove', this.mouseMoved, false);
	canvas.addEventListener('mouseup', this.mouseReleased, false);
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



