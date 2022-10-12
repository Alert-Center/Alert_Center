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

    //Quantidade de racks para definir o custo de instalação
    var racks = Number(in_racks.value);

    //Quantidade de horas de downtime por mes e por ano
    var inatividadeAnual = Number(in_inatividade.value);
    var inatividadeMes = inatividadeAnual / 12;

    //A receita vem em um ano, então informar a receita em uma hora
    var receitaAnual = Number(in_receita.value);
    var receitaHora = ((receitaAnual / 12) / 30) / 24;

    // O custo do downtime também leva em conta os salários dos funcionários afetados
    var qtdFuncionario = Number(in_qtdFuncionario.value);
    var custoFuncionario = Number(in_custoFuncionario.value);
    var produtividade = qtdFuncionario * custoFuncionario;

    // O prejuizo é a soma da perda de Receita com a perda produtividade
    var prejuizoMes = (inatividadeMes * receitaHora) + (inatividadeMes * produtividade);
    var prejuizoAno = (inatividadeAnual * receitaHora) + (inatividadeAnual * produtividade);;

    //Custo da nossa solução
    var solucaoinstalacao = racks * 300; //300 reais por Rack (200 equipamento + 100 mão de obra)
    var solucaoMensal = 600; //Custo do software de 600 reais mensais
    var pacoteAnual = 600 * 12; //Custo do software em um ano
    var solucaoAnual = solucaoinstalacao + pacoteAnual; //Custo da solução em um ano; 

    //Economia do Cliente é o quanto ele perde pelo quanto nossa solução custa (ou seja, o quanto ele evita de gastar)
    var economiaMes1 = prejuizoMes - (solucaoMensal + solucaoinstalacao); //Primeiro mês há o custo da instalação
    var economiaMeses = prejuizoMes - solucaoMensal; //Demais meses
    var economiaAno = prejuizoAno - solucaoAnual; //Economia anual



    if (receitaAnual == "" || inatividadeAnual == "" || racks == "" || qtdFuncionario == "" || custoFuncionario == "") {
        alert("Preencha todos os campos!");
    } else {

        // Código para inserir a div com o resultado da conta do simulador
        container_simulador.innerHTML =
            `
        <div class="content-simulador">
            <div class="indicadores">
                <h2>Prejuizo</h2>
                <div class="indicador">
                    <div class="title">
                        <h2>Mensal</h2>
                        <img src="img/bx_trending-down.png">
                    </div>
                    <div class="number">R$${prejuizoMes.toFixed(2)}</div>
                </div>
                <div class="indicador">
                    <div class="title">
                        <h2>Anual</h2>
                        <img src="img/carbon_idea.png">
                    </div>
                    <div class="number">R$${prejuizoAno.toFixed(2)}</div>
                </div>
            </div>

            <div class="indicadores">
                <h2>solucao</h2>
                <div class="indicador">
                    <div class="title">
                        <h2>Instalação</h2>
                        <img src="img/bx_trending-down.png">
                    </div>
                    <div class="number">R$${solucaoinstalacao.toFixed(2)}</div>
                </div>
                <div class="indicador">
                    <div class="title">
                        <h2>Pacote Anual</h2>
                        <img src="img/carbon_idea.png">
                    </div>
                    <div class="number">R$${pacoteAnual.toFixed(2)}</div>
                </div>
            </div>

            <div class="indicadores">
                <h2>economia</h2>
                <div class="indicador">
                    <div class="title">
                        <h2>1º mes</h2>
                        <img src="img/bx_trending-down.png">
                    </div>
                    <div class="number">R$${economiaMes1.toFixed(2)}</div>
                </div>
                <div class="indicador">
                    <div class="title">
                        <h2>demais meses</h2>
                        <img src="img/bx_trending-down.png">
                    </div>
                    <div class="number">R$${economiaMeses.toFixed(2)}</div>
                </div>
                <div class="indicador">
                    <div class="title">
                        <h2>Anual</h2>
                        <img src="img/carbon_idea.png">
                    </div>
                    <div class="number">R$${economiaAno.toFixed(2)}</div>
                </div>
            </div>
        </div>

    <button class="btn btn-refazer" onclick="refazerSimulacao()">Refazer Simulação</button>
    `;
    }
}

// Função para voltar a div ao seu estado inicial
function refazerSimulacao() {
    location.reload();
}