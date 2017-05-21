/**
*MyUnitCube
* @param gl {WebGLRenderingContext}
* @constructor
*/

function MyUnitCubeQuad(scene) {
  CGFobject.call(this, scene);
  this.quad = new MyQuad(this.scene, 0, 1, 0, 1);
  this.quad.initBuffers();
};

// subclass extends superclass
MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {

  //front face
  this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
  this.scene.popMatrix();

  //back face
  this.scene.pushMatrix();
    this.scene.translate(0,0,-0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
  this.scene.popMatrix();

  //left face
  this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.quad.display();
  this.scene.popMatrix();

  //right face
  this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.quad.display();
  this.scene.popMatrix();

  //down face
  this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.quad.display();
  this.scene.popMatrix();

  //up face
  this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
  this.scene.popMatrix();
};
