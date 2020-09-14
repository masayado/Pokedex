//evento button
$(function () {
    $("#buscar").click(e=>{
        var numeroPokemon = $("#input_pokemon").val();

        //traer personaje
        getPokemon(numeroPokemon);

        //validacion
        var regExNumbers = /^[0-9]*$/gm;
        if(numeroPokemon === ""){
            alert("Input vacío. Ingresa un numero entre 1 y 807.")
            return false;
        }
        else if(numeroPokemon.match(regExNumbers)){
            console.log(numeroPokemon);
            return true;
        }
        else{
            alert("Solo puedes ingresar números.")
            return false;
        }
    })
});

function getPokemon(id){
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        success: function (response) {
            console.log("response=>", response);
            //imprimir data
            generarCard(response);
            $("#card").empty(generarCard(response));
            $("#card").append(generarCard(response));
        }
    });
}

function generarCard(personaje){
    var card = `
        <div class="card m-2" style="width: 100%;">
            <img class="card-img-top" src="${personaje.sprites.front_default}" alt="${personaje.name}">
            <div class="card-body">
                <h5 class="card-title text-uppercase text-center">${personaje.name}</h5>
                <p class="card-text"><b>Tipo:</b>&nbsp;${personaje.types[0].type.name}</p>
                <p class="card-text"><b>Habilidad:</b>&nbsp;${personaje.abilities[0].ability.name}</p>
            </div>
        </div>
    `
    return card;
}