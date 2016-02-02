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
  $(inputGroupAddon).html(this.addStepType());
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
         data: scenario 
         });
};

var FormValidation = function(){};
FormValidation.prototype.allInputsSet = function(form){
  var errCount = 0;
  $(form + " .form-control").each(function(){
    if(this.value === null || this.value === ''){
      $(this).addClass("has-err");
      errCount += 1; 
    }else{
      $(this).removeClass("has-err");
    }
  })
  return (errCount > 0) ? false : true; 
};  

var Login = function(){};
Login.prototype.authenticate = function(email, pass){
  return $.ajax({
         type: "POST",
         url: "/api/auth",
         data: {'email': email, 'password': pass} 
         });
};

function getParamByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

var Queue = function(){};
Queue.prototype.findById = function(sid){
  return $.ajax({
         type: "GET",
         url: "/api/scenario/findBy/" + sid,
         });
};

