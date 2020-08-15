const { exec } = require("child_process");
const fs = require('fs');
const fetch = require('node-fetch');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { json } = require("express");
faceapi.env.monkeyPatch({ fetch: fetch });
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

async function face_api() {

	let takePicture = () => {
		exec("python python/cameracapture.py", (error, stdout, stderr) => {});
	};
	let get_app = () => {
		let ret;
		exec("python python/activeapp.py", (error, stdout, stderr) => { ret = stdout; });
		return ret;
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
		faceapi.detectSingleFace(img).withFaceExpressions().then(data => {
			let jsonData = {
				"app"  : get_app(),
				"data" : data.expressions,
				"time" : new Date(),
			};
			console.log(jsonData);

			fs.readFile('data.json', 'utf-8', (err, filedata) => {
				if(err) throw err;
				let objectArray = JSON.parse(filedata);

				objectArray.results.push(jsonData);

				console.log(objectArray);

				fs.writeFile('data.json', JSON.stringify(objectArray), 'utf-8', (err) => {
					if(err) throw err;
					console.log('Done');
				})
			})
		});
	}
}

face_api()
