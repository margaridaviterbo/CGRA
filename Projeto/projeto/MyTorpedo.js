/**
 * MyTorpedo
 * @constructor
 */
 function MyTorpedo(scene, positionX, positionY, positionZ, angle) {
    CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.semiSphere = new MySemiSphere(scene, 20, 20);
    this.trapezium = new MyTrapezium(scene);

    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;

    this.rotationAngle = angle;

    this.orientation;

    this.visible = true;

    this.metalAppearance = new CGFappearance(scene);
    this.metalAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.metalAppearance.setDiffuse(0.376, 0.376, 0.376, 1);
    this.metalAppearance.setSpecular(1, 1, 1, 1);
    this.metalAppearance.setShininess(300);
    
 };

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function(){

    this.metalAppearance.apply();

    //cilindro principal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.scale(1/5, 1/5, 1);
        this.cylinder.display();
    this.scene.popMatrix();

    //semiEsfera frontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1/5, 1/5, 1/4);
        this.semiSphere.display();
    this.scene.popMatrix();

    //semiEsfera traseira
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(1/5, 1/5, 1/4);
        this.semiSphere.display();
    this.scene.popMatrix();

    //trapezio tras horizontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.trapezium.display();
    this.scene.popMatrix();

    //trapezio tras vertical
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.trapezium.display();
    this.scene.popMatrix();

}

MyTorpedo.prototype.updateHorizontalPosition = function(posX, posZ){

    this.positionX = posX;
    this.positionZ = posZ;
}

MyTorpedo.prototype.animate = function(){

    var targetPos = [this.scene.targets[0].positionX,
                     this.scene.targets[0].positionY,+
                     this.scene.targets[0].positionZ];

    //calculate angle between vector and origin ("z")
    var vector = [targetPos[0] - this.positionX,
                  targetPos[2] - this.positionZ];

    var vector = [targetPos[0] - this.positionX,
                  targetPos[2] - this.positionZ];

    //cos(ang) = vector1 * vector2 / (normal(vector1) * normal(vector2));

    var n1 = Math.sqrt(vector[0]*vector[0] + vector[1] * vector[1]);
    var cos = vector[1] / n1;
    var angle = Math.acos(cos);

    console.log(angle);
    console.log(vector[0], vector[1]);

    /*
    x>0 e z>0, x>0 e z<0, 
    */
    if (vector[0] > 0)
        this.rotationAngle = angle;

    /*
    x<0 z>0, x<0 e z<0
    */
    else 
        this.rotationAngle = 2*Math.PI - angle;

    var distance;

}
