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

	this.gl.clearColor(0, 0, 1, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	//interface
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.light5 = true;
	this.speed = 0;

    this.textures = 'Rock';

	this.paused = false;

	// Scene elements
	this.submarine = new MySubmarine(this);
	this.plan = new MyQuad(this, 0, 5, 0, 5);
	this.clock = new MyClock(this, 20, 1);
	this.cylinder = new MyCylinder(this, 20, 1);
	this.floor = new MyQuad(this, 0, 10, 0, 12);

	this.target1 = new MyTarget(this, 3, 4);
	this.target2 = new MyTarget(this, 7, 6);
	this.targets = [this.target1, this.target2];

	this.torpedos = [new MyTorpedo(this, this.submarine.positionX, this.submarine.positionY-1, this.submarine.positionZ, this.submarine.rotationAngle, 0)];

	this.destroy = false;

	// Materials

	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.oceanAppearance.setDiffuse(0.3, 0.3, 0.7, 1);
	this.oceanAppearance.setSpecular(0.7, 0.7, 0.7, 1);
	this.oceanAppearance.setShininess(200);
	this.oceanAppearance.loadTexture('../resources/images/ocean3.jpg');
	this.oceanAppearance.setTextureWrap('REPEAT, REPEAT');

	this.postAppearance = new CGFappearance(this);
	this.postAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.postAppearance.setDiffuse(0.7, 0.5, 0.2, 1);
	this.postAppearance.setSpecular(0.7, 0.7, 0.7, 1);
	this.postAppearance.setShininess(200);

	//board B
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.3,0.3,0.7,1);
	this.boardAppearance.setShininess(200);
	this.boardAppearance.loadTexture('../resources/images/board.png');

	this.setUpdatePeriod(100);
};

LightingScene.prototype.pauseContinue = function(){

	if (this.paused){
		this.paused = false;
	}
	else if(!this.paused){
		this.paused = true;
	}
	else{}
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	//this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
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

	if (this.light1)
		this.lights[0].enable();
	if (this.light2)
		this.lights[1].enable();
	if (this.light3)
		this.lights[2].enable();
	if (this.light4)
		this.lights[3].enable();
	if (this.light5)
		this.lights[4].enable();

	if (!this.light1)
		this.lights[0].disable();
	if (!this.light2)
		this.lights[1].disable();
	if (!this.light3)
		this.lights[2].disable();
	if (!this.light4)
		this.lights[3].disable();
	if (!this.light5)
		this.lights[4].disable();
};

LightingScene.prototype.update = function(currTime){

	this.removeTarget();

    this.submarine.changeTexture();

	this.clock.update(currTime, this.paused);
	this.submarine.update(currTime);
	this.torpedos[0].update(currTime);

};

LightingScene.prototype.removeTarget = function(){
	//remove first element

	if (this.destroy){
		this.targets.shift();
		this.torpedos.pop();
		this.torpedos.push(new MyTorpedo(this, this.submarine.positionX, this.submarine.positionY-1, this.submarine.positionZ, this.submarine.rotationAngle));

		this.destroy = false;
	}
}

LightingScene.prototype.display = function() {

	this.submarine.move();

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

	// ---- END Background, camera and axis setup

	// ---- BEGIN Primitive drawing section

	for(var i=0; i<this.targets.length; i++){
		this.pushMatrix();
				this.targets[i].display();
		this.popMatrix();
	}

	this.pushMatrix();

		this.translate(this.submarine.positionX, this.submarine.positionY, this.submarine.positionZ);

		this.rotate(this.submarine.rotationAngle, 0, 1, 0);
		this.rotate(this.submarine.rotationAngle3, 1, 0, 0);

		if (this.torpedos[0].attached){
			this.pushMatrix();
				this.translate(0, -1, 0);
				this.torpedos[0].display();
			this.popMatrix();
		}

        this.submarine.display();

    this.popMatrix();

	this.pushMatrix();

		//tratar das curvas de bezier

		if (!this.torpedos[0].attached){

			this.translate(this.torpedos[0].positionX, this.torpedos[0].positionY, this.torpedos[0].positionZ);
			this.rotate(this.torpedos[0].horizontalRotAngle, 0, 1, 0);			
			this.rotate(this.torpedos[0].verticalRotAngle, 1, 0, 0);
			this.torpedos[0].display();
		}

		//display
        

    this.popMatrix();

    //chao
	this.pushMatrix();
		this.translate(0, -250, 0);
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

    //teto
    this.pushMatrix();
		this.translate(0, 250, 0);
		this.rotate(Math.PI/2, 1, 0, 0);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

    //tras
    this.pushMatrix();
		this.translate(0, 0, -250);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

    //frente
    this.pushMatrix();
		this.translate(0, 0, 250);
		this.rotate(Math.PI, 1, 0, 0);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

    //esquerda
    this.pushMatrix();
		this.translate(-250, 0, 0);
		this.rotate(Math.PI/2, 0, 1, 0);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

    //direita
    this.pushMatrix();
		this.translate(250, 0, 0);
		this.rotate(-Math.PI/2, 0, 1, 0);
		this.scale(500, 500, 1);
		this.oceanAppearance.apply(); //resize image
		this.plan.display();
	this.popMatrix();

	//poste
	this.pushMatrix();
		this.translate(8, 0, 0.1);
		this.scale(0.1, 4, 0.1);
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.postAppearance.apply();
		this.cylinder.display();
	this.popMatrix();

	//clock
	this.pushMatrix();
		this.translate(8, 5, 0);
		this.scale(1, 1, 0.2);
		this.clock.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};
