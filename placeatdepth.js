// script.name=Place at Depth - Gutin1
// script.description=Places a layer at a certain depth of water / lava. Credit to
//
// script.param.depth.type=integer
// script.param.depth.description=Depth at which to apply layer
// script.param.depth.default=0
// script.param.depth.optional=false
//
// script.param.above.type=boolean
// script.param.above.description=Place above or below this depth?
// script.param.above.displayName=TRUE to place above this depth, FALSE to place below
// script.param.above.default=false
// script.param.above.optional=false
//
// script.param.land.type=boolean
// script.param.land.description=Also place the layer on land?
// script.param.land.displayName=TRUE to also apply the layer to land, FALSE to only place on water
// script.param.land.default=false
// script.param.land.optional=true
//
// script.param.layerName.type=string
// script.param.layerName.description=Name of the layer you will be placing
//
// script.param.opacity.type=float
// script.param.opacity.description=Opacity of the layer
// script.param.opacity.default=50
// script.param.opacity.optional=true

var dim = world.getDimension(0);
var depth = params["depth"];
var above = params["above"];
var layerValue = true;
var land = params["land"];

try {
  layer = wp.getLayer().withName(params["layerName"]).go();
} catch (err) {
  try {
    layer = wp.getLayer().fromWorld(world).withName(params["layerName"]).go();
  } catch (err) {
    throw (
      "Worldpainter only recognizes layers that are painted in the world somewhere. Therefore, draw a random dot with " +
      params["to"] +
      ".\n"
    );
  }
}

print("working");
var rect = dimension.getExtent();
var xMin = rect.getX() * 128;
var yMin = rect.getY() * 128;

for (var x = xMin; x < rect.getWidth() * 128 + xMin; x++) {
  for (var y = yMin; y < rect.getHeight() * 128 + yMin; y++) {
    if (
      !dimension.isTilePresent(
        truncate((x + xMin) / 128.0),
        truncate((y + yMin) / 128.0)
      )
    )
      continue;
      var height = dimension.getHeightAt(x, y);
      var waterHeight = dimension.getWaterLevelAt(x, y);
    if (land) {
      placeLayer(x, y, waterHeight, height);
    } else {
      var height = dimension.getHeightAt(x, y);
      var waterHeight = dimension.getWaterLevelAt(x, y);
      if (waterHeight > height) {
        placeLayer(x, y, waterHeight, height);
      }
    }
  }
}

print("Done!");

function placeLayer(x, y, waterHeight, height) {
  var waterDepth = waterHeight - height;

  if (above) {
    if (waterHeight <= height + params["depth"]) {
      dimension.setLayerValueAt(layer, x, y, params["opacity"] * 0.16);
      feedback(layer, x, y)
    }
  } else {
    if (waterHeight >= height + params["depth"]) {
      dimension.setLayerValueAt(layer, x, y, params["opacity"] * 0.16);
      feedback(layer, x, y)
    }
  }
}

function feedback(layer, x, y) {
  print('Placed ' + layer + ' at ' + x + ', ' + y);
}

function truncate(number) {
  return number > 0 ? Math.floor(number) : Math.ceil(number);
}
