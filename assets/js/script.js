//evento button
$(function () {
    $("#buscar").click(e=>{
        buscarPokemon();
    })

//detectar enter
    $(document).keypress(e => { 
        if(e.which == 13){
         buscarPokemon();
        }
      });

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
        <div class="card p-3" style="width: 100%;">
            <img class="card-img-top" src="${personaje.sprites.front_default}" alt="${personaje.name}">
            <div class="card-body">
                <h5 class="card-title text-uppercase text-center font-weight-bold">${personaje.name}</h5>
                <p class="card-text text-center">Tipo: ${personaje.types[0].type.name}</p>
                <p class="card-text text-center">Habilidad: ${personaje.abilities[0].ability.name}</p>
            </div>
        </div>`

//grafico
var hp =  personaje.stats[0].base_stat;
var atk = personaje.stats[1].base_stat;
var def = personaje.stats[2].base_stat;
var sat = personaje.stats[3].base_stat;
var sdf = personaje.stats[4].base_stat;
var spd = personaje.stats[5].base_stat;
var pokeStats = [];
pokeStats.push(hp, atk, def, sat, sdf, spd);
     
    var chart = new CanvasJS.Chart("grafico", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
          text: "Stats Pokémon"
        },
        data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "doughnut",
          dataPoints: [
            { label: "HP",  y:parseFloat(hp)  },
            { label: "Ataque", y: parseFloat(atk)  },
            { label: "Defensa", y: parseFloat(def) },
            { label: "Ataque Especial",  y: parseFloat(sat) },
            { label: "Defensa Especial",  y: parseFloat(sdf)  },
            { label: "Velocidad",  y: parseFloat(spd)  }
          ]
        }
        ]
      });
      chart.render();
     return card;
};

function buscarPokemon(){
    var numeroPokemon = $("#input_pokemon").val();

    //traer personaje
    getPokemon(numeroPokemon);

    //validacion
    var regExNumbers = /^[0-9]*$/gm;
    if(numeroPokemon === ""){
        alert("Input vacío. Ingresa un numero entre 1 y 807.")
        $("#input_pokemon").val("");
        $("#input_pokemon").focus();
        return false;
    }
    else if(numeroPokemon.match(regExNumbers)){
        console.log(numeroPokemon);
        $("#input_pokemon").val("");
        $("#input_pokemon").focus();
        return true;
    }
    else{
        alert("Solo puedes ingresar números.")
        $("#input_pokemon").val("");
        $("#input_pokemon").focus();
        return false;
    }
}
