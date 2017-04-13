/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene) {
 	CGFobject.call(this,scene);

     this.quad = new MyQuad(scene, 0, 0, 1, 1);

     this.rotationAngle = Math.PI / 2;

 };

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function(){

    this.scene.pushMatrix();
        this.quad.display();
    this.scene.popMatrix();

}

MyClockHand.prototype.setAngle = function(angle){
    
    this.rotationAngle = Math.PI/2 - angle * Math.PI / 180;

}