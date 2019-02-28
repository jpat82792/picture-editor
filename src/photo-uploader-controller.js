/*This controller will handle the auto-populating of the canvas with input 
change*/

function pictureEditor(fileBrowser, profileCanvas){
	console.log("photo-uploader-controller");
	/*Variables*/
	//file browser
	/*let fileBrowser = document.getElementById("uploader");
	let profileCanvas = document.getElementById("square-frame");*/
	let context = profileCanvas.getContext("2d");
	let canvasImage = new Image();
	let photoPosition = {left: 0, top:0};
	let previousMousePosition = {left:0, top:0};
	let canvasClicked = false;
	let firstClick = false;

	//
	this.drawCanvas = function(){
		console.log("drawCanvas()");
		context.clearRect(0,0,profileCanvas.width, profileCanvas.height);
		context.drawImage(canvasImage, photoPosition.left, photoPosition.top);
	}

	this.profileCanvasOnMouseDown = function(event){
				console.log('profileCanvasOnMouseDown()');
				console.log(event);
				let rect = event.srcElement.getBoundingClientRect();
				let position = {left:event.clientX,top:event.clientY};
				setPreviousMousePosition(position, rect);
				context.clearRect(0,0,profileCanvas.width, profileCanvas.height);
				context.drawImage(canvasImage, photoPosition.left,  photoPosition.top);
				canvasClicked = true;
	}

	this.profileCanvasOnMouseMove = function(event){
		console.log("profileCanvasOnMouseMove()");
		if(canvasClicked){
			console.log("drug");
			let rect = this.getBoundingClientRect();
			let position = {left:event.clientX,top:event.clientY};
			let diff = getMousePositionDiff(position, rect);
			setPhotoPosition(diff);
			drawCanvas();
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
			context.drawImage(canvasImage, 0, 0);

			profileCanvas.addEventListener('mousedown',(event) =>{
				profileCanvasOnMouseDown(event);
			});

			profileCanvas.addEventListener('mousemove', function(event){
				profileCanvasOnMouseMove(event);
			});

			window.addEventListener('mouseup', function(event){
				profileCanvasOnMouseUp(event);
			});
		}
	}

	//Binds a function to the input event
	fileBrowser.addEventListener("input", ()=>{
		console.log("file uploader interaction detected");
		loadImage();
	});
}

module.exports = pictureEditor;