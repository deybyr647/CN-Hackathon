const { exec } = require("child_process");
let fetch = require('node-fetch');
let faceapi = require('face-api.js');
let canvas = require('canvas');
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
		console.log("|");
		faceapi.detectSingleFace(img).withFaceExpressions().then(x => console.log(x.expressions)).then(() => console.log("|"));
	}
}

face_api()



let data = {
    name: 'Name',
    timestamps: [],

}