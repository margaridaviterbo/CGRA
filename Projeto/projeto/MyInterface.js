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
    this.gui = new dat.GUI();

    //add button to pause/continue clock
    this.gui.add(this.scene, 'pauseContinue');

    //add checkpoint to turn on/off lights
    var lights = this.gui.addFolder("Lights");
    lights.open();
    lights.add(this.scene, 'light1');
    lights.add(this.scene, 'light2');
    lights.add(this.scene, 'light3');
    lights.add(this.scene, 'light4');
    lights.add(this.scene, 'light5');

    //add slider to chenge scene speed
    this.gui.add(this.scene, 'speed', -5, 5);

    //add combobox to choose submarine's texture
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

    switch (event.keyCode)
    {
        //a or A
        case (65):
        case (97):
        this.scene.submarine.rotate(1);
        break;

        //d or D
        case (68):
        case (100):
        this.scene.submarine.rotate(-1);
        break;

        //f or F
        case (70):
        case (102):
        if (!this.scene.torpedos[0].bezierAnimation)
            this.scene.torpedos[0].animate();
        break;

        //s or S
        case (83):
        case (115):
        this.scene.submarine.decreaseVelocity();
        break;

        //w or W
        case (87):
        case (119):
        this.scene.submarine.increaseVelocity();
        break;

        //p or P
        case (80):
        case (112):
        this.scene.submarine.periscope.move(1);
        break;

        //L or l
        case (76):
        case (108):
        this.scene.submarine.periscope.move(-1);
        break;

        //q ou Q
        case (81):
        case (113):
        this.scene.submarine.rotateVertically(-1);
        break;

        //e or E
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
        //a or A
        case (65):
        case (97):
        this.scene.submarine.resetRotationAngle2();
        break;

        //d or D
        case (68):
        case (100):
        this.scene.submarine.resetRotationAngle2();
        break;

        //q or Q
        case (81):
        case (113):
        this.scene.submarine.resetRotationAngle4();
        break;

        //e or E
        case (69):
        case (101):
        this.scene.submarine.resetRotationAngle4();
        break;
    };
};
