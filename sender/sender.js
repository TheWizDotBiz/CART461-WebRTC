//credits to the p5js user who made the base template for sending and receiving video
//this is the "sender" part of the installation, i.e the remote controlled camera the user controls using the other part of the installation.
// This is a test of the p5LiveMedia webrtc library and associated service.
// Modified by seb to send only, go to https://editor.p5js.org/sebmorales/sketches/bEdJewJpJ to receive (only)

let myVideo;
let p5lData;

function setup() {
  createCanvas(600, 400);
    let streamTo="https://p5livemedia.itp.io/" //REPLACE WITH LOCAL SERVER ADDRESS

    myVideo = createCapture(VIDEO, 
      function(stream) {
        let p5l = new p5LiveMedia(this, "CAPTURE", stream, "CART498WRTC",streamTo);
        p5l.on('stream');
        p5l.on('data', gotData);
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
    image(myVideo,0,0,width,height);
  }
}

function gotData(data, id){
  console.log("got data " + data + " from " + id);
}