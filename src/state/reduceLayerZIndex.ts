export default function reduceLayerZIndex(selectedItemId: string, changeZIndex: 'up' | 'down', existingLayers: Array<string>): Array<string> {
  const layers = [...existingLayers];

  const currentIndex = layers.findIndex(id => id === selectedItemId);

  // Add the layer on top if it doesn't exist 
  if (currentIndex === -1) {
    layers.push(selectedItemId);
    return layers;
  }

  // Layer cannot go down any further
  if (currentIndex === 0 && changeZIndex === 'down') {
    return layers;
  }
  // Layer cannot go up any further
  if (selectedItemId === layers[layers.length - 1] && changeZIndex === 'up') {
    return layers;
  }

  // The index we're moving to
  const newIndex = changeZIndex === 'up' ? currentIndex + 1 : currentIndex - 1;

  // Swap the selected layer with the one below or above it
  [layers[currentIndex], layers[newIndex]] = [layers[newIndex], layers[currentIndex]];

  return layers;
}