/**
 * MyTrapezium
 * @constructor
 */
 function MyTrapezium(scene) {
 	CGFobject.call(this,scene);

    this.prism = new MyUnitCubeQuad(scene);
    this.triangle = new MyTriangle(scene);
 };

MyTrapezium.prototype = Object.create(CGFobject.prototype);
MyTrapezium.prototype.constructor = MyTrapezium;

MyTrapezium.prototype.display = function(){

    this.scene.rotate(-Math.PI/2, 0, 1, 0);

    this.scene.pushMatrix();
        this.scene.translate(-0.15/2, +0.05, -0.35);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.23, 1, 0.15);
        this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-0.15/2, -0.05, 0.35);
        this.scene.scale(0.23, 1, 0.15);
        this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.scale(0.15, 0.1, 0.7);
        this.prism.display();
    this.scene.popMatrix();
};
