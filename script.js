
let utente1 = new Cliente("Marco","Verdi","Milano");
let utente2 = new Cliente("Franco","Volo","Roma");
let utente3 = new Cliente("Paola","Calcagno","Catania");
let utente4 = new Cliente("Lorenzo","Rossi","Torino");

let arrayClienti = [utente1,utente2,utente3,utente4];
libroContabile = new LibroContabile();

addRiga = function(){

    let indice = document.getElementById("listaUtenti").value;
    let cliente = arrayClienti[indice];

    let descrizione = document.getElementById("descrizione").value;
    let data = document.getElementById("data").value;
    let importo = document.getElementById("importo").value;
    let iva = document.getElementById("iva").value;
    let tipoOperazione = document.getElementById("tipoOperazione").value;


    let riga = new RigaLibro(descrizione, importo, data, iva, cliente, tipoOperazione);
    libroContabile.addOrUpdateRow(riga);
    disegnoTabella(libroContabile.getBook(-1));  
    return false;
}
function cercaCliente(){
    let cliente = document.getElementById("cercaCliente").value;
    disegnoTabella(libroContabile.getRigheByCliente(cliente));
}
function disegnoTabella(listaElementi){
    let str = "";
    listaElementi.forEach(element => {
        str += "<tr>";
        str += "<td>" + element.cliente.getNomeCompleto()+ "</td>";
        str += "<td>" + element.data + "</td>";
        str += "<td>" + element.descrizione+ "</td>";
        str += "<td>" + element.importo+ "</td>";
        str += "<td>" + element.iva+ "</td>";
        str += "<td>" + element.tipoTransazione+ "</td>";
        str += "<td>" + createButton(element.id)+ "</td>"; 
        str += "</tr>";
    });
    document.getElementById("libro").innerHTML = str;
}
function guadagnoGiornaliero(){
    let guadagno = libroContabile.getGuadagnoGiorno();
    
    console.log(guadagno);
    let colorGuad = "red";
    if(guadagno > 0)
        colorGuad = "green";
    document.getElementById("guadagno").style.color = colorGuad;
    document.getElementById("guadagno").innerHTML = guadagno;

}
/**
 * elimino la riga in base all'id
 */
function cancella(id){
    libroContabile.removeRiga(id);
    disegnoTabella(libroContabile.getBook(-1));
}
/**
 * modifico una riga del libro contabile
 * @param {*} id  
 * @returns 
 */
function modifica(id){
    let elementDaModifica = libroContabile.getRiga(id); // seleziono l'elemento in base all'id
    document.getElementById("key").value = elementDaModifica.id;
    document.getElementById("dataModifica").value = elementDaModifica.data;
    document.getElementById("descrizioneModifica").value = elementDaModifica.descrizione;
    document.getElementById("importoModifica").value = elementDaModifica.importo;
    document.getElementById("ivaModifica").value = elementDaModifica.iva;
    document.getElementById("tipoOperazioneModifica").value = elementDaModifica.tipoTransazione;
    populateUserSelect("listaUtentiModifica",elementDaModifica.cliente);
}
function salvaModifica(){ 
    let key = document.getElementById("key").value;
    let indice = document.getElementById("listaUtentiModifica").value;
    let cliente = arrayClienti[indice];
    let descrizione = document.getElementById("descrizioneModifica").value;
    let data = document.getElementById("dataModifica").value;
    let importo = document.getElementById("importoModifica").value;
    let iva = document.getElementById("ivaModifica").value;
    let tipoOperazione = document.getElementById("tipoOperazioneModifica").value;

    let riga = new RigaLibro(descrizione, importo, data, iva, cliente, tipoOperazione, key);
    libroContabile.addOrUpdateRow(riga);
    disegnoTabella(libroContabile.getBook(-1));  
    
    return false;
    
}
/**
 * inserisco i bottoni nella tabella
 * @param {} id 
 * @returns 
 */
function createButton(id){
    let str = "";
    str += "<button class='btn btn-warning mx-1' title='Modifica' data-bs-toggle=\"modal\" data-bs-target=\"#modificaModal\" onclick=\"modifica('" + id + "')\" > <i class='bi bi-pencil'></i> </button>";
    str += "<button class='btn btn-danger mx-1' title='Rimuovi' onclick=\"cancella('" + id + "')\" > <i class='bi bi-trash'></i> </button>"; 
    return str;
}
/**
 * popolamento della lista dei clienti
 * @param {*} idHTML 
 * @param {*} utente 
 */
function populateUserSelect(idHTML,utente){ 
    let str = "";
    for(let i = 0; i < arrayClienti.length; i++){
        str += "<option value='"+i+ "'";
        if(typeof utente != 'undefined' && arrayClienti[i].getNomeCompleto() == utente.getNomeCompleto()){
            str += " selected";
        }
        str += ">" + arrayClienti[i].getNomeCompleto() + "</option>";  
    }
    document.getElementById(idHTML).innerHTML = str;
}
/**
 * seleziono libro intero, ingresso e uscite
 */
function cambioVisualizzazione(element){ 
    disegnoTabella(libroContabile.getBook(element.value));
} 
window.addEventListener("load", function(){
    populateUserSelect("listaUtenti");
})