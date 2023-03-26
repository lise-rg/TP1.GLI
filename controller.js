let editingMode = { rect: 0, line: 1, circle: 2 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	document.getElementById("butLine").onclick = () => this.currEditingMode = editingMode.line
	document.getElementById("butRect").onclick = () => this.currEditingMode = editingMode.rect
	document.getElementById("butCircle").onclick = () => this.currEditingMode = editingMode.circle
	document.getElementById("spinnerWidth").onchange = (e) => this.currLineWidth = e.target.value
	document.getElementById("colour").onchange = (e) => this.currColour = e.target.value

	if(document.getElementById("butLine").checked) {
		this.currEditingMode = editingMode.line;
	}
	else if(document.getElementById("butRect").checked) {
		this.currEditingMode = editingMode.rect;
	}
	else {
		this.currEditingMode = editingMode.circle;
	}

	this.currLineWidth = document.getElementById("spinnerWidth").value;
	this.currColour = document.getElementById("colour").value;

	new DnD(canvas, this);

	this.onInteractionStart = function(dnd) {
		switch (this.currEditingMode) {
			case 0 :
				this.currentShape = new Rectangle(dnd.dragX, dnd.dragY, (dnd.dropY-dnd.dragY), (dnd.dropX-dnd.dragX), this.currLineWidth, this.currColour);
				break;
			case 1 :
				this.currentShape = new Line(dnd.dragX, dnd.dragY, dnd.dropX, dnd.dropY, this.currLineWidth, this.currColour);
				break;
			case 2 :
				let radius = Math.sqrt( Math.pow((dnd.dragY - dnd.dropY), 2) + Math.pow((dnd.dragX - dnd.dropX), 2));
				this.currentShape = new Circle(dnd.dragX, dnd.dragY, radius, this.currLineWidth, this.currColour);
				break;
		}
	}.bind(this);

	this.onInteractionUpdate = function(dnd) {
		switch (this.currEditingMode) {
			case 0 :
				this.currentShape = new Rectangle(dnd.dragX, dnd.dragY, (dnd.dropY-dnd.dragY), (dnd.dropX-dnd.dragX), this.currLineWidth, this.currColour);
				break;
			case 1 :
				this.currentShape = new Line(dnd.dragX, dnd.dragY, dnd.dropX, dnd.dropY, this.currLineWidth, this.currColour);
				break;
			case 2 :
				let radius = Math.sqrt( Math.pow((dnd.dragY - dnd.dropY), 2) + Math.pow((dnd.dragX - dnd.dropX), 2));
				this.currentShape = new Circle(dnd.dragX, dnd.dragY, radius, this.currLineWidth, this.currColour);
				break;
		}
		drawing.paint(ctx);
		this.currentShape.paint(ctx);
	}.bind(this);

	this.onInteractionEnd = function() {
		let id = crypto.randomUUID();
		drawing.shapes.set(id, this.currentShape);
		drawing.paint(ctx);
		drawing.updateShapeList(id, this.currEditingMode);

		document.getElementById("button" + id).onclick = (event) => remove(event.currentTarget.id.substring(6));
	}.bind(this);
}

function remove(id) {
	document.getElementById("li" + id).remove();
	drawing.shapes.delete(id);
	drawing.paint(ctx, canvas);
}