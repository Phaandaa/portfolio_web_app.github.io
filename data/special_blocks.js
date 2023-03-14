console.log(mapObject)

const layers = mapObject.layers


function getLayerData(layerName) {
    data = []
    positionData = []
    for (i in layers) {
        console.log(layers[i]);
        if (layers[i].name == layerName){
            data = layers[i].data
            for (let i = 0; i < data.length; i += 100){
                positionData.push(data.slice(i, i + 100))}; 
            return positionData
        }
    }
    return "Layer not found"
}

const collisionsMap = getLayerData("Collisions")
const leftMuseumDoorTrigger = getLayerData("Open museum door detector left")