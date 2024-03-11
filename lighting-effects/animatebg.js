/* 
   Animatebg.js for CodePen Demo: http://codepen.io/tmrDevelops/pen/EaKZKL
   
*/
var BAR_WIDTH = 30;
var BAR_SPEED = 0.5;
var MAX_ANGLE = Math.PI / 32;
var COLOR_STEP = 0.01;

function AnimateBG(canvasId, bgImg) {
	var c = document.getElementById(canvasId);
	
	var bgImgReady = false;
	var backgroundImage = new Image();
	backgroundImage.onload = imageLoaded;
	backgroundImage.src = bgImg;
	
	var colors = new Array();
	colors.push(new Color(200, 160, 150));
	colors.push(new Color(230, 160, 90));
	colors.push(new Color(230, 240, 90));
	colors.push(new Color(100, 240, 190));
	colors.push(new Color(100, 170, 220));
	colors.push(new Color(200, 100, 220));
	
	var nextColorIndex = 0;
	var activeColor = colors[nextColorIndex++];
	
	var leftOffset = 0 - BAR_WIDTH;

	var angle = MAX_ANGLE;
	var angleAdjust = Math.PI / 3600;
	
	this.start = function() {
		backgroundImageReady();
	}
	
	function imageLoaded() {
		bgImgReady = true;
	}
	
	function backgroundImageReady() {
	    if (!bgImgReady) {
	        setTimeout(backgroundImageReady,100);

	    } else {
	    	beginAnimateBackground();
		}
	}

	function beginAnimateBackground() {
		var $ = c.getContext('2d');
		$.drawImage(backgroundImage, 0, 0, c.width, c.height);

		if (activeColor.fadeTo(colors[nextColorIndex])) {
			activeColor = colors[nextColorIndex++];
			if (nextColorIndex >= colors.length) {
				nextColorIndex = 0;
			}
		}

		$.globalAlpha = 0.6;
		$.fillStyle = 'rgb(' + activeColor.getRGB() + ')';
		$.fillRect(0, 0, c.width, c.height);
		
		$.save();
		$.globalAlpha = 0.25;
		
		$.translate(c.width / 2, c.height / 2);
		$.rotate(angle += angleAdjust);
		
		for (var i = leftOffset; i < c.width + 600; i += (BAR_WIDTH * 2)) {
			$.fillRect(i - (c.width / 2), 0 - (c.height / 2) - 200, BAR_WIDTH, c.height + 400);
		}

		if (angle > MAX_ANGLE || angle < 0 - MAX_ANGLE) {
			angleAdjust = 0 - angleAdjust;
		}
		
		leftOffset -= BAR_SPEED;
		if (leftOffset + BAR_WIDTH * 2 + 300 < 0) {
			leftOffset += BAR_WIDTH * 2;
		}

		$.restore();
		setTimeout(beginAnimateBackground,0);
	}
}

function Color(r,g,b) {
	this.r = r;
	this.g = g;
	this.b = b;
	
	this.step = COLOR_STEP;
	
	this.fadeTo = function(color) {
		this.r = this.r + ((color.r - this.r) * this.step);
		this.g = this.g + ((color.g - this.g) * this.step);
		this.b = this.b + ((color.b - this.b) * this.step);
		
		this.step += COLOR_STEP;
		
		if (this.r == color.r &&
				this.g == color.g &&
				this.b == color.b) {
					
			this.step = COLOR_STEP;
			return true;
		}
		return false;
	}
	
	this.getRGB = function() {
		return Math.round(this.r) + "," +
				Math.round(this.g) + "," +
				Math.round(this.b);
	}
}