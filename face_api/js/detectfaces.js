Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
	faceapi.nets.faceExpressionNet.loadFromUri('./models'),
	faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
]).then(start)

function start() {
	let input = document.getElementById("input");
	faceapi.detectSingleFace(input).withFaceExpressions().then(x => console.log(x.expressions));
	console.log('loaded.');
}