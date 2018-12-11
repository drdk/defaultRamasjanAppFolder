import InitializeGame from './InitializeGame';

(function(w){
    function main(platform, element){
   let game = new InitializeGame(platform, element);
    }
    w.main = main;  
})(window);