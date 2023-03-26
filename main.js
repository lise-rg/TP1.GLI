
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

canvas.width=800
canvas.height=600

// Code final à utiliser pour manipuler Pencil.
let drawing = new Drawing();
let pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);

