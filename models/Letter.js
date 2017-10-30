module.exports = function Letter (priority, category, normalChar, translateChar){
    
    var vm = this;
    vm.priority = priority;
    vm.category = category;
    vm.normalChar = normalChar;
    vm.translateChar = translateChar;
    
};