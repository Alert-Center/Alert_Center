// Função para fazer a validação do e-mail
function analisar_email() {
    var email = in_email.value

    var emailCorreto = email.indexOf('@' && '.') >= 0

    if (!emailCorreto) {
        msg_email.innerHTML = `Insira seu email neste formato: <strong style="color:red;">nome@exemplo.com!</strong>`
    } else {
        msg_email.innerHTML = ``
    }
}

// Função para fazer a validação do senha
function analisar_senha() {
    var senha = in_senha.value

    // A expressão utilizada abaixo, serve para validar a string, a qual deve conter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 9 caracteres e no máximo 20
    // A função ".match()" serve para pesquisar na string a expressão supracitada
    var senhaCaracteres = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,20}$/
    var senhaCorreta = senha.match(senhaCaracteres)

    if (!senhaCorreta) {
        msg_senha.innerHTML = `A senha deve conter mais de 8 caracteres, contendo <strong>números</strong>, <strong>caracteres especiais</strong>, <strong>letras maiúsculas</strong> e <strong>minúsculas</strong>.`
    } else {
        msg_senha.innerHTML = ``
    }
}

// Função provisória para limpar os campos do input
function entrar() {
    in_email.value = ``
    in_senha.value = ``
}



// Função para Criar Simulação de acordo com os valores que o usuario inseriu
function criarSimulacao() {
    // Código para inserir a div com o resultado da conta do simulador
    container.innerHTML = `<div class="content-simulador" >
  <div class="indicadores">
      <div class="indicador">
          <div class="title">
              <h2>Prejuizo</h2>
              <img src="../img/bx_trending-down.png">
          </div>
          <div class="number">R$ 1220</div>

      </div>
      <div class="indicador">
          <div class="title">
              <h2>Solução</h2>
              <img src="../img/carbon_idea.png">
          </div>
          <div class="number">R$200</div>
      </div>
      <div class="indicador">
          <div class="title">
              <h2>Economia</h2>
              <img src="../img/bx_trending-up.png">
          </div>
          <div class="number">R$ 3000</div>
      </div>
  </div>
  <div class="grafic">
      <canvas id="myChart"></canvas>
  </div>
  </div>
  <button class="btn" onclick="refazerSimulacao()">Refazer Simulação</button>`;

    //Código para funcionar o Chart.JS
    var div = document.getElementById("myChart");
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [{
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
        }, ],
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: 'y',
        },
    };
    const myChart = new Chart(div, config);
}


// Função para voltar a div ao seu estado inicial
function refazerSimulacao() {
    location.reload();
}

// Função para realizar o calculo das variáveis 
function calculoSimulador() {

    // Variaveis que vão ser usadas no calculo
    var faturamentoEmpresa = Number(in_faturamento.value);
    var tearDataCenter = Number(sel_tier.value);
    var tempoInatividadeDataCenter = Number(in_inatividade.value);
    var coreEmpresa = sel_core.value;
    var racksDataCenter = Number(in_racks.value);
}