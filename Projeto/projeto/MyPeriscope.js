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
    this.scene.popMatrix();

}

MyPeriscope.prototype.move = function(direction){

    if(this.scene.speed = 0){
        if(direction == 1){
            while(this.positionY < 0){
                this.positionY += 0.05*0.01;
            }
        }
        else{
            while(this.positionY > -1){
                this.positionY += (-0.05)*0.01;
            }
        }
    }
    else{
        if(direction == 1){
            while(this.positionY < 0){
                this.positionY += 0.05*this.scene.speed;
            }
        }
        else{
            while(this.positionY > -1){
                this.positionY += (-0.05)*this.scene.speed;
            }
        }
    }


}


MyPeriscope.prototype.update = function(currTime){

    var dif = currTime - this.timePassed;

    this.timePassed = currTime;
};
