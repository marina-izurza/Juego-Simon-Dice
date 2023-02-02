$(document).ready(function() {

    const colores = ["rojo","azul","verde","amarillo"];

    let patronJuego = [];
    let patronUsuario = [];

    let start = false;
    let nivel = 0;


    //Al clicar el h2:
    $("h2").click(function () {
        
        if (!start) {
            $("h2").text("Nivel " + nivel);
            siguienteSecuencia();
            start = true;
        }
    });


    $(".btn").click(function() {

        //Guardo aquí el color pulsado
        let colorUsuario = $(this).attr("id");

        //Añadimos al final del array
        patronUsuario.push(colorUsuario);

        playSonido(colorUsuario);
        animacion(colorUsuario);

        comprobacion(patronUsuario.length - 1); 

    });


    function siguienteSecuencia() {

        patronUsuario = [];
        nivel++;

        $("h2").text("Nivel " + nivel);


        //Genero un random
        numRandom = Math.floor(Math.random() * 3) + 0;

        //Asignamos el random a una posición del array de colores
        let colorRandom = colores[numRandom];

        //Coloco el último color aleatorio al final del array del pattern
        patronJuego.push(colorRandom);

        //hacerlo con toggle()
        $("#" + colorRandom).fadeIn(100).fadeOut(100).fadeIn(100);

        playSonido(colorRandom);
    };

    //Comprobamos los patrones
    function comprobacion(nivelAhora) {
        
        if (patronJuego[nivelAhora] === patronUsuario[nivelAhora]) {
            if (patronUsuario.length === patronJuego.length) {
                setTimeout(function() {
                    siguienteSecuencia();
                }, 1000);
            }
        } else {
            playSonido("mal");
            $("body").addClass("perdido")
            $("h2").text("Has Perdido, Pulsa Aquí para Reiniciar");

            setTimeout(function() {
                $("body").removeClass("perdido");
            }, 200);

            reiniciar();
        }
    };

    //Reproductor de sonidos
    function playSonido(archivo) {
        let sonido = new Audio("sonidos/" + archivo + ".mp3");
        sonido.play();
    };


    //Animaciones al pulsar
    function animacion(colorAhora) {
        $("#" + colorAhora).addClass("pulsado");
        setTimeout(function() {
            $("#" + colorAhora).removeClass("pulsado")
        }, 100);
    };


    //Reiniciamos partida
    function reiniciar() {
        nivel = 0;
        patronJuego = [];
        start = false;
    };


});