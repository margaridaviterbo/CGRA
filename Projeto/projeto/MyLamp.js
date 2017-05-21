/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

  this.indices = [];
  this.vertices = [];
  this.normals = [];
  var teta = Math.PI/this.slices;
  var beta = Math.PI/this.stacks;

  for (var i = 0; i <= this.stacks; i++) {
    for (var j = 0; j <= this.slices; j++) {
      this.vertices.push(Math.sin(i*beta)*Math.cos(j*teta),
                         Math.sin(i*beta)*Math.sin(j*teta),
                         Math.cos(i*beta));
      this.normals.push(Math.sin(i*beta)*Math.cos(j*teta),
                         Math.sin(i*beta)*Math.sin(j*teta),
                         Math.cos(i*beta));
    }
  }

  for (var i = 0; i < this.stacks; i++) {
    for (var j = 0; j < this.slices; j++) {

      if(i == 0){
          this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices + this.slices,
                        i * this.slices + (j + 1) % this.slices);
          this.indices.push(i * this.slices + j,
                        i * this.slices + j + this.slices,
                        i * this.slices + (j + 1) % this.slices + this.slices);
      }

      this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices + this.slices,
                        i * this.slices + (j + 1) % this.slices);
      this.indices.push(i * this.slices + j,
                        i * this.slices + j + this.slices,
                        i * this.slices + (j + 1) % this.slices + this.slices);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
 };
