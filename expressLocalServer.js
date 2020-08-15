const { exec } = require("child_process");
let express = require('express');
let app = express();
let opn = require('opn');
let fetch = require('node-fetch');
let faceapi = require('face-api.js');
let canvas = require('canvas');
let path = require('path');
faceapi.env.monkeyPatch({ fetch: fetch });
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

let takePicture = () => {
	let ret;
	exec("python python/cameracapture.py", (error, stdout, stderr) => {
		ret = stdout;
	});
	return ret;
}

function face_api() {


	const faceapi = require("face-api.js")
	const canvas = require("canvas")
	const fs = require("fs")
	const path = require("path")

	// mokey pathing the faceapi canvas
	const { Canvas, Image, ImageData } = canvas
	faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

	const faceDetectionNet = faceapi.nets.ssdMobilenetv1

	// SsdMobilenetv1Options
	const minConfidence = 0.5

	// TinyFaceDetectorOptions
	const inputSize = 408
	const scoreThreshold = 0.5

	// MtcnnOptions
	const minFaceSize = 50
	const scaleFactor = 0.8

	function getFaceDetectorOptions(net) {
	    return net === faceapi.nets.ssdMobilenetv1
	        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
	        : (net === faceapi.nets.tinyFaceDetector
	            ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
	            : new faceapi.MtcnnOptions({ minFaceSize, scaleFactor })
	        )
	}

	const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)

	// simple utils to save files
	const baseDir = path.resolve(__dirname, './out')
	function saveFile(fileName, buf) {
	    if (!fs.existsSync(baseDir)) {
	      fs.mkdirSync(baseDir)
	    }
	    // this is ok for prototyping but using sync methods
	    // is bad practice in NodeJS
	    fs.writeFileSync(path.resolve(baseDir, fileName), buf)
	  }

	async function run() {

	    // load weights
	    await faceDetectionNet.loadFromDisk('weights')
	    await faceapi.nets.faceLandmark68Net.loadFromDisk('weights')

	    // load the image
	    const img = await canvas.loadImage('imgs_src/da.jpeg')

	    // detect the faces with landmarks
	    const results = await faceapi.detectAllFaces(img, faceDetectionOptions)
	        .withFaceLandmarks()
	    // create a new canvas and draw the detection and landmarks
	    const out = faceapi.createCanvasFromMedia(img)
	    faceapi.drawDetection(out, results.map(res => res.detection))
	    faceapi.drawLandmarks(out, results.map(res => res.landmarks), { drawLines: true, color: 'red' })

	    // save the new canvas as image
	    saveFile('faceLandmarkDetection.jpg', out.toBuffer('image/jpeg'))
	    console.log('done, saved results to out/faceLandmarkDetection.jpg')
	}

	run()
}

app.use(express.static('client'));

face_api()
let server = app.listen(8080, () => {
	let host = server.address().address;
    let port = server.address().port;

	console.log(`Express App listening at http://localhost:${port}`);
})

//opn('http://localhost:8080');

