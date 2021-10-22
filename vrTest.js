const canvas = document.querySelector('#renderCanvas');
const engine = new BABYLON.Engine(canvas, true);


const createScene = () => {
   const scene = new BABYLON.Scene(engine);
   scene.clearColor = new BABYLON.Color3.Black;
   
   //rotating camera
   const alpha =  Math.PI/4;
   const beta = Math.PI/3;
   const radius = 8;
   const target = new BABYLON.Vector3(0, 0, 0);
   const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
   camera.attachControl(canvas, true);
   
   const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));


   //box material
   const boxMat = new BABYLON.StandardMaterial('material', scene);
   boxMat.diffuseColor = BABYLON.Color3.Random(); 
   const box = new BABYLON.MeshBuilder.CreateBox('box', {});
   box.position.x = 0.5;
   box.position.y = 1;
   box.material = boxMat;
   
    //box action, move box on click and change random color
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
       BABYLON.ActionManager.OnPickTrigger, (evt) => {

        const sourceBox = evt.meshUnderPointer;
      console.log(evt.meshUnderPointer);
        //move box under click
        sourceBox.position.x += 0.1;
        sourceBox.position.y += 0.1;

        //update the color
        boxMat.diffuseColor = BABYLON.Color3.Random();
       }));


   return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener('resize', () => {
      
   engine.resize(); 
});