var Create = function(){};

var stepNameCount = 0;
Create.prototype.addStep = function(insertionPoint, type){
  var inputGroupClass = "input-group";
  var inputGroupAddonClass = "input-group-addon";
  var stepInputName = "step_name_" + (stepNameCount += 1);

  var inputGroup = document.createElement("div");
  var inputGroupAddon = document.createElement("div");
  var stepInput = document.createElement("input");
  var stepRemove = document.createElement("span");

  inputGroup.className = inputGroupClass;
  inputGroupAddon.className = inputGroupAddonClass;
  stepRemove.className = "glyphicon glyphicon-remove";
  inputGroupAddon.innerHTML = type + " :";
  stepInput.className = "form-control";
  stepInput.name = stepInputName;

  $(inputGroup).append([inputGroupAddon, stepInput, stepRemove]);
  $(insertionPoint).append(inputGroup);
};

var stepTypeCount = 0;
Create.prototype.addStepType = function(){
  var selectTypes = document.createElement("select");
  selectTypes.className = 'step-type'
  selectTypes.name = 'step_type_' + (stepTypeCount += 1);
  var types = ['Given', 'When', 'And', 'Then', 'But'];
  var optArr = [];
  types.forEach(function(t){
    var opt = document.createElement("option");
    opt.text = t;
    opt.value = t;
    optArr.push(opt); 
  }); 
  $(selectTypes).append(optArr); 
  return selectTypes;
};

Create.prototype.send = function(scenario){
  return $.ajax({
         type: "POST",
         url: "/api/scenario/send",
         data: {scenario: 'omfg' }
         });
};
