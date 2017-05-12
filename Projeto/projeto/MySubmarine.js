/**
 * MyClock
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.semiSphere = new MySemiSphere(scene, 20, 20);
    this.base = new MyCylinderBase(scene, 20);
    this.propeller1 = new MyPropeller(scene);
    this.propeller2 = new MyPropeller(scene);
    this.trapezium = new MyTrapezium(scene);

	this.currSubmarineAppearance;

    this.bodyTextures = [];

    this.submarineAppearenceMetal = new CGFappearance(scene);
    this.submarineAppearenceMetal.setAmbient(0.3, 0.3, 0.3, 1);
    this.submarineAppearenceMetal.setDiffuse(0.376, 0.376, 0.376, 1);
    this.submarineAppearenceMetal.setSpecular(1, 1, 1, 1);
    this.submarineAppearenceMetal.setShininess(300);

    this.submarineAppearenceRock = new CGFappearance(scene);
    this.submarineAppearenceRock.setAmbient(0.3, 0.3, 0.3, 1);
    this.submarineAppearenceRock.setDiffuse(0.6, 0.6, 0.6, 1);
    this.submarineAppearenceRock.setSpecular(0.2, 0.2, 0.2, 1);
    this.submarineAppearenceRock.setShininess(10);
    this.submarineAppearenceRock.loadTexture('../resources/images/texture_rock_moss.jpg');
	this.submarineAppearenceRock.setTextureWrap('REPEAT, REPEAT');

    this.submarineAppearenceCoral = new CGFappearance(scene);
    this.submarineAppearenceCoral.setAmbient(0.3, 0.3, 0.3, 1);
    this.submarineAppearenceCoral.setDiffuse(0.7, 0.4, 0.4, 1);
    this.submarineAppearenceCoral.setSpecular(0.7, 0.7, 0.7, 1);
    this.submarineAppearenceCoral.setShininess(150);
    this.submarineAppearenceCoral.loadTexture('../resources/images/coral.jpg');
	this.submarineAppearenceCoral.setTextureWrap('REPEAT, REPEAT');

    this.submarineAppearenceFish = new CGFappearance(scene);
    this.submarineAppearenceFish.setAmbient(0.3, 0.3, 0.3, 1);
    this.submarineAppearenceFish.setDiffuse(0.7, 0.7, 0.7, 1);
    this.submarineAppearenceFish.setSpecular(0.9, 0.9, 0.9, 1);
    this.submarineAppearenceFish.setShininess(200);
    this.submarineAppearenceFish.loadTexture('../resources/images/fish.jpg');
	this.submarineAppearenceFish.setTextureWrap('REPEAT, REPEAT');

	this.bodyTextures[0] = this.submarineAppearenceMetal;
	this.bodyTextures[1] = this.submarineAppearenceRock;
	this.bodyTextures[2] = this.submarineAppearenceCoral;
    this.bodyTextures[3] = this.submarineAppearenceFish;

    //this.rotationAngle = Math.PI*4/5;

    //this.positionX = 5;
    this.positionY = 3;
    //this.positionZ = 5;

    this.rotationAngle = 0;

    this.positionX = 0;
    this.positionZ = 0;

};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.changeTexture = function(){

	if (this.scene.textures == 'Metal') {
        this.currSubmarineAppearance = 0;
	}
	else if (this.scene.textures == 'Rock') {
        this.currSubmarineAppearance = 1;
	}
    else if (this.scene.textures == 'Coral') {
        this.currSubmarineAppearance = 2;;
	}
	else{
        this.currSubmarineAppearance = 3;
	}
};

MySubmarine.prototype.display = function(){

    //cilindro principal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.scale(0.73/2, 1/2, 4.08);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.cylinder.display();
    this.scene.popMatrix();

    //0.92 / 2 = 0.46
    //semiEsfera frontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 2.04);
        this.scene.scale(0.73/2, 1/2, 0.46);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.semiSphere.display();
    this.scene.popMatrix();

    //semiEsfera traseira
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.73/2, 1/2, 0.46);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.semiSphere.display();
    this.scene.popMatrix();

    //cilindro cima
    this.scene.pushMatrix();
        this.scene.translate(0, 0.57/2, 0.88/2);
        this.scene.scale(0.60/2, 0.57, 0.88/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.cylinder.display();

        //tampo cilindro cima
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.bodyTextures[this.currSubmarineAppearance].apply();
            this.base.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

    //espiao xD
    this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.55);

        this.scene.pushMatrix();
            this.scene.scale(0.05, 0.7, 0.05);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.submarineAppearenceMetal.apply();
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0.725, -0.05);
            this.scene.scale(0.05, 0.05, 0.25);
            this.bodyTextures[this.currSubmarineAppearance].apply();
            this.cylinder.display();

            //tampo cima
            this.scene.pushMatrix();
                this.scene.translate(0, 0, 1);
                this.submarineAppearenceMetal.apply();
                this.base.display();
            this.scene.popMatrix();

            //tampo baixo
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.submarineAppearenceMetal.apply();
                this.base.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    this.scene.popMatrix();

    //helice direita
    this.scene.pushMatrix();
        this.scene.translate(0.73/2+0.4/2, -0.25, -2.04);
        this.scene.scale(0.4/2, 0.4/2, 0.4);
        this.scene.translate(0, 0, 0.5);
        this.submarineAppearenceMetal.apply();
        this.propeller1.display();
    this.scene.popMatrix();

    //helice esquerda
    this.scene.pushMatrix();
        this.scene.translate(-0.73/2-0.4/2, -0.25, -2.04);
        this.scene.scale(0.4/2, 0.4/2, 0.4);
        this.scene.translate(0, 0, 0.5);
        this.submarineAppearenceMetal.apply();
        this.propeller2.display();
    this.scene.popMatrix();

    //trapezio tras horizontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.scale(2.34, 1, 1); //algo errado...
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.trapezium.display();
    this.scene.popMatrix();

    //trapezio tras vertical
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(2.34, 1, 1);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.trapezium.display();
    this.scene.popMatrix();

    //trapezio frente
    this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1.42, 1, 1);
        this.bodyTextures[this.currSubmarineAppearance].apply();
        this.trapezium.display();
    this.scene.popMatrix();
}

MySubmarine.prototype.rotate = function(orientation){

    this.rotationAngle += Math.PI / 180 * orientation * this.scene.speed;

    this.scene.torpedos[0].rotationAngle = this.rotationAngle;
}

MySubmarine.prototype.move = function(direction){
    //forward
    var x = Math.sin(this.rotationAngle);
    var z = Math.cos(this.rotationAngle);

    this.positionX += x*0.05*this.scene.speed;
    this.positionZ += z*0.05*this.scene.speed;

    //updates torpedo position
    this.scene.torpedos[0].updateHorizontalPosition(this.positionX, this.positionZ);
}

MySubmarine.prototype.increaseVelocity = function(){

    if (this.scene.speed >= 5){
        this.scene.speed = 5;
    }
    else{
        this.scene.speed += 0.1;
    }
}

MySubmarine.prototype.decreaseVelocity = function(){
    if (this.scene.speed <= -5){
        this.scene.speed = -5;
    }
    else{
        this.scene.speed -= 0.1;
    }
}

MySubmarine.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    //this.setAccelaration();

    //this.propeller1.updateVelocity(dif);

    //console.log(this.propeller1.angularVelocity);

    //this.propeller1.test(angle);

    //TODO: dúvidas no ponto 2

    /*var angle = dif * 2 * Math.PI * 60/ 1000;

    this.propeller1.setAngle(angle, 1);
    this.propeller2.setAngle(angle, -1);*/

    this.timePassed = currTime;
};