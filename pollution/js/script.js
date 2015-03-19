cv = document.getElementById("splash");
var ct = cv.getContext("2d");

var imgData=ct.getImageData(0,0,400,200);
seedfire();

/* setting this interval allows you to adjust performance */
setInterval(updatebuffer, 2);

var iterations = 0;
function updatebuffer() {
	seedfire();
	if (iterations == 2) {
		animatefire();
	}
	if (iterations == 4) {
		flip();
	}
	if (iterations == 4) {
		iterations = 0;
	} else {
		iterations++;
	}
}

function flip() {
	ct.putImageData(imgData,0,2);
}

function seedfire() {
  for (i=0; i<10; i++) {
		x = Math.round(Math.random() * (400 - 0) + 0,1);
		r = Math.round(Math.random() * (255 - 200) + 200,1);
		g = Math.round(Math.random() * (255 - 0) + 0,1);
		b = Math.round(Math.random() * (255 - 0) + 0,1);
		a = Math.round(Math.random() * (240 - 100) + 100,1);
	        setPixelOnCanvas(x,200,r,g,b,a);
  }
}
function animatefire() {
  for (y=199; y>140; y--) {
    for (x=0; x<400; x++)  {      
      rgbaleft  = getPixelFromCanvas(x-1, y);
      rgbaright = getPixelFromCanvas(x+1, y);
      rgbadown  = getPixelFromCanvas(x, y+1);
      
      averagered   =  rgbaleft[0] + rgbaright[0] + rgbadown[0];
      averagegreen = rgbaleft[1] + rgbaright[1] + rgbadown[1];
      averageblue  = rgbaleft[2] + rgbaright[2] + rgbadown[2];
      averagealpha  = rgbaleft[3] + rgbaright[3] + rgbadown[3];
	
	averagered = Math.round(averagered / 3, 1);
	averagegreen = Math.round(averagegreen / 3, 1);
	averageblue = Math.round(averageblue / 3, 1);
	averagealpha = Math.round(averagealpha / 3, 1);
	averagealpha -= 1;
        setPixelOnCanvas(x,y,averagered,averagegreen,averageblue,averagealpha);

    }
  }

}
function setPixelOnCanvas(x,y,r,g,b,a) {
          offset = (y - 1) * 400 * 4 + (x * 4);
          imgData.data[offset] = r;
          imgData.data[offset + 1] = g;
          imgData.data[offset + 2] = b;
          imgData.data[offset + 3] = a;  
}
function getPixelFromCanvas(x, y){
        offset = (y - 1) * 400 * 4 + (x * 4);
 	chunk = new Array();
	chunk[0] = imgData.data[offset];
	chunk[1] = imgData.data[offset + 1];
	chunk[2] = imgData.data[offset + 2];
	chunk[3] = imgData.data[offset + 3];
	return chunk;
}






/* the functions below are slow as fuck but here as an example */

/*
function setPixelOnCanvas(x,y,r,g,b,a) {
  
        mynewpixel = ct.createImageData(1,1);
        mynewpixeldata = mynewpixel.data;
          mynewpixeldata[0] = r;
          mynewpixeldata[1] = g;
          mynewpixeldata[2] = b;
          mynewpixeldata[3] = a;
		ct.putImageData(mynewpixel, x, y);
  
}
function getPixelFromCanvas(x, y){
	pixel = ct.getImageData(x, y, 1, 1);
	data = pixel.data;
	return data;
}
*/
