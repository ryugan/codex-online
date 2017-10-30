// Module projet
var ViewBag = require("./../models/ViewBag.js");
var Codex = require("./../models/Codex.js");

//Constante
const TITLE = "Codex Online";
const PREMIUM_CODE = "lapinou"
const SENS_CODER = true;
const SENS_DECODER = false;
const METHOD_POST = "POST";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var homeController = function HomeController(){
    
    var vm = this;
    
    // Récupération du codex et de ses langages
    vm.codex = new Codex();

   vm.translate = function(languageSelected, sens, francaisArea, encodageArea){
        var translateText = "";

        if(languageSelected){

            if(sens == SENS_CODER){
                translateText = francaisArea;
                
                languageSelected.letterList.forEach(function(letter){
                    translateText = translateText.replaceAll(letter.normalChar, letter.translateChar);
                });
            }else{
                translateText = encodageArea;
                
                languageSelected.letterList.forEach(function(letter){
                    translateText = translateText.replaceAll(letter.translateChar, letter.normalChar);
                });
            }
        }
        
        return translateText;
    };
    
    vm.Index = function(request, response){

        var session = request.session;

        // Traitement des données en entrée
        session.isPremium = request.params.premium_code ? request.params.premium_code : session.isPremium ? session.isPremium : false;
        session.traductionSelected = request.body.traductionSelected ? request.body.traductionSelected : session.traductionSelected ? session.traductionSelected : "";
        session.sens = request.body.sens == "false" ? false : session.sens ? session.sens : true;
        var francaisArea = request.body.francaisArea ? request.body.francaisArea : "";
        var encodageArea = request.body.encodageArea ? request.body.encodageArea : "";
        var encodageList = vm.codex.languageType(session.isPremium);

        // Si la page a soumis un post, il faut faire une traduction
        if(request.method == METHOD_POST){
            var languageSelected = vm.codex.getLanguage(session.traductionSelected);
    
            if(session.sens == SENS_CODER){
                encodageArea = vm.translate(languageSelected, session.sens, francaisArea, encodageArea);
            }else{
                francaisArea = vm.translate(languageSelected, session.sens, francaisArea, encodageArea);
            }
        }

        // Intialisation des données de la réponse et transmission
        response.data = new ViewBag(TITLE, session.isPremium, session.traductionSelected, session.sens, francaisArea, encodageArea, encodageList);
        response.render('index', {data : response.data});
    };
};

module.exports = new homeController();
