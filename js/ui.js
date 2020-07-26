class Interfaz {


  constructor() {
    this.init();
  }
  init() {
    this.cosntruirSelect();
  }
  cosntruirSelect() {
    cotizador.obtenerMonedasAPI()
      .then(monedas => {

        const select = document.querySelector('#criptomoneda');

        for (const [key, value] of Object.entries(monedas.monedas.Data)) {
          //Añadir el symbol y el nombre de nuestras opciones
          const opcion = document.createElement('option');
          opcion.value = value.Symbol;
          opcion.appendChild(document.createTextNode(value.CoinName));
          select.appendChild(opcion);

        }

      })
  }



  mostrarMensaje(mensaje, clases) {
    const div = document.createElement('div');
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));

    //seleccionar mensajes
    const divMensajes = document.querySelector('.mensajes');
    divMensajes.appendChild(div);
    //mostrar contenido
    setTimeout(() => {
      document.querySelector('.mensajes div').remove();
    }, 3000);
  }

  //Imprime el resultado de la cotización
  mostrarResultado(resultado, moneda, crypto) {
    //En caso de un resultado anterior, ocultarlo
    const resultadoAnterior = document.querySelector('#resultado > div');
    if (resultadoAnterior) {
      resultadoAnterior.remove();
    }

    const datosMoneda = resultado[crypto][moneda];
    //Recortadar digitos de precio
    let precio = datosMoneda.PRICE.toFixed(2),
      variacion = datosMoneda.CHANGEPCTDAY.toFixed(2),
      actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');
    //Construir el template
    let templateHTML = `
    <div class="card bg-warning">
      <div class="card-body text-light">
        <h2 class="card-title">Resultado:</h2>
        <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
        <p>Variación último día: % ${variacion}</p>
        <p>ultima actualización:  ${actualizado}</p>

      </div>
    </div>    
    `;
    this.mostrarSpinner('block');
    setTimeout(() => {
      document.querySelector('#resultado').innerHTML = templateHTML;

      this.mostrarSpinner('none');

    }, 3000);
    //insertar resultado
  }

  mostrarSpinner(vista) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = vista;
  }
}