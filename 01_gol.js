function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let pointsToRemove;
let rows;
let resolution = 10;
let stopDraw = false;

function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;

    pointsToRemove = [];

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    background(0);
}

function keyPressed() {
    if (keyCode === 32) {
        stopDraw = !stopDraw;
    }
    return false;
}


function mouseClicked() {
    grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 1;
    return false;
}

function draw() {
    for (let i=0; i < pointsToRemove.length; i++) {
        fill(0);
        stroke(0);
        let xCord = pointsToRemove[i].x * resolution;
        let yCord = pointsToRemove[i].y * resolution;
        rect(xCord, yCord, resolution - 1, resolution - 1);
    }
    pointsToRemove = [];
    for (let i=0; i < cols; i++) {
        for (let j=0; j < rows; j++) {
            let xCord = i * resolution;
            let yCord = j * resolution;
            if (grid[i][j] === 1) {
                fill(255);
                stroke(0);
                rect(xCord, yCord, resolution - 1, resolution - 1);
            }
        }
    }
    if (!stopDraw) {
        let newGrid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let neighbors = countNeighbors(grid, i, j);

                if (state === 0 && neighbors === 3) {
                    newGrid[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[i][j] = 0;
                    pointsToRemove.push({'x': i, 'y': j});
                } else {
                    newGrid[i][j] = state;
                }

            }
        }
        grid = newGrid;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}