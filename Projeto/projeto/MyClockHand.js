/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, size, thickness) {
    CGFobject.call(this,scene);
    this.quad = new MyQuad(scene, 0, 0, 1, 1);

    this.size = size;
    this.thickness = thickness;
    this.rotationAngle = 0;

 };

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function(){

    //clock pointer
    this.scene.pushMatrix();
        this.scene.rotate(-this.rotationAngle, 0, 0, 1);
        this.scene.translate(0, this.size/2, 0);
		this.scene.scale(this.thickness, this.size, 0.2);
        this.quad.display();
	this.scene.popMatrix();
}

MyClockHand.prototype.setAngle = function(angle){

    this.rotationAngle += angle * Math.PI / 180;

}
