/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {

  this.indices = [];
  this.vertices = [];
  this.normals = [];
  this.texCoords = [];

  var angularStep = (2*Math.PI)/this.slices;
  var s = 0, t = 0;

  for (var i = 0; i <= this.stacks; i++) {
    for (var j = 0; j < this.slices; j++){
      this.vertices.push(Math.cos(j*angularStep), 
                         Math.sin(j*angularStep), 
                         i/this.stacks);

      this.vertices.push(Math.cos((j+1)*angularStep), 
                         Math.sin((j+1)*angularStep),
                         i/this.stacks);

      this.normals.push(Math.cos((j+1)*(angularStep/2)), 
                        Math.sin((j+1)*(angularStep/2)), 
                        0);
      this.normals.push(Math.cos((j+2)*(angularStep/2)), 
                        Math.sin((j+2)*(angularStep/2)), 
                        0);

      this.texCoords.push(s, t);
      this.texCoords.push(s, t);
      s += 1 / this.slices;
    }
    s = 0;
    t += 1 / this.stacks;
  }

  for (var i = 0; i < this.stacks; i++){
    this.indices.push(0, 2*0+1, 2*0+1+(i+1)*2*this.slices);
    this.indices.push(2*0+1+(i+1)*2*this.slices, 0+(i+1)*2*this.slices, 0);
    for (var j = 1; j < this.slices; j++){
      this.indices.push(2*j-1, 2*j+1, 2*j+1+(i+1)*2*this.slices);
      this.indices.push(2*j+1+(i+1)*2*this.slices, 2*j-1+(i+1)*2*this.slices, 2*j-1);
    }
  }



     	this.primitiveType = this.scene.gl.TRIANGLES;
     	this.initGLBuffers();
     };
