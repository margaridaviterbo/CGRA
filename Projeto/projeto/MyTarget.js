/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene) {
 	CGFobject.call(this,scene);
    
 };

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function(){

}