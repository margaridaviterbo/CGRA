/**
 * MyTriangle
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

    this.vertices = [];

    for(var i = 0; i < 3; i++){
        this.vertices.push(0, 0.1, 0);
        this.vertices.push(0.66, 0.1, 0);
        this.vertices.push(0, 0.1, 1);
        this.vertices.push(0, 0, 0);
        this.vertices.push(0.66, 0, 0);
        this.vertices.push(0, 0, 1);
    }

    this.normals = [
        0, 1, 0,    //0
        0, 1, 0,    //1
        0, 1, 0,    //3
        0, -1, 0,   //3
        0, -1, 0,   //4
        0, -1, 0,   //5
        -1, 0, 0,   //0
        1, 0, 0.66, //1
        -1, 0, 0,   //2
        -1, 0, 0,   //3
        1, 0, 0.66, //4
        -1, 0, 0,   //5
        0, 0, -1,   //0
        0, 0, -1,   //1
        1, 0, 0.66, //2
        0, 0, -1,   //3
        0, 0, -1,   //4
        1, 0, 0.66  //5
    ];

    this.texCoords = [
        0, 1, 0,    //0
        0, 1, 0,    //1
        0, 1, 0,    //2
        0, -1, 0,   //3
        0, -1, 0,   //4
        0, -1, 0,   //5
        -1, 0, 0,   //0
        1, 0, 0.66, //1
        -1, 0, 0,   //2
        -1, 0, 0,   //3
        1, 0, 0.66, //4
        -1, 0, 0,   //5
        0, 0, -1,   //0
        0, 0, -1,   //1
        1, 0, 0.66, //2
        0, 0, -1,   //3
        0, 0, -1,   //4
        1, 0, 0.66  //5

    ];

	this.indices = [
        0, 2, 1,
		3, 4, 5,
		0, 3, 2,
		3, 5, 2,
		1, 2, 4,
		4, 2, 5,
    ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
