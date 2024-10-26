//credits to the p5js user who made this
//made to run on the user-interactible part of the installation, IE the part the hu-man controls.
// This is a test of the p5LiveMedia webrtc library and associated service.
// Modified by seb to receive only, go to https://editor.p5js.org/sebmorales/sketches/5JAuQ2H_g to broadcast (only)

let otherVideo;
let docInteract = false;
let p5l;
let p5lAudio;
const testArray = [345.4534, 90123.13232322, 920923.2348754];

document.addEventListener("click", function(){ //we get an error saying we cant do no fuckin streaming unless user interacts with webpage, just click to get the receiver started
  //you also gotta click real fuckin quick before the rror happens because otherwise it streams a black window
    console.log("got docInteract");
    docInteract = true;
    sendData(testArray);
})

function setup() {
  createCanvas(600, 400);
  let streamFrom="https://p5livemedia.itp.io/" //REPLACE WITH LOCAL SERVER ADDRESS (OUR OWN)
  let other;// the elem has to be present but can be undifined (or CANVAS OR CAPTURE) 
  p5l = new p5LiveMedia(this, "other", other ,"CART498WRTC",streamFrom);
  p5l.on('stream', gotStream);
  p5l.on('data', gotData);
/*
  //this is for the audio stream coming from the receiver end to play on the sender end (so the user can talk through the remote camera thing)
  //still working on implementing it
  let constraints = {audio: true, video: false};
  createCapture(constraints, function(stream){
    p5lAudio = new p5LiveMedia(this, "CAPTURE", stream, "CART498WRTC");
  })*/
}

function draw() {

  if (otherVideo != null && docInteract) {
    image(otherVideo,0,0,width,height);
  }  
}

// We got a new stream!
function gotStream(stream, id) {
  // This is just like a video/stream from createCapture(VIDEO)
  console.log("gotstream from " + id);
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifiers
  otherVideo.hide();
}

function sendData(dataToSend){
  p5l.send(dataToSend);
}

function gotData(data, id){
  console.log("got data " + data + " from " + id);
}