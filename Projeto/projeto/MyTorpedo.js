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

    this.horizontalRotAngle = horizontalAngle || 0;
    this.verticalRotAngle = verticalAngle || 0;
    this.orientation = 0;
    this.direction = this.calculateDirection();
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

/*
* function to draw torpedo
*/
MyTorpedo.prototype.display = function(){

    this.metalAppearance.apply();

    //main cylinder
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.scale(1/5, 1/5, 1);
        this.cylinder.display();
    this.scene.popMatrix();

    //frontal sphere
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1/5, 1/5, 1/4);
        this.semiSphere.display();
    this.scene.popMatrix();

    //back sphere
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(1/5, 1/5, 1/4);
        this.semiSphere.display();
    this.scene.popMatrix();

    //back horizontal rudder
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.trapezium.display();
    this.scene.popMatrix();

    //back vertical rudder
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.trapezium.display();
    this.scene.popMatrix();

}

/**
* funtion to update torpedo's position
*/
MyTorpedo.prototype.updatePosition = function(posX, posY, posZ){

    if (this.enableUpdate){
        this.positionX = posX;
        this.positionY = posY - 1.1;
        this.positionZ = posZ;
    }
}

/*
* auxiliar function
*/
MyTorpedo.prototype.calculateVector = function(){

    this.P4 = [this.scene.targets[0].positionX,
               this.scene.targets[0].positionY,
               this.scene.targets[0].positionZ];

    var vector = [this.P4[0] - this.positionX,
                  this.P4[1] - this.positionY,
                  this.P4[2] - this.positionZ];

    return vector;
}

/*
* function to calculate the rotation angle of the torpedo when doing the bezier curve
*/
MyTorpedo.prototype.calculateRotationAngle = function(){

    //calculate angle between vector and origin ("z")
    var vector = this.calculateVector();

    var n1 = Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);
    var cos = vector[2] / n1;
    var angle = Math.acos(cos);

    if (vector[0] > 0)
        return angle;
    else
        return 2*Math.PI - angle;

}

/**
* auxiliar function
*/
MyTorpedo.prototype.calculateDistance = function(){
    var vector = this.calculateVector();
    return Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);
}

/*
* function to calculate the direction of the torpedo when doing the bezier curve
*/
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

    this.direction = direction;

    return direction;
}

/*
* function to calculate bezier points
*/
MyTorpedo.prototype.calculateBezierPoints = function(){

    var direction = this.calculateDirection();
    var vector = this.calculateVector();

    this.P2 = [
        this.positionX + direction[0] * 6,
        this.positionY + direction[1] * 6,
        this.positionZ + direction[2] * 6,
    ];

    this.P3 = [
        this.scene.targets[0].positionX,
        this.positionY + 3,
        this.scene.targets[0].positionZ
    ];
}


/**
* function called when key 'F' is pressed so that the torpedo is launched
*/
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

/*
* function to update torpedo's position throw time
*/
MyTorpedo.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    if(this.bezierAnimation){
        var finalAngle = this.calculateRotationAngle();
        var direction = this.direction;

        if(this.t <= 1){
            var oldPosition = [this.positionX, this.positionY, this.positionZ];
            var t = this.t;

            this.positionX = Math.pow((1-t), 3) * this.positionX + 3*Math.pow((1-t), 2) * t * this.P2[0] + 3*(1-t) * Math.pow(t, 2) * this.P3[0] + Math.pow(t, 3) * this.P4[0];
            this.positionY = Math.pow((1-t), 3) * this.positionY + 3*Math.pow((1-t), 2) * t * this.P2[1] + 3*(1-t) * Math.pow(t, 2) * this.P3[1] + Math.pow(t, 3) * this.P4[1];
            this.positionZ = Math.pow((1-t), 3) * this.positionZ + 3*Math.pow((1-t), 2) * t * this.P2[2] + 3*(1-t) * Math.pow(t, 2) * this.P3[2] + Math.pow(t, 3) * this.P4[2];

            this.t += 1/(this.animationTime * 10);
            var vector = [this.positionX - oldPosition[0], this.positionY - oldPosition[1], this.positionZ - oldPosition[2]];

            var escalar = vector[1]*direction[1] + vector[2]*direction[2];
            var n1 = Math.sqrt(vector[1]*vector[1] + vector[2]*vector[2]);
            var n2 = Math.sqrt(direction[1]*direction[1] + direction[2]*direction[2]);
            var cos = escalar / (n1*n2);
            this.orientation += finalAngle/(this.animationTime*10);

            var escalar = vector[0]*direction[0] + vector[2]*direction[2];
            var n1 = Math.sqrt(vector[0]*vector[0] + vector[2]*vector[2]);
            var n2 = Math.sqrt(direction[0]*direction[0] + direction[2]*direction[2]);
            var cos = escalar / (n1*n2);
            this.horizontalRotAngle = Math.acos(cos); //angulo com z
        }
        else{
            this.bezierAnimation = false;
            this.scene.destroy = true;
        }
    }
    this.timePassed = currTime;
};
