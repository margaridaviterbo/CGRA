/**
*MyTable
* @param gl {WebGLRenderingContext}
* @constructor
*/

function MyTable(scene) {
  CGFobject.call(this, scene);
  this.cube = new MyUnitCubeQuad(this.scene);

  this.materialTampoMesa = new CGFappearance(scene);
	this.materialTampoMesa.setAmbient(0.3, 0.3, 0.3, 1);
	this.materialTampoMesa.setDiffuse(0.349, 0.188, 0, 1);
	this.materialTampoMesa.setSpecular(0.2, 0.2, 0.2, 1);
	this.materialTampoMesa.setShininess(20);

  this.materialPernasMesa = new CGFappearance(scene);
  this.materialPernasMesa.setAmbient(0.3, 0.3, 0.3, 1);
  this.materialPernasMesa.setDiffuse(0.753, 0.753, 0.753, 1);
  this.materialPernasMesa.setSpecular(0.9, 0.9, 0.9, 1);
  this.materialPernasMesa.setShininess(150);

  this.tableAppearance = new CGFappearance(scene);
  this.tableAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.tableAppearance.setDiffuse(0.349, 0.188, 0, 1);
	this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.tableAppearance.setShininess(5);
  this.tableAppearance.loadTexture('../resources/images/table.png');
  this.tableAppearance.setTextureWrap('REPEAT','REPEAT');
};

// subclass extends superclass
MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function () {

  //perna esquerda trás
  this.scene.pushMatrix();
  this.scene.translate(-2.35, 1.75, -1.35);
  this.scene.scale(0.3, 3.5, 0.3);
  this.materialPernasMesa.apply();
  this.cube.display();
  this.scene.popMatrix();

  //perna direita trás
  this.scene.pushMatrix();
  this.scene.translate(2.35, 1.75, -1.35);
  this.scene.scale(0.3, 3.5, 0.3);
  this.materialPernasMesa.apply();
  this.cube.display();
  this.scene.popMatrix();

  //perna esquerda frente
  this.scene.pushMatrix();
  this.scene.translate(-2.35, 1.75, 1.35);
  this.scene.scale(0.3, 3.5, 0.3);
  this.materialPernasMesa.apply();
  this.cube.display();
  this.scene.popMatrix();

  //perna direita frente
  this.scene.pushMatrix();
  this.scene.translate(2.35, 1.75, 1.35);
  this.scene.scale(0.3, 3.5, 0.3);
  this.materialPernasMesa.apply();
  this.cube.display();
  this.scene.popMatrix();

  //tampo
  this.scene.pushMatrix();
  this.scene.translate(0, 3.65, 0);
  this.scene.scale(5, 0.3, 3);
  this.tableAppearance.apply();
  this.cube.display();
  this.scene.popMatrix();

};
