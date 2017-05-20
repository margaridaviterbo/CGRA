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
    this.periscope = new MyPeriscope(scene);
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

    this.submarineAppearenceBlue = new CGFappearance(scene);
    this.submarineAppearenceBlue.setAmbient(0.3, 0.3, 0.3, 1);
    this.submarineAppearenceBlue.setDiffuse(18/255, 55/255, 203/255, 1);
    this.submarineAppearenceBlue.setSpecular(0.9, 0.9, 0.9, 1);
    this.submarineAppearenceBlue.setShininess(200);

	this.bodyTextures[0] = this.submarineAppearenceMetal;
	this.bodyTextures[1] = this.submarineAppearenceRock;
	this.bodyTextures[2] = this.submarineAppearenceCoral;
    this.bodyTextures[3] = this.submarineAppearenceFish;

    //this.rotationAngle = Math.PI*4/5;

    //this.positionX = 5;
    //this.positionY = 3;
    //this.positionZ = 5;

    this.positionX = 0;
    this.positionY = 3;
    this.positionZ = 0;

    this.rotationAngle = 0; //Horizontal angle
    this.rotationAngle2 = 0;
    this.rotationAngle3 = 0; //Vertical angle
    this.rotationAngle4 = 0;

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

MySubmarine.prototype.rotate = function(orientation){

    this.rotationAngle += Math.PI / 180 * orientation * this.scene.speed;

    if(Math.abs(this.rotationAngle2) < Math.PI/2 || Math.abs(this.rotationAngle2) > 3*Math.PI/2){
        this.rotationAngle2 += Math.PI / 180 * orientation * 4;
    }

    if (this.scene.torpedos[0].enableUpdate){
        this.scene.torpedos[0].horizontalRotAngle = this.rotationAngle;
    }
}

MySubmarine.prototype.resetRotationAngle2 = function(){
    this.rotationAngle2 = 0;
}

MySubmarine.prototype.rotateVertically = function(orientation){

    this.rotationAngle3 += Math.PI / 180 * orientation * this.scene.speed;

    if(Math.abs(this.rotationAngle4) < Math.PI/2 || Math.abs(this.rotationAngle4) > 3*Math.PI/2){
        this.rotationAngle4 += Math.PI / 180 * orientation * 4;
    }
    if (this.scene.torpedos[0].enableUpdate){
        this.scene.torpedos[0].verticalRotAngle = this.rotationAngle3;
    }
}


MySubmarine.prototype.resetRotationAngle4 = function(){
    this.rotationAngle4 = 0;
}

MySubmarine.prototype.calculateSumVectors = function(){

    var vectorHorizontal = [Math.sin(this.rotationAngle), 0, Math.cos(this.rotationAngle)];
    var vectorVertical = [0, Math.sin(-this.rotationAngle3), Math.cos(-this.rotationAngle3)];

    var final = [vectorHorizontal[0] + vectorVertical[0], vectorHorizontal[1] + vectorVertical[1], vectorHorizontal[2] + vectorVertical[2]];

    return final;
}

MySubmarine.prototype.move = function(direction){

    var aux = this.calculateSumVectors();

    var angle = Math.PI/2+this.rotationAngle3;

    var direction = [
        Math.sin(angle) * Math.sin(this.rotationAngle),
        Math.cos(angle),
        Math.sin(angle) * Math.cos(this.rotationAngle)
    ];     

    var x = direction[0];
    var y = direction[1];
    var z = direction[2];

    this.positionX += x*0.05*this.scene.speed;
    this.positionZ += z*0.05*this.scene.speed;
    this.positionY += y*0.05*this.scene.speed;

    //updates torpedo position
    this.scene.torpedos[0].updatePosition(this.positionX, this.positionY, this.positionZ);
}

MySubmarine.prototype.increaseVelocity = function(){

    if (this.scene.speed >= 5){
        this.scene.speed = 5;
    }
    else{
        this.scene.speed += 0.2;
    }
}

MySubmarine.prototype.decreaseVelocity = function(){
    if (this.scene.speed <= -5){
        this.scene.speed = -5;
    }
    else{
        this.scene.speed -= 0.2;
    }
}

MySubmarine.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    this.timePassed = currTime;

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
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.semiSphere.display();
    this.scene.popMatrix();

    //semiEsfera traseira
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.73/2, 1/2, 0.46);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.semiSphere.display();
    this.scene.popMatrix();

    //cilindro cima
    this.scene.pushMatrix();
        this.scene.translate(0, 0.57/2, 0.88/2);
        this.scene.scale(0.60/2, 0.57, 0.88/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.cylinder.display();

        //tampo cilindro cima
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            if(this.currSubmarineAppearance == 3){
                this.submarineAppearenceBlue.apply();
            }
            else{
                this.bodyTextures[this.currSubmarineAppearance].apply();
            }
            this.base.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

    //periscopio
    this.scene.pushMatrix();
        this.scene.translate(0, 0.155 + this.periscope.positionY, 0);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.periscope.display();
    this.scene.popMatrix();

    //helice direita
    this.scene.pushMatrix();
        this.scene.translate(0.73/2+0.4/2, -0.25, -2.04);
        this.scene.scale(0.4/2, 0.4/2, 0.4);
        this.scene.translate(0, 0, 0.5);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.propeller1.display();
    this.scene.popMatrix();

    //helice esquerda
    this.scene.pushMatrix();
        this.scene.translate(-0.73/2-0.4/2, -0.25, -2.04);
        this.scene.scale(0.4/2, 0.4/2, 0.4);
        this.scene.translate(0, 0, 0.5);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.propeller2.display();
    this.scene.popMatrix();

    //trapezio tras horizontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(this.rotationAngle4, 1, 0, 0);
        this.scene.scale(2.34, 1, 1); //algo errado...
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.trapezium.display();
    this.scene.popMatrix();

    //trapezio tras vertical
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(this.rotationAngle2, 1, 0, 0);
        this.scene.scale(2.34, 1, 1);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.trapezium.display();
    this.scene.popMatrix();

    //trapezio frente
    this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1.42, 1, 1);
        if(this.currSubmarineAppearance == 3){
            this.submarineAppearenceBlue.apply();
        }
        else{
            this.bodyTextures[this.currSubmarineAppearance].apply();
        }
        this.trapezium.display();
    this.scene.popMatrix();
}

