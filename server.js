const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 9001;

app.get('/script1', (req, res) => {
	var dataToSend;

	// spawn new child process to call the python script
	const python = spawn('python', ['script1.py']);

	// collect data from script
	// Emitted when script prints to console
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString();
	});

	// in close event we are sure that stream from child process is closed
	python.on('close', code => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(dataToSend);
	});
});

app.get('/script2', (req, res) => {
	var dataToSend;

	// spawn new child process to call the python script
	const python = spawn('python', ['script2.py', 'node.js', 'python']);

	// collect data from script
	// Emitted when script prints to console
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString();
	});

	// in close event we are sure that stream from child process is closed
	python.on('close', code => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(dataToSend);
	});
});

app.get('/script3', (req, res) => {
	var largeDataSet = [];

	// spawn new child process to call the python script
	const python = spawn('python', ['script3.py']);

	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		largeDataSet.push(data);
	});

	// in close event we are sure that stream is from child process is closed
	python.on('close', code => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(largeDataSet.join(''));
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
