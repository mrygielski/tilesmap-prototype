var map = new Array();
var map_items = new Array();
var map_coll = new Array();
var mouseX = 0;
var mouseY = 0;
var tileDict = Array("img/trawka.png","img/trawka2.png","img/trawka3.png","img/ulica.png","img/ulica.png");
var tileDictItems = Array("img/wall.png","img/wall.png","img/wall3.png","img/wall4.png","img/wall5.png");
var tileImg = new Array();
var tileImgItems = new Array();

var imagesArray = Array(["img/wall.png",50,50,1,1,0,0,0,2,1,1,1,1,1,1,1,0,1,1,1],
                        ["img/wall2.png",100,100,2,2,0,10,1,4,4,3,2,2,1,3,2,1,3,3,4],
                        ["img/wall3.png",150,150,3,3,0,0,2,6,6,4,3,3,2,4,2,2,5,4,6],
                        ["img/wall4.png",200,200,5,3,0,10,3,8,9,6,4,4,2,5,3,4,7,5,9],
                        ["img/wall5.png",250,150,6,4,0,10,5,7,9,4,2,4,2,4,1,5,6,4,9],
                        ["img/wall6.png",250,150,6,4,0,10,5,7,9,4,2,4,1,4,1,5,6,4,9]);
						
var imagesItemsArray = Array([0,1],
                             [1,2],
                             [2,3],
                             [3,4],
                             [4,5],
							 [5,6]);

var loaded = 0;
var loadTimer;
var ymouse;
var xmouse;
var mapX = 300;
var mapY = 0;
var playerX = 4;
var playerY = 4;
var mapXD;
var mapYD;

var frameWidth = 722;
var frameHeight = 600;

var no = 1;
var noTerrain = 1;
var checkAreaX = 0;
var checkAreaY = 0;

var ItemPosX = 0;
var ItemPosY = 0;

var DropX = 0;
var DropY = 0;


var tileH = 25;
var tileW = 25;

var tileItemW = 50;
var tileItemH = 25;
                      
var maxX = 1;
var maxY = 1;

var ImageOtherX = 0;
var ImageOtherY = 0;

var czyKlik = false;
var numerObiektu = 0;

var kolizja = false;

var objectTypeSelect = 1;

var kasowanie = 0;

function loadImg(){

	for(var i=0;i<tileDict.length;i++){
		tileImg[i] = new Image();
		tileImg[i].src = tileDict[i];
		tileImg[i].onload = function(){
			loaded++;
		}
	}

	for(var i=0;i<imagesArray.length;i++){
		tileImgItems[i] = new Image();
		tileImgItems[i].src = imagesArray[i][0];

		tileImgItems[i].onload = function(){
			loaded++;
		}
	}

}

function loadAll(){

	var suma = tileDict.length + tileImgItems.length;

	if(loaded == suma){
		clearInterval(loadTimer);
		loadTimer = setInterval(gameUpdate,50);
	}

}

function gameUpdate(){
	ctx.clearRect(0,0,frameWidth,frameHeight);

	drawMap();
}

function mouseCheck(e){
	var x = e.pageX;
		var y = e.pageY;
	  
	mouseX = x-canvas.offsetLeft;
	mouseY = y-canvas.offsetTop;

	ymouse=(2*(y-canvas.offsetTop-mapY)-x+canvas.offsetLeft+mapX)/2;
	xmouse=x+ymouse-mapX-25-canvas.offsetLeft
	ymouse=Math.round(ymouse/25);
	xmouse=Math.round(xmouse/25);
		
 	document.title = "posX:" + xmouse + " | posY:" + ymouse;
}

function checkItemTiles(x, y, nr) {
	var xx = false;

	maxX = imagesArray[nr][3];
	maxY = imagesArray[nr][4];

	for (var i = 0; i < maxX; i++)
	for (var j = 0; j < maxY; j++)
	if (map_items[(x+i)*50+(y+j)] == nr) xx = true;
	
	if (xx) return true; else return false;
}

