console.log("main.js");
import pictureEditorController from './photo-uploader-controller.js';

	let fileBrowser = document.getElementById("uploader");
	let profileCanvas = document.getElementById("square-frame");
pictureEditorController.pictureEditor(fileBrowser, profileCanvas);