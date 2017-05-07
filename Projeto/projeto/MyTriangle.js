/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTriangle(scene) {
	CGFobject.call(this,scene);
	
	this.initBuffers();

};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.vertices = [
        0, 0.1, 0,
		0.66, 0.1, 0,
		0, 0.1, 1,
		0, 0, 0,
		0.66, 0, 0,
		0, 0, 1,
	];

	this.indices = [
        0, 2, 1,
		3, 4, 5,
		0, 3, 2,
		3, 5, 2,
		1, 2, 4,
		4, 2, 5
    ];

	this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, -1, 0,
		0, -1, 0,
		0, -1, 0
	];
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
