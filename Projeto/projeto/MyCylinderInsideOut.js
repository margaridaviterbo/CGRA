/**
 * MyPrism
 * @constructor
 */
 function MyCylinderInsideOut(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinderInsideOut.prototype = Object.create(CGFobject.prototype);
 MyCylinderInsideOut.prototype.constructor = MyCylinderInsideOut;

 MyCylinderInsideOut.prototype.initBuffers = function() {

  this.indices = [];
  this.vertices = [];
  this.normals = [];
  this.texCoords = [];

  var angularStep = (2*Math.PI)/this.slices;
  var s = 0, t = 0;

  for (var i = 0; i <= this.stacks; i++) {

    for (var j = 0; j < this.slices; j++) {
      this.vertices.push(Math.cos(j * angularStep),
                         Math.sin(j * angularStep), 
                         i / this.stacks);

      this.normals.push(Math.cos(j * angularStep),
                        Math.sin(j * angularStep),
                        0);

      this.texCoords.push(s, t);
      s += 1 / this.slices;
    }
    s = 0;
    t += 1 / this.stacks;
  }


  for (var i = 0; i < this.stacks; i++) {
    for (var j = 0; j < this.slices; j++) {
      this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices,
                        i * this.slices + (j + 1) % this.slices + this.slices);
      this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices + this.slices,
                        i * this.slices + j + this.slices);
    }
  }

  for (var i = 0; i < this.stacks; i++) {
    for (var j = 0; j < this.slices; j++) {
      this.indices.push(i * this.slices + (j + 1) % this.slices + this.slices, 
                        i * this.slices + (j + 1) % this.slices,
                        i * this.slices + j
                       );
      this.indices.push(i * this.slices + j + this.slices,
                        i * this.slices + (j + 1) % this.slices + this.slices,
                        i * this.slices + j
                        );
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};
