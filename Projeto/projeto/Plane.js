
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
function Plane(scene, nrDivs, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	// nrDivs = 1 if not provided
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function() {
	/* example for nrDivs = 3 :
	(numbers represent index of point in vertices array)

	        y
        	^
	        |
	0    1  |  2    3
	        |
	4	 5	|  6    7
	--------|--------------> x
	8    9  |  10  11
	        |
	12  13  |  14  15

	*/

	// Generate vertices and normals
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];

	var yCoord = 0.5;

	var s = this.minS;
	var t = this.minT;

	for (var j = 0; j <= this.nrDivs; j++)
	{
		var xCoord = -0.5;
		for (var i = 0; i <= this.nrDivs; i++)
		{
			this.vertices.push(xCoord, yCoord, 0);

			// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
			// So all the vertices will have the same normal, (0, 0, 1).

			this.normals.push(0,0,1);

			// texCoords should be computed here; uncomment and fill the blanks
			this.texCoords.push(s, t);
			s += this.maxS / this.nrDivs;

			xCoord += this.patchLength;
		}
		s = this.minS;
		t += this.maxT / this.nrDivs;

		yCoord -= this.patchLength;
	}

	// Generating indices
	this.indices = [];
	var ind=0;


	for (var j = 0; j < this.nrDivs; j++)
	{
		for (var i = 0; i <= this.nrDivs; i++)
		{
			this.indices.push(ind);
			this.indices.push(ind+this.nrDivs+1);

			ind++;
		}
		if (j+1 < this.nrDivs)
		{
			// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
			// degenerate triangles will not generate fragments
			this.indices.push(ind+this.nrDivs);
			this.indices.push(ind);
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	this.initGLBuffers();
};
