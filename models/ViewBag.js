module.exports = function ViewBag(title, isPremium, traductionSelected, sens, francaisArea, encodageArea, encodageList){
    
    var vm = this;
    vm.title = title;
    vm.isPremium = isPremium;
    vm.traductionSelected = traductionSelected;
    vm.sens = sens;
    vm.francaisArea = francaisArea;
    vm.encodageArea = encodageArea;
    vm.encodageList = encodageList;
};