const { exec } = require("child_process");
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
	}
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
		//faceapi.detectSingleFace(img).withFaceExpressions().then(x => console.log("|" + JSON.stringify(x.expressions) + "|"));
		faceapi.detectSingleFace(img).withFaceExpressions().then(data => {
			console.log(data.expressions);
			let jsonData = JSON.stringify(data.expressions);
			console.log(jsonData);
			fs.writeFile('data.json', jsonData, 'utf8', (err) => {
				console.error(err);
			})
		});
	}
}

face_api()
