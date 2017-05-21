/**
* MyPeriscope
* @constructor
*/
function MyPeriscope(scene) {
    CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(scene, 20, 1);
    this.base = new MyCylinderBase(scene, 20);

    this.positionY = 0;
};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function(){

    this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.55);

        //periscope body
        this.scene.pushMatrix();
            this.scene.scale(0.05, 0.7, 0.05);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        //periscope head
        this.scene.pushMatrix();
            this.scene.translate(0, 0.725, -0.05);
            this.scene.scale(0.05, 0.05, 0.25);
        this.cylinder.display();

        //front face periscope head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.base.display();
        this.scene.popMatrix();

        //back face periscope head
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.base.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    this.scene.popMatrix();

}

//move periscope up and down til it reaches a limit
MyPeriscope.prototype.move = function(direction){

    if((direction == 1) && (this.positionY < 0)){
        this.positionY += 0.05;
    }
    else if((direction == -1) && (this.positionY > -0.5)){
        this.positionY -= 0.05;
    }

}

MyPeriscope.prototype.update = function(currTime){
    var dif = currTime - this.timePassed;
    this.timePassed = currTime;
};
