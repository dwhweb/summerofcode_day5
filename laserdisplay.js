#!/usr/bin/env node

function makeGrid(x, y) {
	var grid = [];
	var row = [];

	for(var i = 0; i < x; i++) {
		row.push(".");
	}

	for(var i = 0; i < y; i++) {
		grid.push(row.slice());
	}

	return grid;
}

function drawGrid(grid) {
	for(var row = 0; row < grid.length; row++) {
		for(var column = 0; column < grid[row].length; column++) {
			process.stdout.write(grid[row][column]);
		}

		console.log("\n");
	}
}


function toggle(c) {
	if(c === "."){
		return "*";
	} else {
		return ".";
	}
}

function top(grid, start, end) {
	start--;
	
	for(var x = start; x < end; x++) {
		grid[0][x] = toggle(grid[0][x]);
	}
}

function left(grid, start, end) {
	start--;

	for(var x = start; x < end; x++) {
		grid[x][0] = toggle(grid[x][0]);
	}
}

function rotateColumn(grid, column, spaces) {
	var spaces = parseInt(spaces);
	column--;

	var gridcopy = grid.slice();
	var first = gridcopy[spaces][column];

	for(var x = 0; x < grid.length; x++) {
		row = x + spaces;

		if(row >= grid.length) {
			row = row - grid.length;
		}
		
		gridcopy[row][column] = grid[x][column];	
	}
	
	gridcopy[spaces][column] = first;
	console.log(gridcopy);
}

var grid = makeGrid(10, 4);
top(grid, 1, 3);
drawGrid(grid);
rotateColumn(grid, 1, 2);
