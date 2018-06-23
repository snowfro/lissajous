
var key = "abcdef0123456789";
var xhr = new XMLHttpRequest();
let allSlices = [];
let allSlicesSmall = [];
let hash = "0x0";
let responseOld = "";
var myp5="";
let img = "";


/*var a = document.createElement("img");
a.src = "qr.png";
a.height = 800;
a.width = 800;*/



function pingContract() {
xhr.open('GET', "http://art-blocks-endpoints.whatsthescore.webfactional.com/0x53A3B5121C17C4d6b616072bf55f23356E9f8956", true);
xhr.send();

xhr.onreadystatechange = processRequest;}

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}


function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

function hexToDec(hex) {
  var smallInt = parseInt(hex, 16);
  return smallInt;
}

window.setInterval(function(){
  pingContract()
}, 500);

function processRequest() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        //document.open();

        var response = xhr.responseText;
        //console.log("hash" + response);
        //console.log("old" + responseOld);
         if (response === "0x0000000000000000000000000000000000000000000000000000000000000000"){

           if (myp5){
             myp5.remove();}


          document.getElementById("display").innerHTML = "<img src='qr.jpg'>";
        //console.log(response);
        } else {
        if (responseOld != response) {


        //let testTop = 0;
        //let testMid = 0;
        //let testBot = 0;
        allSlices = [];
        allSlicesSmall = [];
        //rgbSlices = [];
        //hash = response;


        //console.log(response);
        //document.write("Hash is " + response + "<br>");

          //let rgbvals = response.slice(5,11);
          //document.body.style.backgroundColor = rgbvals;

          for (let i = 2; i<response.length; i = i+2) {
            let hexSlice = response.slice(i,i+2);
            let sliceRGB = hexToRgb(hexSlice);
            let sliceDec = hexToDec(hexSlice);
            let sliceDecSmall = convertRange(sliceDec, [0,255], [0,1] );
            let sliceRange = convertRange(sliceDec, [0,255], [1,100]);
            allSlices.push(sliceDec);
            allSlicesSmall.push(sliceDecSmall);
}


           /*for (let i = 2; i<response.length; i = i+2) {
            let hexSlice = response.slice(i,i+2);
            let sliceDec = hexToDec(hexSlice);
            allSlices.push(sliceDec);
}
for (let i = 2; i<response.length; i = i+2) {
  let hexSlice = response.slice(i,i+2);
  let sliceDec = hexToDec(hexSlice);
  allSlices.push(sliceDec);
}
for (let i = 2; i<response.length; i = i+2) {
  let hexSlice = response.slice(i,i+2);
  let sliceDec = hexToDec(hexSlice);
  allSlices.push(sliceDec);
}
for (let i = 2; i<response.length; i = i+2) {
  let hexSlice = response.slice(i,i+2);
  let sliceDec = hexToDec(hexSlice);
  allSlices.push(sliceDec);
} */



//document.write("Low: " + testTop + "<br>");
//document.write("Mid: " + testMid + "<br>");
//document.write("Top: " + testBot + "<br>");

//for (let i = 0; i<allSlices.length; i++){


//document.write(allSlices[i] + "<br>");}
if (!myp5){
document.getElementById("display").innerHTML = myp5 = new p5(sketch);
} else {
myp5.remove();
document.getElementById("display").innerHTML = myp5 = new p5(sketch);
}




}

    }
    responseOld = response;
  }

}
