  function parseDecimal(value) {
    return parseFloat(value.replace(",", "."));
  }

  function formatDecimal(value, decimalPlaces) {
    return parseFloat(value).toFixed(decimalPlaces).replace('.', ',');
  }

  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("menuBtn").style.display = "none";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("menuBtn").style.display = "inline";
  }

  function coletaNumero(event) {

    event.preventDefault();

    var now = new Date();
    var year = now.getFullYear().toString().slice(-2);
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");

    var coletaNumber = year + month + day + hours + minutes + seconds;

    document.getElementById("coleta").value = coletaNumber;
  }

  window.onload = function() {
    var tipoCorpoDeProva = document.getElementById('tipoCorpoDeProva');
    var tdLargura = document.getElementById('tdLargura');
    var tdLargura2 = document.getElementById('tdLargura2');
    
    if (tipoCorpoDeProva && tdLargura) {
        tipoCorpoDeProva.onchange = function() {
            if (tipoCorpoDeProva.value == "Tubular"){
              tdLargura.textContent = "Diâmetro médio (mm):";
              tdLargura2.textContent = "Diâmetro médio (mm):";
            } else {
              tdLargura.textContent = "Largura (mm):";
              tdLargura2.textContent = "Largura (mm):";
            }
        }
    }

  }

  function especificados() {
    var composto = document.getElementById('composto').value;
    var minimoAlongamento = document.getElementById('minimoAlongamento');
    var minimoRuptura = document.getElementById('minimoRuptura');
    var variacaoEspecificada = document.getElementById('variacaoEspecificada');
    var tipoCorpoDeProva = document.getElementById('tipoCorpoDeProva');

    if (composto == "PVC-C") {
        minimoAlongamento.value = 125;
        minimoRuptura.value = formatDecimal(12.5, 1);
    }else if (composto == "PVC-A") { 
        minimoAlongamento.value = 150;
        minimoRuptura.value = formatDecimal(12.5, 1);
    }else if (composto == "PVC-D"){
        minimoAlongamento.value = 150;
        minimoRuptura.value = 10;
    }else if (composto == "PVC-E"){
        minimoAlongamento.value = 150;
        minimoRuptura.value = 15;
    } else {
        minimoAlongamento.value = "";
        minimoRuptura.value = "";
    }

    variacaoEspecificada.value = "± 25";
    
    verificarValores()
  }

  function resultadosSemEnvelhecimento(event){
    event.preventDefault();
    calcularArea();
    calcularMedia();
    calcularAlongamento();
    calcularRupturaArea();
    calcularMediana();
    verificarValores();
    copiarDimensoes();
    calcularMediaAposEnvelhec(); 
  }

  function resultadosAposEnvelhecimento(event){
    event.preventDefault();
    calcularArea();
    calcularAlongamentoAposEnvelhec(event);
    calcularRupturaAreaAposEnvelhec(event);
    calcularMedianaAposEnvelhec(event);
    calcularVariacao(event);
    verificarValoresAposEnvelhec(event); 
  }


  function verificarValores() {
    var minimoAlongamento = parseFloat(document.getElementById('minimoAlongamento').value);
    var minimoRuptura = parseFloat(document.getElementById('minimoRuptura').value);
    var medianaAlongamentos = parseFloat(document.getElementById('mediana_calculada').value);
    var medianaRupturas = parseFloat(document.getElementById('mediana_ruptura_MPa').value);

    if (medianaAlongamentos >= minimoAlongamento) {
        document.getElementById('mediana_calculada').style.color = '#90ee90';
    } else {
        document.getElementById('mediana_calculada').style.color = '#ff7f7f';
    }

    if (medianaRupturas >= minimoRuptura) {
        document.getElementById('mediana_ruptura_MPa').style.color = '#90ee90';
    } else {
        document.getElementById('mediana_ruptura_MPa').style.color = '#ff7f7f';
    }
}

  function verificarValoresAposEnvelhec() {
    var minimoAlongamento = parseFloat(document.getElementById('minimoAlongamento').value);
    var minimoRuptura = parseFloat(document.getElementById('minimoRuptura').value);
    var medianaAlongamentos_2 = parseFloat(document.getElementById('mediana_calculada_2').value);
    var medianaRupturas_2 = parseFloat(document.getElementById('mediana_ruptura_MPa_2').value);

    if (medianaAlongamentos_2 >= minimoAlongamento) {
      document.getElementById('mediana_calculada_2').style.color = '#90ee90';
  } else {
      document.getElementById('mediana_calculada_2').style.color = '#ff7f7f';
  }

  if (medianaRupturas_2 >= minimoRuptura) {
      document.getElementById('mediana_ruptura_MPa_2').style.color = '#90ee90';
  } else {
      document.getElementById('mediana_ruptura_MPa_2').style.color = '#ff7f7f';
  }
  }

  function calcularArea(){

    const espessura1 = parseDecimal(document.getElementsByName("espessura1")[0].value);
    const espessura2 = parseDecimal(document.getElementsByName("espessura2")[0].value);
    const largura1 = parseDecimal(document.getElementsByName("largura1")[0].value);
    const largura2 = parseDecimal(document.getElementsByName("largura2")[0].value);
    var tipoCorpoDeProva = document.getElementById('tipoCorpoDeProva').value;
    let area1;
    let area2;

    if (tipoCorpoDeProva == "Tubular" ) {
      area1 = (Math.PI * (largura1 - espessura1) * espessura1);
      area2 = (Math.PI * (largura2 - espessura2) * espessura2);
    } else if (tipoCorpoDeProva == "Borboleta" ) {
      area1 = (largura1 * espessura1);
      area2 = (largura2 * espessura2);
    } else {
      area1 = "--";
      area2 = "--";
    }
  
    document.getElementById("area1").value = formatDecimal(area1, 2);
    document.getElementById("area2").value = formatDecimal(area2, 2);
  
  }
  

  function calcularMedia() {

    const espessura1 = parseDecimal(document.getElementsByName("espessura1")[0].value);
    const espessura2 = parseDecimal(document.getElementsByName("espessura2")[0].value);
    const largura1 = parseDecimal(document.getElementsByName("largura1")[0].value);
    const largura2 = parseDecimal(document.getElementsByName("largura2")[0].value);
    const area1 = parseDecimal(document.getElementsByName("area1")[0].value);
    const area2 = parseDecimal(document.getElementsByName("area2")[0].value);

    if (isNaN(espessura1) || isNaN(espessura2) || isNaN(largura1) || isNaN(largura2) || isNaN(area1) || isNaN(area2)) {
      alert("Por favor, insira valores numéricos válidos para espessuras, larguras e áreas.");
      return;
    }

    const mediaEspessura = (espessura1 + espessura2) / 2;
    const mediaLargura = (largura1 + largura2) / 2;
    const mediaArea = (area1 + area2) / 2;

    document.getElementById("media_espessura").value = formatDecimal(mediaEspessura, 2);
    document.getElementById("media_largura").value = formatDecimal(mediaLargura, 2);
    document.getElementById("media_area").value = formatDecimal(mediaArea, 2); 
    
}


  function copiarDimensoes () {

    const espessura1_2 = document.getElementsByName("espessura1")[0].value;
    const espessura2_2 = document.getElementsByName("espessura2")[0].value;
    const largura1_2 = document.getElementsByName("largura1")[0].value;
    const largura2_2 = document.getElementsByName("largura2")[0].value;
    const area1_2 = document.getElementsByName("area1")[0].value;
    const area2_2 = document.getElementsByName("area2")[0].value;

    document.getElementById("espessura1_2").value = espessura1_2;
    document.getElementById("espessura2_2").value = espessura2_2;
    document.getElementById("largura1_2").value = largura1_2;
    document.getElementById("largura2_2").value = largura2_2;
    document.getElementById("area1_2").value = area1_2;
    document.getElementById("area2_2").value = area2_2;

  }

  function calcularMediaAposEnvelhec() {

    const espessura1_2 = parseDecimal(document.getElementsByName("espessura1_2")[0].value);
    const espessura2_2 = parseDecimal(document.getElementsByName("espessura2_2")[0].value);
    const largura1_2 = parseDecimal(document.getElementsByName("largura1_2")[0].value);
    const largura2_2 = parseDecimal(document.getElementsByName("largura2_2")[0].value);
    const area1_2 = parseDecimal(document.getElementsByName("area1_2")[0].value);
    const area2_2 = parseDecimal(document.getElementsByName("area2_2")[0].value);

    if (isNaN(espessura1_2) || isNaN(espessura2_2) || isNaN(largura1_2) || isNaN(largura2_2) || isNaN(area1_2) || isNaN(area2_2)) {
      alert("Por favor, insira valores numéricos válidos para espessuras, larguras e áreas.");
      return;
    }

    const mediaEspessura_2 = (espessura1_2 + espessura2_2) / 2;
    const mediaLargura_2 = (largura1_2 + largura2_2) / 2;
    const mediaArea_2 = (area1_2 + area2_2) / 2;

    document.getElementById("media_espessura_2").value = formatDecimal(mediaEspessura_2, 2);
    document.getElementById("media_largura_2").value = formatDecimal(mediaLargura_2, 2);
    document.getElementById("media_area_2").value = formatDecimal(mediaArea_2, 2);
  }



