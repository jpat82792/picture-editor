import requestController from './request-controller.js';

let savePhoto = function(canvas){
	let image = canvas.toDataURL("image/png")
	  .replace("image/png", "image/octet-stream");
	//window.location.href=image;
  let jsonMessage = {data:{picture: image}};
  requestController.sendPostRequest(window.location.href, jsonMessage);
};


export default {savePhoto};