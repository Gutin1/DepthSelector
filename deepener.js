// script.name=Deepener - Gutin1
// script.description=Places a layer at a certain depth of water / lava. Credit to
//
// script.param.multiplier.type=float
// script.param.multiplier.description=Depth multiplier
// script.param.multiplier.default=1
// script.param.multiplier.optional=false

var dim = world.getDimension(0);
var multiplier = params["multiplier"];

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
    deepen();
  }
}

print("Done!");

function deepen() {
  var height = dimension.getHeightAt(x, y);
  var waterHeight = Math.ceil(dimension.getWaterLevelAt(x, y));

  if (waterHeight > height) {
    var waterDepth = waterHeight - height;
    var lowerAmount = waterDepth * multiplier;
    var newHeight = waterHeight - lowerAmount;
    
    dimension.setHeightAt(x, y, newHeight);
  }
}

function truncate(number) {
  return number >= 0 ? Math.floor(number) : Math.ceil(number);
}