function calcularAlongamento() {

  const distancia = parseDecimal(document.getElementById("distancia").value);
  const alongamento1 = parseDecimal(document.getElementsByName("alongamento1")[0].value);
  const alongamento2 = parseDecimal(document.getElementsByName("alongamento2")[0].value);

  if (isNaN(distancia)) {
    alert("Por favor, insira um valor numérico válido para a distância.");
    return;
  }

  const calculo1 = isNaN(alongamento1) ? "" : formatDecimal(((alongamento1 - distancia) / distancia) * 100, 0);
  const calculo2 = isNaN(alongamento2) ? "" : formatDecimal(((alongamento2 - distancia) / distancia) * 100, 0);

  document.getElementById("calculado1").value = calculo1;
  document.getElementById("calculado2").value = calculo2;

  verificarValores();
}

function calcularAlongamentoAposEnvelhec() {

  const distancia = parseDecimal(document.getElementById("distancia").value);
  const alongamento1_2 = parseDecimal(document.getElementsByName("alongamento1_2")[0].value);
  const alongamento2_2 = parseDecimal(document.getElementsByName("alongamento2_2")[0].value);

  if (isNaN(distancia)) {
    alert("Por favor, insira um valor numérico válido para a distância.");
    return;
  }

  const calculo1_2 = isNaN(alongamento1_2) ? "" : formatDecimal(((alongamento1_2 - distancia) / distancia) * 100, 0);
  const calculo2_2 = isNaN(alongamento2_2) ? "" : formatDecimal(((alongamento2_2 - distancia) / distancia) * 100, 0);

  document.getElementById("calculado1_2").value = calculo1_2;
  document.getElementById("calculado2_2").value = calculo2_2;

  return [calculo1_2, calculo2_2];
}
  

  function calcularAlongamento2() {

    const distancia = parseDecimal(document.getElementById("distancia").value);
    const alongamento1 = parseDecimal(document.getElementsByName("alongamento1_2")[0].value);
    const alongamento2 = parseDecimal(document.getElementsByName("alongamento2_2")[0].value);

    if (isNaN(distancia)) {
      alert("Por favor, insira um valor numérico válido para a distância.");
      return;
    }

    const calculo1 = isNaN(alongamento1) ? "" : formatDecimal(((alongamento1 - distancia) / distancia) * 100, 0);
    const calculo2 = isNaN(alongamento2) ? "" : formatDecimal(((alongamento2 - distancia) / distancia) * 100, 0);

    document.getElementById("calculado1_2").value = calculo1;
    document.getElementById("calculado2_2").value = calculo2;

    return [calculo1, calculo2];
  }

  function calcularAlongamento2AposEnvelhec() {

    const distancia = parseDecimal(document.getElementById("distancia").value);
    const alongamento1_2 = parseDecimal(document.getElementsByName("alongamento1_2")[0].value);
    const alongamento2_2 = parseDecimal(document.getElementsByName("alongamento2_2")[0].value);

    if (isNaN(distancia)) {
      alert("Por favor, insira um valor numérico válido para a distância.");
      return;
    }

    const calculo1_2 = isNaN(alongamento1_2) ? "" : formatDecimal(((alongamento1_2 - distancia) / distancia) * 100, 0);
    const calculo2_2 = isNaN(alongamento2_2) ? "" : formatDecimal(((alongamento2_2 - distancia) / distancia) * 100, 0);

    document.getElementById("calculado1").value = calculo1_2;
    document.getElementById("calculado2").value = calculo2_2;

    return [calculo1_2, calculo2_2];
  }



  function calcularRupturaArea() {
  
    const ruptura1 = parseDecimal(document.getElementsByName("ruptura1")[0].value);
    const ruptura2 = parseDecimal(document.getElementsByName("ruptura2")[0].value);
    const area1 = parseDecimal(document.getElementsByName("area1")[0].value);
    const area2 = parseDecimal(document.getElementsByName("area2")[0].value);
  
    if (isNaN(ruptura1) || isNaN(ruptura2) || isNaN(area1) || isNaN(area2)) {
      alert("Por favor, insira valores numéricos válidos para rupturas e áreas.");
      return;
    }
  
    const rupturaArea1 = (ruptura1 / area1).toFixed(2);
    const rupturaArea2 = (ruptura2 / area2).toFixed(2);
  
    document.getElementById("ruptura_area1").value = formatDecimal(rupturaArea1, 2);
    document.getElementById("ruptura_area2").value = formatDecimal(rupturaArea2, 2);
  
    const rupturaMPa1 = (rupturaArea1 * 9.806).toFixed(2);
    const rupturaMPa2 = (rupturaArea2 * 9.806).toFixed(2);
  
    document.getElementById("ruptura_MPa1").value = formatDecimal(rupturaMPa1, 2);
    document.getElementById("ruptura_MPa2").value = formatDecimal(rupturaMPa2, 2);
  
    verificarValores();
  }

  function calcularRupturaAreaAposEnvelhec() {

    const ruptura1_2 = parseFloat(document.getElementsByName("ruptura1_2")[0].value.replace(',', '.'));
    const ruptura2_2 = parseFloat(document.getElementsByName("ruptura2_2")[0].value.replace(',', '.'));
    const area1_2 = parseFloat(document.getElementsByName("area1_2")[0].value.replace(',', '.'));
    const area2_2 = parseFloat(document.getElementsByName("area2_2")[0].value.replace(',', '.'));

    if (isNaN(ruptura1_2) || isNaN(ruptura2_2) || isNaN(area1_2) || isNaN(area2_2)) {
      alert("Por favor, insira valores numéricos válidos para rupturas e áreas.");
      return;
    }

    const rupturaArea1_2 = (ruptura1_2 / area1_2).toFixed(2);
    const rupturaArea2_2 = (ruptura2_2 / area2_2).toFixed(2);

    document.getElementById("ruptura_area1_2").value = formatDecimal(rupturaArea1_2, 2);
    document.getElementById("ruptura_area2_2").value = formatDecimal(rupturaArea2_2, 2);

    const rupturaMPa1_2 = (rupturaArea1_2 * 9.806).toFixed(2);
    const rupturaMPa2_2 = (rupturaArea2_2 * 9.806).toFixed(2);

    document.getElementById("ruptura_MPa1_2").value = formatDecimal(rupturaMPa1_2, 2);
    document.getElementById("ruptura_MPa2_2").value = formatDecimal(rupturaMPa2_2, 2);
  }
  
  function calcularMediana() {
  
    const calculado1 = parseDecimal(document.getElementById("calculado1").value);
    const calculado2 = parseDecimal(document.getElementById("calculado2").value);
    const rupturaArea1 = parseDecimal(document.getElementById("ruptura_area1").value);
    const rupturaArea2 = parseDecimal(document.getElementById("ruptura_area2").value);
    const rupturaMPa1 = parseDecimal(document.getElementById("ruptura_MPa1").value);
    const rupturaMPa2 = parseDecimal(document.getElementById("ruptura_MPa2").value);
  
    if (isNaN(calculado1) || isNaN(calculado2) || isNaN(rupturaArea1) || isNaN(rupturaArea2) || isNaN(rupturaMPa1) || isNaN(rupturaMPa2)) {
      alert("Por favor, calcule os valores de alongamento e ruptura antes de calcular as medianas.");
      return;
    }
  
    const valoresCalculados = [calculado1, calculado2].sort((a, b) => a - b);
    const valoresArea = [rupturaArea1, rupturaArea2].sort((a, b) => a - b);
    const valoresMPa = [rupturaMPa1, rupturaMPa2].sort((a, b) => a - b);
  
    let medianaCalculada, medianaRupturaArea, medianaRupturaMPa;
  
    if (valoresCalculados.length % 2 === 0) {
      medianaCalculada = (valoresCalculados[valoresCalculados.length / 2 - 1] + valoresCalculados[valoresCalculados.length / 2]) / 2;
    } else {
      medianaCalculada = valoresCalculados[Math.floor(valoresCalculados.length / 2)];
    }
  
    if (valoresArea.length % 2 === 0) {
      medianaRupturaArea = (valoresArea[valoresArea.length / 2 - 1] + valoresArea[valoresArea.length / 2]) / 2;
    } else {
      medianaRupturaArea = valoresArea[Math.floor(valoresArea.length / 2)];
    }
  
    if (valoresMPa.length % 2 === 0) {
      medianaRupturaMPa = (valoresMPa[valoresMPa.length / 2 - 1] + valoresMPa[valoresMPa.length / 2]) / 2;
    } else {
      medianaRupturaMPa = valoresMPa[Math.floor(valoresMPa.length / 2)];
    }
  
    document.getElementById("mediana_calculada").value = formatDecimal(medianaCalculada, 2);
    document.getElementById("mediana_ruptura_area").value = formatDecimal(medianaRupturaArea, 2);
    document.getElementById("mediana_ruptura_MPa").value = formatDecimal(medianaRupturaMPa, 2);
  }
  

  function calcularMedianaAposEnvelhec() {
  
    const calculado1_2 = parseDecimal(document.getElementById("calculado1_2").value);
    const calculado2_2 = parseDecimal(document.getElementById("calculado2_2").value);
    const rupturaArea1_2 = parseDecimal(document.getElementById("ruptura_area1_2").value);
    const rupturaArea2_2 = parseDecimal(document.getElementById("ruptura_area2_2").value);
    const rupturaMPa1_2 = parseDecimal(document.getElementById("ruptura_MPa1_2").value);
    const rupturaMPa2_2 = parseDecimal(document.getElementById("ruptura_MPa2_2").value);
  
    if (isNaN(calculado1_2) || isNaN(calculado2_2) || isNaN(rupturaArea1_2) || isNaN(rupturaArea2_2) || isNaN(rupturaMPa1_2) || isNaN(rupturaMPa2_2)) {
      alert("Por favor, calcule os valores de alongamento e ruptura antes de calcular as medianas.");
      return;
    }
  
    const valoresCalculados_2 = [calculado1_2, calculado2_2].sort((a, b) => a - b);
    const valoresArea_2 = [rupturaArea1_2, rupturaArea2_2].sort((a, b) => a - b);
    const valoresMPa_2 = [rupturaMPa1_2, rupturaMPa2_2].sort((a, b) => a - b);
  
    let medianaCalculada_2, medianaRupturaArea_2, medianaRupturaMPa_2;
  
    if (valoresCalculados_2.length % 2 === 0) {
      medianaCalculada_2 = (valoresCalculados_2[valoresCalculados_2.length / 2 - 1] + valoresCalculados_2[valoresCalculados_2.length / 2]) / 2;
    } else {
      medianaCalculada_2 = valoresCalculados_2[Math.floor(valoresCalculados_2.length / 2)];
    }
  
    if (valoresArea_2.length % 2 === 0) {
      medianaRupturaArea_2 = (valoresArea_2[valoresArea_2.length / 2 - 1] + valoresArea_2[valoresArea_2.length / 2]) / 2;
    } else {
      medianaRupturaArea_2 = valoresArea_2[Math.floor(valoresArea_2.length / 2)];
    }
  
    if (valoresMPa_2.length % 2 === 0) {
      medianaRupturaMPa_2 = (valoresMPa_2[valoresMPa_2.length / 2 - 1] + valoresMPa_2[valoresMPa_2.length / 2]) / 2;
    } else {
      medianaRupturaMPa_2 = valoresMPa_2[Math.floor(valoresMPa_2.length / 2)];
    }
  
    document.getElementById("mediana_calculada_2").value = formatDecimal(medianaCalculada_2, 2);
    document.getElementById("mediana_ruptura_area_2").value = formatDecimal(medianaRupturaArea_2, 2);
    document.getElementById("mediana_ruptura_MPa_2").value = formatDecimal(medianaRupturaMPa_2, 2);
  }
  

  function calcularVariacao() {
  
    const medianaCalculada_1 = parseFloat(document.getElementById("mediana_calculada").value.replace(',', '.'));
    const medianaCalculada_2 = parseFloat(document.getElementById("mediana_calculada_2").value.replace(',', '.'));
  
    const medianaRupturaArea_1 = parseFloat(document.getElementById("mediana_ruptura_area").value.replace(',', '.'));
    const medianaRupturaArea_2 = parseFloat(document.getElementById("mediana_ruptura_area_2").value.replace(',', '.'));
  
    const medianaRupturaMPa_1 = parseFloat(document.getElementById("mediana_ruptura_MPa").value.replace(',', '.'));
    const medianaRupturaMPa_2 = parseFloat(document.getElementById("mediana_ruptura_MPa_2").value.replace(',', '.'));
  
    if (isNaN(medianaCalculada_1) || isNaN(medianaCalculada_2) || isNaN(medianaRupturaArea_1) || isNaN(medianaRupturaArea_2) || isNaN(medianaRupturaMPa_1) || isNaN(medianaRupturaMPa_2)) {
      alert("Por favor, insira valores numéricos válidos para rupturas e áreas.");
      return;
    }
  
    const variacaoCalculada = medianaCalculada_1 !== 0 ? ((medianaCalculada_2 - medianaCalculada_1) / medianaCalculada_1) * 100 : 0;
    const variacaoRupturaArea = medianaRupturaArea_1 !== 0 ? ((medianaRupturaArea_2 - medianaRupturaArea_1) / medianaRupturaArea_1) * 100 : 0;
    const variacaoRupturaMPa = medianaRupturaMPa_1 !== 0 ? ((medianaRupturaMPa_2 - medianaRupturaMPa_1) / medianaRupturaMPa_1) * 100 : 0;
  
    const limitLower = -25, limitUpper = 25;
  
    document.getElementById("variacaoCalculada").value = formatDecimal(variacaoCalculada, 2);
    document.getElementById("variacaoCalculada").style.color = (variacaoCalculada >= limitLower && variacaoCalculada <= limitUpper) ? '#90ee90' : '#ff7f7f';
  
    document.getElementById("variacaoRupturaArea").value = formatDecimal(variacaoRupturaArea, 2);
    document.getElementById("variacaoRupturaArea").style.color = (variacaoRupturaArea >= limitLower && variacaoRupturaArea <= limitUpper) ? '#90ee90' : '#ff7f7f';
  
    document.getElementById("variacaoRupturaMPa").value = formatDecimal(variacaoRupturaMPa, 2);
    document.getElementById("variacaoRupturaMPa").style.color = (variacaoRupturaMPa >= limitLower && variacaoRupturaMPa <= limitUpper) ? '#90ee90' : '#ff7f7f';
  }

  function limparCampos() {
    var formulario = $('form');
  
    formulario.find('input[type=text], textarea, select').not('#coleta').val('');
  
    document.getElementById("composto").value = "Selecione";
    document.getElementById("tipoCorpoDeProva").value = "Selecione";
    document.getElementById("distancia").value = 20;
  }
  
  
