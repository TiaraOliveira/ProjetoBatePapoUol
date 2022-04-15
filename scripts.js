let conversas = [];
let nomeusuario;


function fechamento(){
    const telaentrada = document.querySelector(".container1")
    telaentrada.classList.add("fechar")
    load();
}


function load(){
    const telaloading = document.querySelector(".container3")
    telaloading.classList.remove("fechar")
    setTimeout(entrachat, 2000)
}

function entrachat(){
    const telaloading = document.querySelector(".container3")
    telaloading.classList.add("fechar")
    const telachat = document.querySelector(".container2")
    telachat.classList.remove("fechar")
    login()
}

function login(){
    nomeusuario = document.querySelector(".entrada").value
    console.log(nomeusuario)
    const novousuario = {
        name: nomeusuario
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", novousuario)
    promise.then(buscarmensagens)
    promise.catch(verificanome)
}






function verificanome(error){
    console.log(error.response)
    if (error.response.status === 400) {
      alert("Esse usuario ja existe!Digite outro nome");
      login();
    }
   
}


buscarmensagens();

function buscarmensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promise)
    promise.then(carregarconversas);
}

function carregarconversas(response){
    console.log(response)
    conversas = response.data;
    renderizarconversas();
}



function renderizarconversas(){
    const ulConversas = document.querySelector(".batepapo");
    ulConversas.innerHTML = "";

    for (let i = 0; i < conversas.length; i++) {
        if (conversas[i].type == "status"){
            ulConversas.innerHTML += 
            `<div class = "usuario status">
                <div class="hora">
                    (${conversas[i].time})
                </div>
                <div class="from">
                    ${conversas[i].from} 
                </div>
                <div class="texto">
                    ${conversas[i].text}
                </div>
            </div>`
            
        } else if(conversas[i].type == "message"){
        ulConversas.innerHTML += 
        `<div class = "usuario normal">
            <div class="hora">
                (${conversas[i].time})
            </div>
            <div class="from">
                ${conversas[i].from} 
            </div>
            
            <div class="destinatario">
                 para ${conversas[i].to}: 
            </div>
            <div class="texto">
                ${conversas[i].text}
            </div>
        </div>`
        
        }else if(conversas[i].type == "private_message"){
            ulConversas.innerHTML += 
            `<div class = "usuario reservado">
                <div class="hora">
                    (${conversas[i].time})
                </div>
                <div class="from">
                    ${conversas[i].from} 
                </div>
                
                <div class="destinatario">
                     para ${conversas[i].to}: 
                </div>
                <div class="texto">
                    ${conversas[i].text}
                </div>
            </div>`
         
            }
       
    }

    const ultimo = ulConversas.lastChild
    console.log(`ultimo :${ultimo}`)
    ultimo.scrollIntoView();
}


function entranasala(){

    const entra = {
        name: nomeusuario
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", entra)
    console.log(`promise entrada $`)
    promise.then(buscarmensagens)
}


function enviarmensagem(){

    const mensagem = document.querySelector(".chat").value;
    const novamensagem =  
    {
        from: nomeusuario,
        to: "Todos",
        text: mensagem,
        type: "message" // ou "private_message" para o bônus
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novamensagem)

    promise.then(buscarmensagens)
    promise.catch(erroenvio)
   
}

setInterval(buscarmensagens, 3000)
setInterval(manterconexao, 5000)

function erroenvio(){
    alert("usuario saiu da sala")
    window.location.reload()
}

function manterconexao(){
    const manterusuario = {
        name: nomeusuario
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", manterusuario)

}