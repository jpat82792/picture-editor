
console.log("savePhotoController");

let savePhotoReqController = (req, res, next) =>{
  console.log("savePhotoReqController()");
  try{
    let image = req.body.data.picture;
    console.log(image);
    res.status(200).send({data:"og"});
  }
  catch(err){
    console.error(err);
  }
}

module.exports = {
  savePhotoReqController: savePhotoReqController
}