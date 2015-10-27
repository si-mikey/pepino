var Create = function(){};

var stepNameCount = 0;

Create.prototype.addStep = function(insertionPoint, type){
  var inputGroupClass = "input-group";
  var inputGroupAddonClass = "input-group-addon";
  var stepInputName = "step_name_" + (stepNameCount += 1);

  var inputGroup = document.createElement("div");
  var inputGroupAddon = document.createElement("div");
  var stepInput = document.createElement("input");

  inputGroup.className = inputGroupClass;
  inputGroupAddon.className = inputGroupAddonClass;
  inputGroupAddon.innerHTML = type + " :";
  stepInput.className = "form-control";
  stepInput.name = stepInputName;

  $(inputGroup).append([inputGroupAddon, stepInput]);
  $(insertionPoint).append(inputGroup);

}
