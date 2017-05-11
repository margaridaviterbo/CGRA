/**
*MyUnitCube
* @param gl {WebGLRenderingContext}
* @constructor
*/

function MyUnitCubeQuad(scene) {
  CGFobject.call(this, scene);
  this.quad = new MyQuad(this.scene);
  this.quad.initBuffers();
};

// subclass extends superclass
MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {

  //face frente
  this.scene.pushMatrix();
  this.scene.translate(0, 0, 0.5);
  this.quad.display();
  this.scene.popMatrix();

  //face trás
  this.scene.pushMatrix();
  this.scene.translate(0,0,-0.5);
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.quad.display();
  this.scene.popMatrix();

  //face esquerda
  this.scene.pushMatrix();
  this.scene.translate(-0.5, 0, 0);
  this.scene.rotate(-Math.PI/2, 0, 1, 0);
  this.quad.display();
  this.scene.popMatrix();

  //face direita
  this.scene.pushMatrix();
  this.scene.translate(0.5, 0, 0);
  this.scene.rotate(Math.PI/2, 0, 1, 0);
  this.quad.display();
  this.scene.popMatrix();

  //face baixo
  this.scene.pushMatrix();
  this.scene.translate(0, -0.5, 0);
  this.scene.rotate(Math.PI/2, 1, 0, 0);
  this.quad.display();
  this.scene.popMatrix();

  //face cima
  this.scene.pushMatrix();
  this.scene.translate(0, 0.5, 0);
  this.scene.rotate(-Math.PI/2, 1, 0, 0);
  this.quad.display();
  this.scene.popMatrix();

};
