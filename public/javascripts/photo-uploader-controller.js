/*This controller will handle the auto-populating of the canvas with input 
change*/
import savePictureController from './save-picture-controller.js';

let mousePosition = {left:0, top:0};
let previousMousePosition = {left:0, top:0};
let photoPosition = {left: 0, top:0};
let hasBeenSaved = false;
const colorCanvasBackground = (canvas, context) =>{
	/*context.beginPath();
	context.rect(0,0,canvas.width, canvas.height );
	context.fillStyle = "rgba(0,0,0,.5)";
	context.stroke();*/
}
const drawFrame = (canvasImage, left, top, radius, context, circle, canvas, savePhoto) =>{
	console.log("drawFrame");
	if(circle){
		//colorCanvasBackground(canvas, context)
	}
	if(hasBeenSaved){

	}
	context.save();
	//context.restore();
	context.beginPath();
	context.arc(left, top, radius, 0, 2 * Math.PI);
	context.lineWidth=3;
	context.strokeStyle="gray";
	if(savePhoto){
		context.clip();
		context.strokeStyle = "transparent";		
	}else{
		context.restore();
	}
	context.drawImage(canvasImage, photoPosition.left, photoPosition.top);

	if(circle){
		console.log("is a circle");
		context.stroke();	
	}
	context.save();
}

const drawCanvas = (canvasImage, left, top, radius, context, canvas, circle, savePhoto) =>{
	console.log("drawCanvas()");
	///context.save();
	context.clearRect(0,0,canvas.width, canvas.height);
	drawFrame(canvasImage, left, top, radius, context,circle ,canvas, savePhoto);
};

const pictureEditor = function(fileBrowser, profileCanvas, circle, button){
	console.log("photo-uploader-controller");
	let context = profileCanvas.getContext("2d");
	let canvasImage = new Image();
	let canvasClicked = false;
	let firstClick = false;
	let currentContext = this;
	let canvasMiddleLeft = profileCanvas.width/2;
	let canvasMiddleTop = profileCanvas.height/2;
	let radius = canvasMiddleLeft/2;

	this.profileCanvasOnMouseDown = function(event){
		console.log('profileCanvasOnMouseDown()');
		console.log(event);
		let rect = event.srcElement.getBoundingClientRect();
		let position = {left:event.clientX,top:event.clientY};
		currentContext.setPreviousMousePosition(position, rect);
		drawCanvas(canvasImage, canvasMiddleLeft, canvasMiddleTop, radius, context , profileCanvas, circle, false);
		canvasClicked = true;
	}

	this.profileCanvasOnMouseMove = function(event){
		if(canvasClicked){
			console.log("drug");
			let rect = event.srcElement.getBoundingClientRect();
			let position = {left:event.clientX,top:event.clientY};
			let diff = currentContext.getMousePositionDiff(position, rect);
			currentContext.setPhotoPosition(diff);
			drawCanvas(canvasImage, canvasMiddleLeft, canvasMiddleTop, radius, context  , profileCanvas, circle, false );
		}
	}

	this.profileCanvasOnMouseUp = function(event){
		canvasClicked = false;
	}

	this.setPreviousMousePosition = function(event, boundingRect){
		console.log("setPreviousMousePosition()");
		previousMousePosition= {left:((event.left - boundingRect.left)),
		top: ((event.top - boundingRect.top))};
		mousePosition = previousMousePosition;
	}

	this.getMousePositionDiff = function(event, boundingRect){
		console.log("getCanvasPosition()");
		mousePosition = {left:((event.left - boundingRect.left)),
		top: ((event.top - boundingRect.top))};
		let diff = {left: mousePosition.left - previousMousePosition.left, 
			top: mousePosition.top - previousMousePosition.top};
		previousMousePosition = mousePosition;
		return diff;
	}

	this.setPhotoPosition = function(diff){
		console.log("setPhotoPosition()");
		photoPosition = {left: photoPosition.left+diff.left, top: photoPosition.top+diff.top};
	}
	//loadImage()
	this.loadImage = function(){
		console.log("loadImage()");
		let imageUrl = window.URL.createObjectURL(fileBrowser.files[0]);
		canvasImage.src=imageUrl;
		canvasImage.id='profile-picture';
		canvasImage.onload = function(){
			photoPosition = {left: 0, top:0};
			drawCanvas(canvasImage, canvasMiddleLeft, canvasMiddleTop, radius, context , profileCanvas, circle, false);

			profileCanvas.addEventListener('mousedown',(event) =>{
				currentContext.profileCanvasOnMouseDown(event);
			});

			profileCanvas.addEventListener('mousemove', function(event){
				currentContext.profileCanvasOnMouseMove(event);
			});

			window.addEventListener('mouseup', function(event){
				currentContext.profileCanvasOnMouseUp(event);
			});
		}
	}

	//Binds a function to the input event
	fileBrowser.addEventListener("input", ()=>{
		console.log("file uploader interaction detected");
		currentContext.loadImage();
	});

	button.addEventListener("click", () =>{
		console.log("saveButton");
		this.drawCanvas(canvasImage, canvasMiddleLeft, canvasMiddleTop, 
			radius, context  , profileCanvas, circle, true);
		savePictureController.savePhoto(profileCanvas);
	});
};

export default { pictureEditor, drawCanvas, drawFrame, colorCanvasBackground };