/**
* MyInterface
* @constructor
*/


function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
* init
* @param {CGFapplication} application
*/
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a button:
    // the first parameter is the object that is being controlled (in this case the scene)
    // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
    // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

    this.gui.add(this.scene, 'pauseContinue');

    // add a group of controls (and open/expand by defult)

    var lights=this.gui.addFolder("Lights");
    lights.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    lights.add(this.scene, 'light1');
    lights.add(this.scene, 'light2');
    lights.add(this.scene, 'light3');
    lights.add(this.scene, 'light4');
    lights.add(this.scene, 'light5');

    // add a slider
    // must be a numeric variable of the scene, initialized in scene.init e.g.
    // this.speed=3;
    // min and max values can be specified as parameters

    this.gui.add(this.scene, 'speed', -5, 5);

    this.gui.add(this.scene, 'textures'  , ['Metal', 'Rock', 'Coral', 'Fish']);

    return true;
};

/**
* processKeyboard
* @param event {Event}
*/
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this,event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    switch (event.keyCode)
    {
        //a ou A
        case (65):
        case (97):
        this.scene.submarine.rotate(1);
        break;

        //d ou D
        case (68):
        case (100):
        this.scene.submarine.rotate(-1);
        break;

        //f ou F
        case (70):
        case (102):
        if (!this.scene.torpedos[0].bezierAnimation)
            this.scene.torpedos[0].animate();
        break;

        //s ou S
        case (83):
        case (115):
        this.scene.submarine.decreaseVelocity();
        break;

        //w ou W
        case (87):
        case (119):
        this.scene.submarine.increaseVelocity();
        break;

        //p ou P
        case (80):
        case (112):
        this.scene.submarine.periscope.move(1);
        break;

        //L ou l
        case (76):
        case (108):
        this.scene.submarine.periscope.move(-1);
        break;

        //q ou Q
        case (81):
        case (113):
        this.scene.submarine.rotateVertically(-1);
        break;

        //e ou E
        case (69):
        case (101):
        this.scene.submarine.rotateVertically(1);
        break;
    };
};

MyInterface.prototype.processKeyUp = function(event) {
    CGFinterface.prototype.processKeyboard.call(this,event);

    switch (event.keyCode)
    {
        //a ou A
        case (65):
        case (97):
        this.scene.submarine.resetRotationAngle2();
        break;

        //d ou D
        case (68):
        case (100):
        this.scene.submarine.resetRotationAngle2();
        break;

        //q ou Q
        case (81):
        case (113):
        this.scene.submarine.resetRotationAngle4();
        break;

        //e ou E
        case (69):
        case (101):
        this.scene.submarine.resetRotationAngle4();
        break;
    };
};
