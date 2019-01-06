const createAgentMeshes = (scene) => {
    const agents = new Array(agentsAmount)
    for (let i = 0; i < agentsAmount; i++) {
        agents[i] = BABYLON.MeshBuilder.CreateBox("", {
            height: HEIGHT,
            width: WIDTH,
            depth: DEPTH
        }, scene);
        agents[i].position.y = HEIGHT / 2;
    }
    return agents;
}

const createTargets = (scene) => {
    TARGET_POSITIONS.forEach((obstacle, i) => {
        const place = BABYLON.MeshBuilder.CreateSphere(`${i}`, {
            diameter: HEIGHT,
        }, scene);
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);

        // drag'n'drop START

        var pointerDragBehavior = new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
        });

        // Use drag plane in world space
        pointerDragBehavior.useObjectOrienationForDragging = false;

        // Listen to drag events
        pointerDragBehavior.onDragStartObservable.add((event) => {
            // console.log("dragStart");
            // console.log(event);
        })
        pointerDragBehavior.onDragObservable.add((event) => {
            // console.log("drag");
            // console.log(event);
        })
        pointerDragBehavior.onDragEndObservable.add((event) => {
            // console.log("dragEnd");
            // console.log('id:', place.id, '\nevent:\n',event);
            TARGET_POSITIONS[place.id] = {
                x: event.dragPlanePoint.x,
                y: event.dragPlanePoint.z,
            }
        })

        place.addBehavior(pointerDragBehavior);

        // drag'n'drop END

        place.position.y = HEIGHT * 2;
        place.position.x = obstacle.x;
        place.position.z = obstacle.y;
        place.material = myMaterial;
    });
}

const createTouristPlaces = (scene) => {
    
    OBSTACLE_POSITIONS.forEach((obstacle) => {
        var textureResolution = 1024;
        var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:1024, height:512}, scene);   
        var textureContext = textureGround.getContext();
        
        var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
        materialGround.diffuseTexture = textureGround;
        
        //Add text to dynamic texture
        var font = "bold 104px monospace";
        textureGround.drawText(obstacle.name, 75, 155, font, "black", "white", true, true);

        const place = BABYLON.MeshBuilder.CreateBox("", {
            height: HEIGHT * 2,
            width: obstacle.width,
            depth: obstacle.depth
        }, scene);
        place.position.y = HEIGHT;
        place.position.x = obstacle.x;
        place.position.z = obstacle.y;
        place.rotation.y = obstacle.rotation;
        place.material = materialGround;
    });
}

const resetTimers = () => {
    clearInterval(intervalID);
    cancelAnimationFrame(animationID);
}

const removeAgentMeshes = () => {
    for (let i = 0; i < agents.length; i++) {
        agents[i].dispose();
    }
}