// script.name=Deepener - Gutin1
// script.description=Places a layer at a certain depth of water / lava. Credit to
//
// script.param.watermap.type=file
// script.param.watermap.description=Water heightmap
// script.param.watermap.displayName=Water heightmap
// script.param.watermap.optional=false
//
// script.param.bit.type=boolean
// script.param.bit.description=check for 16 bit images, uncheck for 8 bit images
// script.param.bit.displayName=16 bit heightmap
// script.param.bit.default=true
//
// script.param.multiplier.type=float
// script.param.multiplier.description=Depth multiplier
// script.param.multiplier.default=1
// script.param.multiplier.optional=false


var dim = world.getDimension(0);
var multiplier = params["multiplier"];
var heightMap = wp.getHeightMap().fromFile(params["watermap"].getAbsolutePath()).go();

if (params["bit"]) multiplier /= 256.0; //16 bit

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
    deepen(heightMap, multiplier);
  }
}

print("Done!");

function deepen(heightMap, multiplier) {
  var height = dimension.getHeightAt(x, y);
  var lowerAmount = heightMap.getHeight(x, y) * multiplier;

  var newHeight = height - lowerAmount;

  dimension.setHeightAt(x, y, newHeight);
}

function truncate(number) {
  return number >= 0 ? Math.floor(number) : Math.ceil(number);
}