function checkItemTiles2(x, y, nr, nr2) {
	var xx = false;

	maxX = imagesArray[nr][3];
	maxY = imagesArray[nr][4];

	for (var i = 0; i < maxX; i++)
	for (var j = 0; j < maxY; j++)
	if (map_items[(x+i)*50+(y+j)] == nr2) xx = true;


	if (xx) return true; else return false;
}

function addRect(x, y, w, h, fill) {
	ctx.strokeStyle = fill;
	ctx.strokeRect(x, y, w, h);
}

function checkArea(x, y, x1, y1, x2, y2) {
  
  if ((x>=x1) && (x<=x2) && (y>=y1) && (y<=y2)) return true; else return false;

}
    
function drawMap(){

	if (objectTypeSelect == 0) document.getElementById('IDselectObjectType').innerHTML = 'podłoże';
	if (objectTypeSelect == 1) document.getElementById('IDselectObjectType').innerHTML = 'obiekty';

	document.getElementById('XX').value = mapX;
	document.getElementById('YY').value = mapY;

	/*************************************************/
	// rysowanie ziemii
	kolizja = false;
	for(i=0;i<50;i++)
	for(j=0;j<50;j++) {

		var drawTile= map[i*50+j];
		var xpos = (i-j)*tileW + mapX;
		var ypos = (i+j)*tileH/2+ mapY;
		ctx.globalAlpha = 1;

		ctx.drawImage(tileImg[drawTile],xpos,ypos);

		if (objectTypeSelect == 0) {

			if(i == xmouse && j == ymouse) {

				if (map_coll[i*50+j] == 1) kolizja = true;
				ctx.drawImage(tileImg[2],xpos,ypos);

			}

		}
	 
	}
	/*************************************************/


	/*************************************************/

	if (no != -1) {
		DropX = imagesArray[no][9];
		DropY = imagesArray[no][10];

		checkAreaX = imagesArray[no][3] - 1;
		checkAreaY = imagesArray[no][4] - 1;
	}
	czyKlik = false;
	
	//sposob wyswietlania trzeba dostosowac moze jakies liczenie ile wartosc ma w X...
	for (var i = 0; i < 50; i++)
	for(var j=0;j<50;j++) {

		var drawTileItem = map_items[j*50+i];
		var xposItem = (j-i)*tileW + mapX;
		var yposItem = (i+j)*tileH/2 + mapY;

		var objectNo = map_items[(j)*50+(i)];

		if (map_items[(j)*50+(i)] != -1) {

			var objectImage = imagesItemsArray[objectNo][0];
			var objectType = imagesItemsArray[objectNo][1];

			MaxX = imagesArray[objectNo][3];
			MaxY = imagesArray[objectNo][4];

			MoveItemX = imagesArray[objectNo][14];
			MoveItemY = imagesArray[objectNo][15];

			tileItemW = imagesArray[objectNo][1];
			tileItemH = imagesArray[objectNo][2];

			xxx = -((tileW) * imagesArray[objectNo][16]);
			yyy = -((tileH) * imagesArray[objectNo][17]);

			xxx0 = -((tileW) * imagesArray[objectNo][18]);
			yyy0 = -((tileH) * imagesArray[objectNo][19]);

			for (var x=0; x<MaxX; x++)
			for (var y=0; y<MaxY; y++) {
				map[(j+(yyy0/tileH)+MoveItemX+x)*50+((i+(xxx0/tileW)+MoveItemY+y))] = 1;
				map_coll[(j+(yyy0/tileH)+MoveItemX+x)*50+((i+(xxx0/tileW)+MoveItemY+y))] = 1;

				var xposItem2 = (x-y)*50/2;
				var yposItem2 = (y+x)*25/2;

				if (checkArea(mouseX, mouseY, ((xposItem+xposItem2+x+xxx)+(imagesArray[objectImage][12]*25)-25),(yposItem+yposItem2+y+yyy)+(imagesArray[objectImage][11]*25)-(25*(imagesArray[objectImage][13]-1)),((xposItem+xposItem2+x+xxx)+(imagesArray[objectImage][12]*25)-25+50),((yposItem+yposItem2+y+yyy)+(imagesArray[objectImage][11]*25)+25))) {

					czyKlik = true;
					numerObiektu = objectImage;
					tmpX = i;
					tmpY = j;

				}
				if (!czyKlik) {

					tmpX = 0;
					tmpY = 0;

				}

				//linie kolizji
				addRect(((xposItem+xposItem2+x)+(imagesArray[objectImage][12]*25)-25)+xxx, ((yposItem+yposItem2+y)+(imagesArray[objectImage][11]*25)-(25*(imagesArray[objectImage][13]-1)))+yyy, 50, 25*imagesArray[objectImage][13], '#FFF');

			}
														
			ctx.globalAlpha = 1;
			
			if ((czyKlik || kolizja) && i == tmpX && j == tmpY) {
			   ctx.globalAlpha = 0.5;
			} else {
			   ctx.globalAlpha = 1;
			}

			ctx.drawImage(tileImgItems[objectImage], xposItem+ImageOtherX+xxx, yposItem+yyy);
		
		}

		document.getElementById('info3').innerHTML = mouseX;

		if (!kasowanie) {

			if (no != -1) {
				
				if(i == ymouse && j == xmouse){

					getImageOtherX = imagesArray[no][5];
					getImageOtherY = imagesArray[no][6];

					setObjectX = imagesArray[no][7];
					setObjectY = imagesArray[no][8];

					if (checkItemTiles(j-DropX,i-DropY,no)) document.getElementById('info').innerHTML = '<span style="color:red">ZAJETE!</span>';
					else

					if (checkItemTiles(j-DropX-checkAreaX, i-DropY, no)) document.getElementById('info').innerHTML = '<span style="color:red">ZAJETE!</span>'; else
					if (checkItemTiles(j-DropX, i-DropY-checkAreaY, no)) document.getElementById('info').innerHTML = '<span style="color:red">ZAJETE!</span>'; else
					if (checkItemTiles(j-DropX-checkAreaX, i-DropY-checkAreaY, no)) document.getElementById('info').innerHTML = '<span style="color:red">ZAJETE!</span>'; else document.getElementById('info').innerHTML = '';

					ctx.globalAlpha = 1;

					if (kolizja) ctx.globalAlpha = 1; else ctx.globalAlpha = 1;

					if (objectTypeSelect == 1) ctx.drawImage(tileImgItems[no], (xposItem)-(setObjectX*tileW), (yposItem)-(setObjectY*tileH-tileH));
				
				}
				
			}

		}

	}
    
		
	var xx = ((xmouse-ymouse+1)*tileW + mapX);
	var yy = ((ymouse+xmouse+1)*tileH/2 + mapY);

	document.getElementById('info').innerHTML = xmouse-1 + "("+xposItem2+")";


	kolizja = false;
	for(ii=0;ii<imagesArray[no][3]; ii++)
	for(jj=0;jj<imagesArray[no][4]; jj++) {

		var xpos3 = ((xx)+(ii-jj)*tileW);
		var ypos3 = ((yy)+(ii+jj)*tileH/2);


		if (map_coll[(xmouse-(imagesArray[no][3]-1)+ii)*50+(ymouse-(imagesArray[no][4]-1)+jj)] == 1) {
			kolizja = true;
		}

	}

	if (kolizja) document.getElementById('info2').innerHTML = "KOLIZJA ("+(xmouse+1+ii)+"|+|"+(ymouse+jj)+")";
	else document.getElementById('info2').innerHTML = "-";

/*************************************************/

	for(i2=0;i2<50;i2++)
	for(j2=0;j2<50;j2++) {

		var xpos11 = i2*5;
		var ypos11 = j2*5;
		
		if (map_coll[i2*50+j2] == -1) {
			ctx2.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx2.beginPath();
			ctx2.moveTo(xpos11, ypos11);
			ctx2.lineTo(xpos11+5, ypos11);
			ctx2.lineTo(xpos11+5, ypos11+5);
			ctx2.lineTo(xpos11, ypos11+5);
			ctx2.fill();
		} else
		if (map_coll[i2*50+j2] == 2) {
			ctx2.fillStyle = 'rgba(255, 255, 0, 0.8)';
			ctx2.beginPath();
			ctx2.moveTo(xpos11, ypos11);
			ctx2.lineTo(xpos11+5, ypos11);
			ctx2.lineTo(xpos11+5, ypos11+5);
			ctx2.lineTo(xpos11, ypos11+5);
			ctx2.fill();
		}
		else {
			ctx2.fillStyle = 'rgba(255, 0, 255, 0.8)';
			ctx2.beginPath();
			ctx2.moveTo(xpos11, ypos11);
			ctx2.lineTo(xpos11+5, ypos11);
			ctx2.lineTo(xpos11+5, ypos11+5);
			ctx2.lineTo(xpos11, ypos11+5);
			ctx2.fill();
		}
		
	}
		
}


