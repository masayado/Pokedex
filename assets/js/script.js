//evento button
$(function () {
    $("#buscar").click(e=>{

        //validacion
        var numeroPokemon = $("#input_pokemon").val();
        var = regExNumbers = /^[0-9]*$/gm;
        if(numeroPokemon===""){
            alert("Input vacío. Ingresa un numero entre 1 y 807")
            return false;
        }
        else if(numeroPokemon.match(regExNumbers)){
            console.log(numeroPokemon);
            return true;
        }
        else{
            alert("Solo puedes ingresar números")
            return false;
        }

        console.log(numeroPokemon);
    })
});

function getPokemon(id){

}