const canvas = document.querySelector('#renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    
    const scene = new BABYLON.Scene(engine);
    //camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    //light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0));

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

    //texture
    const boxFur = new BABYLON.StandardMaterial('boxFur');
    boxFur.diffuseColor = new BABYLON.Color3(1,0,0);

    //world materials
    const car = BABYLON.MeshBuilder.CreateBox('box', {width: 0.5, height: 0.3, depth: 0.3});
    car.material = boxFur;


    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");
    
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder('wheelRB', {diameter: 0.125, height: 0.05})
    wheelRB.material = wheelMat;
   wheelRB.parent = car;
   wheelRB.position.z = -0.15;
   wheelRB.position.x = -0.2;
   wheelRB.position.y = 0.15;
   

   const wheelRF = wheelRB.clone("wheelRF");
   wheelRF.position.x = 0.2;
   
   const wheelLB = wheelRB.clone("wheelLB");
   wheelLB.position.y = -0.1 - 0.035;
   
   const wheelLF = wheelRF.clone("wheelLF");
   wheelLF.position.y = -0.1 - 0.035;

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