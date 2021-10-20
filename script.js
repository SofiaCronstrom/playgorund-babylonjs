
   const canvas = document.querySelector('#renderCanvas');
   const engine = new BABYLON.Engine(canvas, true);

   const createScene = () => {

       const scene = new BABYLON.Scene(engine);
        //camera
        const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI/2, 
        Math.PI / 2.9, 23, new BABYLON.Vector3(0,0,0));
        camera.attachControl(canvas, true);
        //light
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0));
        
        const ground = buildGround();
        
         
       
    const detached_house = buildHouse(1);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;
       
        
   

   const places = []; //each entry is an array [house type, rotation, x, z]
   places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
   places.push([1, -Math.PI / 16, -4.5, 3 ]);
   places.push([1, -Math.PI / 16, -1.5, 4 ]);
   places.push([1, -Math.PI / 3, 1.5, 6 ]);
   places.push([1, 15 * Math.PI / 16, -6.4, -1.5 ]);
   places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
   places.push([1, 15 * Math.PI / 16, -2.1, -0.5 ]);
   places.push([1, 5 * Math.PI / 4, 0, -1 ]);
   places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
   places.push([1, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
   places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
   places.push([1, Math.PI / 1.9, 4.75, -1 ]);
   places.push([1, Math.PI / 1.95, 4.5, -3 ]);
   places.push([1, Math.PI / 1.9, 4.75, -5 ]);
   places.push([1, Math.PI / 1.9, 4.75, -7 ]);
   places.push([1, -Math.PI / 3, 5.25, 2 ]);
   places.push([1, -Math.PI / 3, 6, 4 ]);

      //Create instances from the first two that were built 
      const houses = [];
      for (let i = 0; i < places.length; i++) {
          if (places[i][0] === 1) {
              houses[i] = detached_house.createInstance("house" + i);
          }
          else {
              return;
          }
          houses[i].rotation.y = places[i][1];
          houses[i].position.x = places[i][2];
          houses[i].position.z = places[i][3];
          console.log(places[i][3])
      }
      return scene;
}     


   const buildGround = () =>{
       
    //ground
       const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 15, height: 17, depth: 5})

       //texture
       const groundMat = new BABYLON.StandardMaterial('groundMat');
       groundMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0);
       ground.material = groundMat;
     }

     const buildHouse = (width) => {
        const box = buildBox(width);
        const roof = buildRoof(width);
    
        return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    }
     
     buildBox = () => {
       
       //texture
        const boxFur = new BABYLON.StandardMaterial('boxFur');
        boxFur.diffuseTexture = new BABYLON.Texture('waterbump.png');

        //world materials
        const box = BABYLON.MeshBuilder.CreateBox('box', {width: 1, height: 1.5, depth: 1.5});
        box.position = new BABYLON.Vector3(0, 0.75, 0);
        box.rotation.y = BABYLON.Tools.ToRadians(45);
        box.material = boxFur;

        return box;
     }
      buildRoof = () => {

       //texture
       const roofFur = new BABYLON.StandardMaterial("roofFur")
       roofFur.diffuseTexture = new BABYLON.Texture('fur.jpeg');
       
       //roof
       const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {diameter: 1.3, height: 1, tessellation: 3})
       roof.scaling.x = 2;
       roof.rotation.z = BABYLON.Tools.ToRadians(90);
       roof.rotation.y = BABYLON.Tools.ToRadians(-45);
       roof.position.y = 2.4;
       roof.material = roofFur;

       return roof;
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