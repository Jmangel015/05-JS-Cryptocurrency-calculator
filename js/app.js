const cotizador = new API('ce631ad0e08a34438886139fe6701f690ff239784dd9826c00d35b4e5fcb8c1a');
const ui = new Interfaz();



//leer formulario

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  // leer moneda seleccionada
  const monedaSelect = document.querySelector('#moneda');
  const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
  // leer moneda seleccionada
  const crytoSelect = document.querySelector('#criptomoneda');
  const crytoSeleccionada = crytoSelect.options[crytoSelect.selectedIndex].value;

  //Comprueba si ambos campos tengan valores seleccionados
  if (monedaSeleccionada === '' || crytoSeleccionada === '') {
    //ALERTA DE ERROR
    ui.mostrarMensaje('Ambos campos son obligatorios ', 'alert bg-danger text-center');

  } else {
    //TODO ESTA BIEN, consultar la api
    cotizador.obtenerValores(monedaSeleccionada, crytoSeleccionada)
      .then(data => {
        ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, crytoSeleccionada);
      })
  }
})