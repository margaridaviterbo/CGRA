/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(scene, slices, stacks);
	this.base = new MyCylinderBase(scene, slices);
    this.hourPointer = new MyClockHand(scene, 0.4, 0.05);
    this.minutePointer = new MyClockHand(scene, 0.6, 0.04);
    this.secondPointer = new MyClockHand(scene, 0.8, 0.03);

    this.hourPointer.setAngle(90);
    this.minutePointer.setAngle(180);
    this.secondPointer.setAngle(270);

    this.timePassed = 0;

    this.materialRelogio = new CGFappearance(scene);
	this.materialRelogio.setAmbient(0.3, 0.3, 0.3, 1);
	this.materialRelogio.setDiffuse(1, 1, 1, 1);
	this.materialRelogio.setSpecular(0.6, 0.6, 0.6, 1);
	this.materialRelogio.setShininess(20);
    this.materialRelogio.loadTexture('../resources/images/clock.png');

    this.black = new CGFappearance(scene);
	this.black.setAmbient(0.3, 0.3, 0.3, 1);
	this.black.setDiffuse(0, 0, 0, 1);
	this.black.setSpecular(0, 0, 0, 1);
	this.black.setShininess(20);

 };

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    //segundos
    var angle = dif * 2* Math.PI / 1000;
    this.secondPointer.setAngle(angle);

    //minutos
    angle = dif * 2 * Math.PI / (60 * 1000);
    this.minutePointer.setAngle(angle);

    //horas
    angle = dif * 2 * Math.PI / (60 * 60 * 1000);
    this.hourPointer.setAngle(angle);

    this.timePassed = currTime;
};

MyClock.prototype.display = function(){

    //ponteiro das horas
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.1);
        this.black.apply();
        this.hourPointer.display();
    this.scene.popMatrix();

    //ponteiro dos minutos
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.1);
        this.black.apply();
        this.minutePointer.display();
    this.scene.popMatrix();
    
    //ponteiro dos segundos
     this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.1);
        this.black.apply();
        this.secondPointer.display();
    this.scene.popMatrix();

    //cilindro
    this.scene.pushMatrix();
        this.cylinder.display();
    this.scene.popMatrix();

    //face tras
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.base.display();
    this.scene.popMatrix();

    //face frente
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.materialRelogio.apply();
        this.base.display();
    this.scene.popMatrix();
   
}