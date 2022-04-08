class Cliente{
    constructor(nome, cognome, citta){
        this.nome = nome;
        this.cognome = cognome;
        this.citta = citta;
    }
    getNomeCompleto(){
        return this.nome + " " + this.cognome;
    }
}

class RigaLibro {
    constructor(descrizione, importo, data, iva, cliente, tipoTransazione, key){
        let d = new Date();
        let id = d.getTime();
        if (typeof key == 'undefined')
            this.id = id;
        else
            this.id = key;
        this.descrizione = descrizione;
        this.importo = importo;
        this.data = data;
        this.iva = iva;
        this.cliente = cliente;
        this.tipoTransazione = tipoTransazione;
    }
}

class LibroContabile{
    constructor(){
        this.righe = new Map();
    }
    addOrUpdateRow(riga){ 
        this.righe.set(parseInt(riga.id),riga); 
    }
    removeRiga(id){
        this.righe.delete(parseInt(id)); 
    }
    getRiga(id){
        return this.righe.get(parseInt(id));
    }
    getBook(type){
        let toReturn = new Array();
        switch(parseInt(type)){
            case 0:
                this.righe.forEach(elem => {
                    if(elem.tipoTransazione == 'in')
                        toReturn.push(elem);
                })
            break;
            case 1:
                this.righe.forEach(elem => {
                    if(elem.tipoTransazione == 'out')
                        toReturn.push(elem);
                })
            break;
            default:
                toReturn = this.righe;
        }
        return toReturn;
    }
    getRigheByCliente(clienteNome){
        let toReturn = new Array();
        this.righe.forEach( elem =>{
            if( ((elem.cliente.getNomeCompleto()).toLowerCase()).includes(clienteNome.toLowerCase().trim())){
                toReturn.push(elem);
            }
        }) 
        return toReturn;
    }
    getGuadagnoGiorno(){
        let guadagno = 0;
        let data = new Date();
        let gg = data.getDate();
        let mm = data.getMonth() + 1;
        if(data.getDate() < 10){
            gg = "0" + data.getDate(); 
        }
        if(mm < 10){
            mm = "0"+ mm;
        }
        let dataStr = data.getFullYear() + "-" + mm + "-" + gg; //2022-03-25

        console.log(dataStr);
        this.righe.forEach( elem =>{
            if(elem.data == dataStr){
                if(elem.tipoTransazione == "in"){
                    guadagno += parseFloat(elem.importo);
                }
                else{
                    guadagno -= parseFloat(elem.importo);
                }
            }
        })
        return guadagno;
    }
}



