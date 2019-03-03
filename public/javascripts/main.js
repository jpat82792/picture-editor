console.log("main.js");
import pictureEditorController from './photo-uploader-controller.js';


	let fileBrowser = document.getElementById("uploader");
	let profileCanvas = document.getElementById("square-frame");
	let saveButton = document.getElementById("save-button");
	let canvasMiddleLeft = profileCanvas.width/2;
	let canvasMiddleTop = profileCanvas.height/2;
	let radius = canvasMiddleLeft/2;

	pictureEditorController.pictureEditor(fileBrowser, profileCanvas , true, saveButton);
		//canvasMiddleLeft, canvasMiddleTop, radius);