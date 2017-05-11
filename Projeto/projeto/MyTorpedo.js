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

    this.rotateAnimation = false;
    this.bezierAnimation = false;

    this.animationTime;
    this.P2;
    this.P3;
    this.P4;

    this.timePassed = 0;

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

MyTorpedo.prototype.calculateVector = function(){

    this.P4 = [this.scene.targets[0].positionX,
               this.scene.targets[0].positionY,
               this.scene.targets[0].positionZ];

    var vector = [this.P4[0] - this.positionX,
                  this.P4[1] - this.positionY,
                  this.P4[2] - this.positionZ];

    return vector;
}

MyTorpedo.prototype.calculateRotationAngle = function(){

    //calculate angle between vector and origin ("z")
    var vector = this.calculateVector();

    //cos(ang) = vector1 * vector2 / (normal(vector1) * normal(vector2));
    var n1 = Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);
    var cos = vector[2] / n1;
    var angle = Math.acos(cos);

    if (vector[0] > 0)
        return angle;
    else 
        return 2*Math.PI - angle;

}

MyTorpedo.prototype.calculateDistance = function(){

    var vector = this.calculateVector();

    return Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);

}

MyTorpedo.prototype.animate = function(){

    this.rotateAnimation = true;

    var vector = this.calculateVector();
    var distance = this.calculateDistance();
    this.animationTime = parseInt(distance);

    //calculate bezier points P2 and P3
    this.P2 = [
        4/5 * vector[0]+this.positionX,
        4/5 * vector[1]+this.positionY,
        4/5 * vector[2]+this.positionZ
    ];

    this.P3 = [
        this.scene.targets[0].positionX,
        4/5 * this.positionY,
        this.scene.targets[0].positionZ
    ];         

}

MyTorpedo.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    if (this.rotateAnimation){

        var finalAngle = this.calculateRotationAngle();
        
        if (this.rotationAngle >= finalAngle){
            this.rotateAnimation = false;
            this.bezierAnimation = true;
        }
        else{
            var angle = dif * finalAngle / 30;
            this.rotationAngle += angle * Math.PI / 180;
        }
    }

    /*
    if(this.bezierAnimation){
        
        for (var t=0; t <= 1; t+=1/this.animationTime){

            this.positionX = Math.pow((1-t), 3) * this.positionX + 3*Math.pow((1-t), 2) * t * this.P2[0] + 3*(1-t) * Math.pow(t, 2) * this.P3[0] + Math.pow(t, 3) * this.P4[0]; 
            
            console.log(this.positionX);

            this.positionY = Math.pow((1-t), 3) * this.positionY + 3*Math.pow((1-t), 2) * t * this.P2[1] + 3*(1-t) * Math.pow(t, 2) * this.P3[1] + Math.pow(t, 3) * this.P4[1]; 

            console.log(this.positionY);

            this.positionZ = Math.pow((1-t), 3) * this.positionZ + 3*Math.pow((1-t), 2) * t * this.P2[2] + 3*(1-t) * Math.pow(t, 2) * this.P3[2] + Math.pow(t, 3) * this.P4[2]; 

            console.log(this.positionZ);
        }

        this.bezierAnimation = false;
    }*/

    this.timePassed = currTime;
};

