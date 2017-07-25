#!/usr/bin/env node

var fs = require('fs');
var colors = require('colors');

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
			if(grid[row][column] === "*") {
				process.stdout.write(grid[row][column].bgRed.red);
			} else {
				process.stdout.write(grid[row][column].bgBlue.blue);
			}
		}

		process.stdout.write("\n");
	}
}


function toggle(c) {
	if(c === "."){
		return "*";
	} else {
		return ".";
	}
}

function topline(grid, start, end) {
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
	var row = [[]];
	column--;
		
	for(var i = 0; i < grid.length; i++) {
		row[0].push(grid[i][column]);
	}
	
	rotateRow(row, 1, spaces);

	for(var i = 0; i < grid.length; i++) {
		grid[i][column] = row[0][i];
	}
}

function rotateRow(grid, row, spaces) {
	var spaces = parseInt(spaces);
	row--;

	for(var i = 0; i < spaces; i++) {
		grid[row].unshift(grid[row].pop());
	}	
}

function runInstructions() {
	var grid = makeGrid(80, 8);
	var instructions = fs.readFileSync("05-pixels.txt", "utf8").split("\n");
	var instruction;

	for(var i = 0; i < instructions.length; i++) {
		instruction = instructions[i].split(" ");

		switch(instruction[0]) {
			case "top":
				topline(grid, parseInt(instruction[1]), parseInt(instruction[2]));
				break;
			case "left":
				left(grid, parseInt(instruction[1]), parseInt(instruction[2]));
				break;
			case "rotate":
				if(instruction[1] === "column") {
					rotateColumn(grid, parseInt(instruction[2]), parseInt(instruction[3]));
				} else {
					rotateRow(grid, parseInt(instruction[2]), parseInt(instruction[3]));
				}
				break;
		}
	}

	return grid;
}

function getLitPixels(grid) {
	var litPixels = 0;

	for(var i = 0; i < grid.length; i++) {
		for(var x = 0; x < grid[i].length; x++) {
			if(grid[i][x] === "*") {
				litPixels++;
			}
		}
	}

	return litPixels;
}

grid = runInstructions();
console.log("Question 1: There are " + getLitPixels(grid) + " lit pixels");
console.log("Question 2:");
drawGrid(grid);
