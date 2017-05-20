/**
* MyPropeller
* @constructor
*/
function MyPropeller(scene) {
    CGFobject.call(this,scene);

    this.cylinder = new MyCylinderInsideOut(scene, 20, 1);
    this.semiSphere = new MySemiSphere(scene, 20, 20);
    this.base = new MyCylinderBase(scene, 4);
    this.prism = new MyPrism(scene, 4, 1);

    this.rotationAngle = -Math.PI/4;

    this.angularVelocity;
    this.minVelocity = 2*Math.PI;
    this.acceleration = 0;

};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor = MyPropeller;

MyPropeller.prototype.display = function(){

    //cylinder
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.5);
    this.scene.translate(0, 0, -0.5);
    this.cylinder.display();
    this.scene.popMatrix();

    //semiSphere
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1/12);
    this.scene.scale(1/9, 1/9, 1/9);
    this.semiSphere.display();
    this.scene.popMatrix();

    //prism
    this.scene.pushMatrix();
    //this.scene.rotate(this.rotationAngle, 0, 0, 1);
    this.scene.scale(1/6, 1.2, 1/6);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.scene.translate(0, 0, -0.5);

    this.scene.pushMatrix();
    this.prism.display();
    this.scene.popMatrix();

    //prism front
    this.scene.pushMatrix();
    this.scene.rotate(this.rotationAngle, 0, 0, 1);
    this.scene.translate(0, 0, 1);
    this.base.display();
    this.scene.popMatrix();

    //prism back
    this.scene.pushMatrix();
    this.scene.rotate(this.rotationAngle, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.base.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
}

MyPropeller.prototype.setAngle = function(currTime){

    var dif = currTime - this.timePassed;


    var angle = dif * 2 * Math.PI / 1000;

    if (isNaN(angle))
    return;

    if (this.scene.speed < 0){
        this.rotationAngle -= angle * Math.PI / 180 - angle * Math.PI / 180 * this.scene.speed;
    }
    else{
        this.rotationAngle += angle * Math.PI / 180 + angle * Math.PI / 180*this.scene.speed;
    }
    this.timePassed = currTime;

}
