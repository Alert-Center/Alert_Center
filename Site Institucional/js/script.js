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

// Função para validar pseudo-login e criar alert para falar que a conta ainda não foi cadastrada 
function entrar() {
    var email = in_email.value
    var senha = in_senha.value
    
    if (email == "admin@sptech.school" && senha == "@Sptech2022") {
        windown.location.href="dashboard-geral.html"
    } else {
        alert(`Conta ainda não cadastrada!`)
    }
}

// Função para avançar uma etapa do formulario
function avancarEtapa() {
    // Código para mudar cor das bolinhas aonde aparece o progresso do formulário
    linha.style.background = "blue";
    circle_2.style.background = "blue";
    circle_2.style.color = "white";

    // Função para exibir a outra parte do formulário com os botões do para criar a simulação e voltar a etapa anterior 
    form_2.style.display = "block";
    form_1.style.display = "none";
    form_1.style.color = "";
    btns.innerHTML = `
  <button  class="btn" onclick="criarSimulacao()">  Fazer Simulação</button>
  <button class="btn" onclick="diminuirEtapa()">Voltar ao anterior</button>`;
}


// Função para voltar uma etapa do formulário 
function diminuirEtapa() {

    // Código para mudar cor das bolinhas aonde aparece o progresso do formulário
    circle_2.style.background = "white";
    circle_1.style.background = "blue";
    linha.style.background = "white";
    circle_2.style.color = "black";

    // Função para exibir a outra parte inicial do formulário sem o botão de voltar 
    form_1.style.display = "block";
    form_2.style.display = "none";
    btns.innerHTML = `<button class="btn" onclick="avancarEtapa()">Avançar Etapa</button>`;
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