function keydownControl(e) {
		
	if (e.keyCode==37) { mapX+=50; } else
	if (e.keyCode==38) { mapY+=50; } else
	if (e.keyCode==39) { mapX-=50; } else
	if (e.keyCode==40) { mapY-=50; }

}


function mouseClick(e){
		
	if (!kasowanie)  {

		if (objectTypeSelect == 1) {

		if (no == -1) {

			if (czyKlik) alert('obiekt numer = '+numerObiektu);

		}
		
		if (no != -1)
		
			xxx2 = -((tileW) * (imagesArray[no][18]));
			yyy2 = -((tileH) * (imagesArray[no][19]));

			if (!kolizja) map_items[(xmouse-DropX-(yyy2/tileW))*50+(ymouse-DropY)-(xxx2/tileH)] = no; 

		}

		if (objectTypeSelect == 0) {
		  
		   if (!kolizja) map[(xmouse)*50+(ymouse)] = 2;

		}

	}

	if (kasowanie) {

		xxx2 = -((tileW) * (imagesArray[numerObiektu][18]));
		yyy2 = -((tileH) * (imagesArray[numerObiektu][19]));
									
		DropX = imagesArray[numerObiektu][9];
		DropY = imagesArray[numerObiektu][10];


		MaxX = imagesArray[numerObiektu][3];
		MaxY = imagesArray[numerObiektu][4];

		MoveItemX = imagesArray[numerObiektu][14];
		MoveItemY = imagesArray[numerObiektu][15];

		tileItemW = imagesArray[numerObiektu][1];
		tileItemH = imagesArray[numerObiektu][2];


		xxx = -((tileW) * imagesArray[numerObiektu][16]);
		yyy = -((tileH) * imagesArray[numerObiektu][17]);

		xxx0 = -((tileW) * imagesArray[numerObiektu][18]);
		yyy0 = -((tileH) * imagesArray[numerObiektu][19]);

		for (var x=0; x<MaxX; x++)
		for (var y=0; y<MaxY; y++) {

			map_coll[(tmpY+(yyy0/tileH)+MoveItemX+x)*50+((tmpX+(xxx0/tileW)+MoveItemY+y))] = -1;

		}

		map_items[(tmpY)*50+(tmpX)] = -1;

	}

}

function mouseTest(e){
	mapX+=xmouse;
}

function init(){
    for(var y = 0; y < 50; y++)
    for(var x = 0; x < 50; x++) map[x*50+y] = 0;

    for(var y = 0; y < 50; y++)
    for(var x = 0; x < 50; x++) map_items[x*50+y] = -1;

    for(var y = 0; y < 50; y++)
    for(var x = 0; x < 50; x++) map_coll[x*50+y] = -1;

	map_items[16*50+14] = 5;

	canvas = document.getElementById('main')
	ctx = canvas.getContext('2d');
	loadImg();
	loadTimer = setInterval(loadAll,100);
	canvas.addEventListener("mousemove", mouseCheck, false);
	canvas.addEventListener("mousedown", mouseClick, false);
	window.onkeydown = keydownControl;
	
	canvas2 = document.getElementById('main2')
	ctx2 = canvas2.getContext('2d');

	document.getElementById('IDselectObjectType').innerHTML = 'podłoże';
}