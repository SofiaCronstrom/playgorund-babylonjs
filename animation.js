const canvas = document.querySelector('#renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    
    const scene = new BABYLON.Scene(engine);
    //camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    //light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0));

   
    //texture
    const boxFur = new BABYLON.StandardMaterial('boxFur');
    boxFur.diffuseColor = new BABYLON.Color3(0.7,0,0.2);
    
    //world materials
    const car = BABYLON.MeshBuilder.CreateBox('box', {width: 0.5, height: 0.3, depth: 0.3});
    car.material = boxFur;
    car.rotation.x = BABYLON.Tools.ToRadians(-90);



     //wheel material
    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("fur.jpeg");
    

    //Wheel animation
    const animWheel = new BABYLON.Animation('wheelAnimation', 'rotation.y', 30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    //KEY frame animation to animate by frame number
    const wheelKeys = [];

    //At the animation key 0, the value of rotation.y is 0, animation value and frame at start
    wheelKeys.push({
        frame: 0,
        value: 0
    });
    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation, animation value and frame at end
    wheelKeys.push({
        frame: 30,
        value: 2 * Math.PI
    });
    
    //set the keys
    animWheel.setKeys(wheelKeys)

    
    //right back wheel
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder('wheelRB', {diameter: 0.125, height: 0.05})
    wheelRB.material = wheelMat;
   wheelRB.parent = car;
   wheelRB.position.z = -0.15;
   wheelRB.position.x = -0.2;
   wheelRB.position.y = 0.15;

   //link the animation to the right back wheel
   wheelRB.animations = [];
   wheelRB.animations.push(animWheel);
   
   //clone right front wheel
   const wheelRF = wheelRB.clone("wheelRF");
   wheelRF.position.x = 0.2;
   
   //clone left back wheel
   const wheelLB = wheelRB.clone("wheelLB");
   wheelLB.position.y = -0.1 - 0.035;
   
   //clone right front wheel
   const wheelLF = wheelRF.clone("wheelLF");
   wheelLF.position.y = -0.1 - 0.035;

   
   
   //Begin animation - object to animate, first frame, last frame and loop if true
   scene.beginAnimation(wheelRB, 0, 30, true);
   scene.beginAnimation(wheelRF, 0, 30, true);
   scene.beginAnimation(wheelLB, 0, 30, true);
   scene.beginAnimation(wheelLF, 0, 30, true);
   
   return scene;

}



const scene = createScene();//Call the createScene function
   
// Register a render loop to repeatedly render the scene
engine.runRenderLoop( () => {
 scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener('resize', () => {
   
   engine.resize(); 
});


    //I NEED TO DOWNLOAD NPM EARCUT ALGORITHM
    // //base of the carshape
    // const outline = [
    //     new BABYLON.Vector3(-0.3,0,-0.1),
    //     new BABYLON.Vector3(0.2,0,-0.1),
    // ]

    // //curved front of the car
    // for (let i=0; i<20; i++){
    //     outline.pushoutline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    // }

    // outline.push(new BABYLON.Vector3(0, 0, 0.1));
    // outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    // const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});