function entrar() {

    var emailVar = in_email.value;
    var senhaVar = in_senha.value;

    if (emailVar == "" || senhaVar == "") {
        mostrarModal("PREENCHA TODOS OS CAMPOS!");
                setTimeout(fecharModal,5000)
        return false;
    }
    else {
        
    

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_EMPRESA = json.idEmpresa;

                alerta_erro.style.display = 'flex'

                setTimeout(function () {
                    window.location = "dashboard-geral.html";
                }, 2000); // apenas para exibir o loading

            });

        } else {

            

            resposta.text().then(texto => {
                console.error(texto);
                mostrarModal(texto);
                setTimeout(fecharModal,5000)
            });
        }

    }).catch(function (erro) {
        mostrarModal("Houve um erro ao tentar realizar o login!");
        setTimeout(fecharModal,5000)
        console.log(erro);
    })

    return false;
}
}



