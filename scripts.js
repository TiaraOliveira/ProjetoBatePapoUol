let conversas = [];

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
        ulConversas.innerHTML += `
        ${conversas[i]}`
        
    }

}