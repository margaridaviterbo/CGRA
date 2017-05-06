/**
 * MyClock
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.cylinderInsideOut = new MyCylinderInsideOut(scene, 20, 1);
    this.semiSphere = new MySemiSphere(scene, 20, 20);
    this.base = new MyCylinderBase(scene, 20);
    this.prism = new MyPrism(scene, 4, 1);

    this.triangle = new MyTriangle(scene);

    this.rotationAngle = Math.PI*4/5;

    this.positionX = 5;
    this.positionZ = 5;
 };

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function(){

    /*//cilindro principal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.scale(0.73/2, 1/2, 4.08);
        this.cylinder.display();
    this.scene.popMatrix();

    //0.92 / 2 = 0.46
    //semiEsfera frontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 2.04);
        this.scene.scale(0.73/2, 1/2, 0.46);
        this.semiSphere.display();
    this.scene.popMatrix();

    //semiEsfera frontal
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.04);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.73/2, 1/2, 0.46);
        this.semiSphere.display();
    this.scene.popMatrix();

    //cilindro cima
    this.scene.pushMatrix();
        this.scene.translate(0, 0.57/2, 0.88/2);
        this.scene.scale(0.60/2, 0.57, 0.88/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cylinder.display();

        //tampo cilindro cima
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.base.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.55);

        this.scene.pushMatrix();
            this.scene.scale(0.05, 0.7, 0.05);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0.725, -0.05);
            this.scene.scale(0.05, 0.05, 0.25);
            this.cylinder.display();

            //tampo cima
            this.scene.pushMatrix();
                this.scene.translate(0, 0, 1);
                this.base.display();
            this.scene.popMatrix();

            //tampo baixo
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.base.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
   this.scene.popMatrix();*/
}

MySubmarine.prototype.rotate = function(orientation){
   
    this.rotationAngle += Math.PI / 180 * orientation * this.scene.speed;
}

MySubmarine.prototype.move = function(direction){
    //forward
    var x = Math.sin(this.rotationAngle);
    var z = Math.cos(this.rotationAngle);
    console.log(x + "  " + z);

    if (direction == 1){
        this.positionX += x*0.05*this.scene.speed;
        this.positionZ += z*0.05*this.scene.speed;
    }
    else if (direction == -1){
        this.positionX -= x*0.05*this.scene.speed;
        this.positionZ -= z*0.05*this.scene.speed;
    }
}
