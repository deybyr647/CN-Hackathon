Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri('./'),
	faceapi.nets.faceLandmark68Net.loadFromUri('./'),
	faceapi.nets.faceExpressionNet.loadFromUri('./'),
	faceapi.nets.ssdMobilenetv1.loadFromUri('./'),
]).then(start)

function start() {
	let input = document.getElementById("input");
	faceapi.detectSingleFace(input).withFaceExpressions().then(x => console.log(x.expressions));
	console.log('loaded.');
}