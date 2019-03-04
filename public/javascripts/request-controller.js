console.log("requestController()");

let sendGetRequest = (url) => {
	console.log("sendGetRequest()");
};

let sendPostRequest = (url, jsonBody) => {
	console.log("sendPostRequest()");
  let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("POST", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState>3 && xhr.status==200) { 
      success(xhr.responseText); 
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(jsonBody));
}

export default {sendGetRequest, sendPostRequest}