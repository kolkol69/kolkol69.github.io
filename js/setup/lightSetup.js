const createLights = (scene) => {
    const light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, -1), // alt ->(0,-1,1)
        scene);
    const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 0.3;
    light2.intensity = 0.5;
}