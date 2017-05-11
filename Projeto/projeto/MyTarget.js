/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, positionX, positionZ) {
    CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.base = new MyCylinderBase(scene, 20);

    this.positionX = positionX;
    this.positionY = 0;
    this.positionZ = positionZ;

    this.blackAppearance = new CGFappearance(scene);
    this.blackAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.blackAppearance.setDiffuse(0, 0, 0, 1);
    this.blackAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.blackAppearance.setTextureWrap('REPEAT, REPEAT');

    this.targetAppearance = new CGFappearance(scene);
    this.targetAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.targetAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.targetAppearance.setSpecular(0.9, 0.9, 0.9, 1);
    this.targetAppearance.setShininess(200);
    this.targetAppearance.loadTexture('../resources/images/target.jpg');
 };

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function(){
    this.scene.translate(this.positionX, this.positionY, this.positionZ);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 0.2);

    //cilindro
    this.scene.pushMatrix();
        this.blackAppearance.apply();
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
        this.targetAppearance.apply();
        this.base.display();
    this.scene.popMatrix();
}