let savePhoto = function(canvas){
	let image = canvas.toDataURL("image/png")
	  .replace("image/png", "image/octet-stream");
	window.location.href=image;
};


export default {savePhoto};