const { exec, spawn } = require("child_process");
const fs = require('fs');
const fetch = require('node-fetch');
const faceapi = require('face-api.js');
const canvas = require('canvas');
faceapi.env.monkeyPatch({ fetch: fetch });
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

async function face_api() {
	let takePicture = () => {
		exec("python python/cameracapture.py", (error, stdout, stderr) => {});
	};
	takePicture();
	let img = await canvas.loadImage("./img.jpg");

	const MODELS_URL = './models';
	Promise.all([
		faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_URL),
		faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL),
		faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL),
		faceapi.nets.faceExpressionNet.loadFromDisk(MODELS_URL),
	]).then(start).catch(err => console.log(err));

	function start(){
		exec("python python/activeapp.py", (e, app, stdin) => {
		faceapi.detectSingleFace(img).withFaceExpressions().then(data => {

				let jsonData = {
					"app"  : app,
					"data" : data.expressions,
					"time" : new Date(),
				};

				fs.readFile('client/results.json', 'utf-8', (err, filedata) => {
					if(err) throw err;
					let objectArray = JSON.parse(filedata);

					objectArray.results.push(jsonData);

					fs.writeFile('client/results.json', JSON.stringify(objectArray), 'utf-8', (err) => {
						if(err) throw err;
						console.log('Done!');
					});
				})

				fs.copyFile('./img.jpg', 'client/img.jpg', (err) => {
					if(err) console.error(err);
					else console.log('Image copied successfully');
				})
			});
		});
	}
}

face_api()
