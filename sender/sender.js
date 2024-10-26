//credits to the p5js user who made the base template for sending and receiving video
//this is the "sender" part of the installation, i.e the remote controlled camera the user controls using the other part of the installation.
// This is a test of the p5LiveMedia webrtc library and associated service.
// Modified by seb to send only, go to https://editor.p5js.org/sebmorales/sketches/bEdJewJpJ to receive (only)
//TO RUN THIS RUN A LIVE SERVER WITH VS CODE, THEN OPEN A WINDOW FOR SENDER.HTML AND A WINDOW FOR RECEIVER.HTML
//TODO: check if audio is recorded and sent properly from and to both ends

let myVideo;
let p5lData;

function setup() {
  createCanvas(600, 400);
    let streamTo="https://p5livemedia.itp.io/" //REPLACE WITH LOCAL SERVER ADDRESS
    let constraints = {audio: true, video: true};
    myVideo = createCapture(constraints, 
      function(stream) {
        let p5l = new p5LiveMedia(this, "CAPTURE", stream, "CART498WRTC",streamTo);
        p5l.on('stream', gotStream);
        p5l.on('data', gotData);
        //p5l.on('streamAudio');
      }
    );  
    myVideo.muted = true;     
    myVideo.hide();

    //p5lData = new p5LiveMedia(this, "DATA", null, "CART498WRTC");
    //p5lData.on('data', gotData);
}

function draw() {
  background(220);
  stroke(255);
  if (myVideo != null) {
    //image(myVideo,0,0,width,height);
  }
}

function gotData(data, id){
  console.log("got data " + data + " from " + id);
}

function gotStream(stream, id){
  console.log("got stream from " + id);
}