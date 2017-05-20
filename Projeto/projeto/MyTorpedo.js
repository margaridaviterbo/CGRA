/**
 * MyTorpedo
 * @constructor
 */
 function MyTorpedo(scene, positionX, positionY, positionZ, horizontalAngle, verticalAngle) {
    CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.semiSphere = new MySemiSphere(scene, 20, 20);
    this.trapezium = new MyTrapezium(scene);

    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;

    this.horizontalRotAngle = horizontalAngle;
    this.verticalRotAngle = verticalAngle;
    this.orientation = 0;

    this.enableUpdate = true;

    this.attached = true;

    this.bezierAnimation = false;

    this.animationTime;
    this.P2;
    this.P3;
    this.P4;
    this.t=0;

    this.timePassed;

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

MyTorpedo.prototype.updatePosition = function(posX, posY, posZ){

    if (this.enableUpdate){

        this.positionX = posX;
        this.positionY = posY - 1.1;
        this.positionZ = posZ;
    }
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

MyTorpedo.prototype.calculateDirection = function(){

    var vectorHorizontal = [Math.sin(this.horizontalRotAngle), 0, Math.cos(this.horizontalRotAngle)];
    var vectorVertical = [0, Math.sin(-this.verticalRotAngle), Math.cos(-this.verticalRotAngle)];

    var final = [vectorHorizontal[0] + vectorVertical[0], vectorHorizontal[1] + vectorVertical[1], vectorHorizontal[2] + vectorVertical[2]];

    var distance = Math.sqrt(final[0]*final[0] + final[1]*final[1] + final[2]*final[2]);

    var angle = Math.PI/2+this.verticalRotAngle;

    var direction = [
        Math.sin(angle) * Math.sin(this.horizontalRotAngle),
        Math.cos(angle),
        Math.sin(angle) * Math.cos(this.horizontalRotAngle)
    ];

    return direction;
}

MyTorpedo.prototype.calculateBezierPoints = function(){

    var direction = this.calculateDirection();

    var vector = this.calculateVector();

    //console.log("direction: " + direction[0] + " " + direction[1] + " " + direction[2]);
    //console.log("position: " + this.positionX + " " + this.positionY + " " + this.positionZ);

    this.P2 = [
        this.positionX +direction[0] * 6,
        this.positionY + direction[1] * 6,
        this.positionZ + direction[2] * 6,
    ];

    //console.log("p2: " + this.P2[0] + " " + this.P2[1] + " " + this.P2[2]);

    this.P3 = [
        this.scene.targets[0].positionX,
        this.positionY + 3,
        this.scene.targets[0].positionZ
    ];

}

MyTorpedo.prototype.animate = function(){

    if (this.scene.targets.length == 0)
        return;

    this.scene.torpedos[0].attached = false;

    //to not update with submarine
    this.enableUpdate = false;

    this.bezierAnimation = true;
    this.timePassed = 0;

    var distance = this.calculateDistance();
    this.animationTime = parseInt(distance);

    this.calculateBezierPoints();

}

MyTorpedo.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    if(this.bezierAnimation){

        var finalAngle = this.calculateRotationAngle();

        if(this.t <= 1){

            this.orientation += (Math.PI/2-this.verticalRotAngle)/(this.animationTime*10);

            var t = this.t;

            this.positionX = Math.pow((1-t), 3) * this.positionX + 3*Math.pow((1-t), 2) * t * this.P2[0] + 3*(1-t) * Math.pow(t, 2) * this.P3[0] + Math.pow(t, 3) * this.P4[0];

            this.positionY = Math.pow((1-t), 3) * this.positionY + 3*Math.pow((1-t), 2) * t * this.P2[1] + 3*(1-t) * Math.pow(t, 2) * this.P3[1] + Math.pow(t, 3) * this.P4[1];

            this.positionZ = Math.pow((1-t), 3) * this.positionZ + 3*Math.pow((1-t), 2) * t * this.P2[2] + 3*(1-t) * Math.pow(t, 2) * this.P3[2] + Math.pow(t, 3) * this.P4[2];

            this.t += 1/(this.animationTime * 10);

            this.horizontalRotAngle += finalAngle/(this.animationTime * 10);
        }
        else{
            this.bezierAnimation = false;
            this.scene.destroy = true;
        }
    }
    this.timePassed = currTime;
};