function abrir_coleta_existente(event) {
  event.preventDefault();
  var coleta = document.getElementById('coleta').value;

  fetch('/buscar_coleta?coleta=' + coleta)
    .then(response => response.json())
    .then(data => {
        document.getElementById('composto').value = data.composto;
        document.getElementById('distancia').value = data.distancia;
        document.getElementById('minimoAlongamento').value = data.minimoAlongamento;
        document.getElementById('minimoRuptura').value = data.minimoRuptura;
        especificados();
        document.getElementById('espessura1').value = data.espessura1;
        document.getElementById('espessura2').value = data.espessura2;
        document.getElementById('largura1').value = data.largura1;
        document.getElementById('largura2').value = data.largura2;
        document.getElementById('area1').value = data.area1;
        document.getElementById('area2').value = data.area2;
        document.getElementById('alongamento1').value = data.alongamento1;
        document.getElementById('alongamento2').value = data.alongamento2;
        document.getElementById('ruptura1').value = data.ruptura1;
        document.getElementById('ruptura2').value = data.ruptura2;
        calcularMedia(event);
        calcularAlongamento(event);
        calcularRupturaArea(event);
        calcularMediana(event);
        verificarValores(event);
        copiarDimensoes(event);
        calcularMediaAposEnvelhec(event);
        document.getElementById('espessura1_2').value = data.espessura1_2;
        document.getElementById('espessura2_2').value = data.espessura2_2;
        document.getElementById('largura1_2').value = data.largura1_2;
        document.getElementById('largura2_2').value = data.largura2_2;
        document.getElementById('area1_2').value = data.area1_2;
        document.getElementById('area2_2').value = data.area2_2;
        document.getElementById('alongamento1_2').value = data.alongamento1_2;
        document.getElementById('alongamento2_2').value = data.alongamento2_2;
        document.getElementById('ruptura1_2').value = data.ruptura1_2;
        document.getElementById('ruptura2_2').value = data.ruptura2_2;
        calcularAlongamentoAposEnvelhec(event);
        calcularRupturaAreaAposEnvelhec(event);
        calcularMedianaAposEnvelhec(event);
        calcularVariacao(event);
        verificarValoresAposEnvelhec(event);
        document.getElementById('tipoCorpoDeProva').value = data.tipoCorpoDeProva;

        // Exibir mensagem de sucesso
        var messageBox = document.getElementById('message-box');
        messageBox.innerHTML = 'Coleta aberta com sucesso!';
        messageBox.style.display = 'block';

    })
    .catch(error => {
        console.log(error);
    });

}

function salvarDadosFormulario() {
  // Obtém o formulário atual
  var formulario = $('form');

  // Obtém os dados do formulário
  var formData = formulario.serialize();

  // Envia os dados do formulário para o servidor via AJAX
  $.ajax({
    url: '/salvar_informacoes',
    type: 'POST',
    data: formData,
    success: function(response) {
      // Exibe a mensagem de sucesso ou realiza outras ações necessárias
      alert('Dados salvos com sucesso!');
    },
    error: function(xhr, status, error) {
      // Exibe a mensagem de erro ou realiza outras ações necessárias
      alert('Erro ao salvar os dados: ' + error);
    }
  });
}

function exportExcel(event) {
  event.preventDefault();
  var numero_coleta = document.getElementById('coleta').value;
  
  $.ajax({
    type: "POST",
    url: "/exportar_para_excel",
    data: { coleta: numero_coleta },
    success: function (response) {
      console.log("Relatório exportado com sucesso!");
    },
    error: function (error) {
      console.error("Erro ao exportar o relatório:", error);

    },
  });
}






