// Module Node
var fs = require("fs");

// Module projet
var Language = require("./../models/Language.js");
var Letter = require("./../models/Letter.js");

module.exports = function Codex (){
    
    // Constantes
    const LETTER_MINISCULE = "Minuscule";
    const LETTER_MAJUSCULE = "Majuscule";
    const LETTER_SEPECIAUX = "Speciaux";
    
    // Attributs
    var vm = this;
    vm.isPremium = false;
    vm.languages = [];
    

    // Créée les lettres d'une catégorie à partir d'une liste de lettre
    vm.createLetter = function(letterType, letterList){
        var result = [];
        
        letterList.forEach(function(letter){
           var priority = letter.priority;
           var normalChar = letter.normalChar;
           var translateChar = letter.translateChar;
           
           result.push(new Letter(priority, letterType, normalChar, translateChar));
        });
        
        return result;
    }
    
    // Récupération des langages
    fs.readdir("./ressources/", (err, files) => {
        if(err) console.error("Load ressources files: " + err);
        
        // Pour chaque langages en json
        files
            .filter(file => { return file.substr(-5) === '.json'; })
            .forEach(file => { 
                var language = require("./../ressources/" + file);

                var letterList = [];
                var minusculeList = language.minuscule;
                var majusculeList = language.majuscule;
                var speciauxList = language.speciaux;
                
                letterList = letterList.concat(
                    vm.createLetter(LETTER_MINISCULE, minusculeList)
                    , vm.createLetter(LETTER_MAJUSCULE, majusculeList)
                    ,  vm.createLetter(LETTER_SEPECIAUX, speciauxList)
                );
                
                vm.languages.push(new Language(language.name, language.isPremium, letterList));
            });
    });

    // Retourne les différents types de langage disponible
    vm.languageType = function(isPremium){
        var languageType = [];

        vm.languages.forEach(function(language) {
            if(isPremium && language.isPremium){
                languageType.push(language.name);
            }else if(!language.isPremium){
                languageType.push(language.name);
            }
        });

        return languageType;
    }
    
    // Retourne un language s'il existe
    vm.getLanguage = function(name){
        var language;
        var cpt = 0;
        
        do{
            if(vm.languages[cpt].name == name){
                language = vm.languages[cpt];
            }
            cpt++;
        }while(!language && cpt < vm.languages.length);
        
        
        return language;
    }
};