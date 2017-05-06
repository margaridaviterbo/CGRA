var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -1, 2, -1, 2);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 200, 200);
	this.clock = new MyClock(this, 12, 1);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, 0, 1, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);

	// Materials
	this.materialDefault = new CGFappearance(this);

	// Walls
	this.wall2Material = new CGFappearance(this);
	this.wall2Material.setAmbient(0.3,0.3,0.3,1);
	this.wall2Material.setDiffuse(0.39,0.58,0.92,1);
	this.wall2Material.setSpecular(0.5,0.5,0.5,1);
	this.wall2Material.setShininess(120);

	this.wallpaper = new CGFappearance(this);
	this.wallpaper.setAmbient(0.3,0.3,0.3,1);
	this.wallpaper.setDiffuse(1,1,1,1);
	this.wallpaper.setSpecular(0.7,0.7,0.7,1);
	this.wallpaper.setShininess(100);
	this.wallpaper.loadTexture('../resources/images/wallpaper.jpg');
	
	// Floor
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture('../resources/images/floor.png');
	this.floorAppearance.setTextureWrap('REPEAT','REPEAT');

	//colum
	this.columnMaterial = new CGFappearance(this);
	this.columnMaterial.setAmbient(0.3,0.3,0.3,1);
	this.columnMaterial.setDiffuse(0.4,0.4,0.4,1);
	this.columnMaterial.setSpecular(1,1,1,1);
	this.columnMaterial.setShininess(200);
	this.columnMaterial.loadTexture('../resources/images/column.jpg');


	//column texture
	this.columnTexture = new CGFappearance(this);this.columnTexture.setAmbient(0.3,0.3,0.3,1);
	this.columnTexture.setDiffuse(0.5,0.5,0.4,1);
	this.columnTexture.setSpecular(1,1,1,1);
	this.columnTexture.setShininess(200);
	this.columnTexture.loadTexture('../resources/images/column.jpg');

	//lamp
	this.lampMaterial = new CGFappearance(this);
	this.lampMaterial.setAmbient(0.3,0.3,0.3,1);
	this.lampMaterial.setDiffuse(1,0.8,0,1);
	this.lampMaterial.setSpecular(1,1,1,1);
	this.lampMaterial.setShininess(200);

	//Window
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture('../resources/images/window.png');
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	//board A
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(1,1,1,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(5);
	this.slidesAppearance.loadTexture('../resources/images/slides.png');
	
	//board B 
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.7,0.7,0.7,1);
	this.boardAppearance.setShininess(200);
	this.boardAppearance.loadTexture('../resources/images/board.png');

	this.setUpdatePeriod(100);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(0.1, 6.0, 7.5, 1.0);
	this.lights[4].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 1, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1, 1, 0, 1.0);
	this.lights[4].setConstantAttenuation(0);
	this.lights[4].setLinearAttenuation(0);
	this.lights[4].setQuadraticAttenuation(1);
	this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};

LightingScene.prototype.update = function(currTime){
	this.clock.update(currTime);
};

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	// ---- BEGIN Primitive drawing section

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallpaper.apply();
		this.wall.display();
	this.popMatrix();
/*
	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply(); //change
		this.boardB.display();
	this.popMatrix();

	//columnPrism
	this.pushMatrix();
		this.translate(12, 0, 12);
		this.scale(0.7, 8, 0.7);
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.columnTexture.apply();
		this.prism.display();
	this.popMatrix();

	//columnCylinder
	this.pushMatrix();
		this.translate(5, 0, 12);
		this.scale(0.7, 8, 0.7);
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.columnMaterial.apply();
		this.cylinder.display();
	this.popMatrix();

	//lamp
	this.pushMatrix();
		this.translate(7, 8, 7);
		this.rotate(Math.PI, 0, 0, 1);
		this.lampMaterial.apply();
		this.lamp.display();
	this.popMatrix();
*/
	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	//clock
	this.pushMatrix();
		this.translate(7.3, 7.2, 0);
		this.scale(0.7, 0.7, 0.2);
		this.clock.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};