const content = document.querySelector('.content');
const btnCreate = document.querySelector('#form-accompte');
const btnDepot = document.querySelector('#form-depot');
const btnClose = document.querySelector('#close');
// Tableau pour stocker les comptes bancaires
const tableau = [];



// Fonction de création de résultat
function response(title, message, color) {
    document.querySelector('.result-response')?.remove();
    const result = document.createElement('div');
    result.classList.add('result-response', 'close');
    result.style.backgroundColor = color;
    result.innerHTML = `
             <h2>${title}</h2>
             <p>${message}</p>
             `;
    content.append(result);
}



// Classe pour créer des objet CompteBancaire
class CompteBancaire {
    constructor(nom, numero, solde = 0) {
        this.nom = nom;
        this.numero = numero;
        this.solde = solde;
    }

}

function deleteResponse() {
    document.querySelector('.result-response')?.remove();
}



// création de compte
btnCreate.addEventListener('click', () => {
    if (content.querySelector('.accompte')) return;
    document.querySelector('.depot')?.remove();
    deleteResponse();

    const accompte = document.createElement('div');
    accompte.classList.add('accompte', 'form', 'close');
    accompte.innerHTML = `
            <h2>Créer un compte</h2>
            <form>
                <input class="nom" type="text" placeholder="Entrez votre nom" required>
                <input class="numero" type="text" placeholder="Numéro du compte" required>
            </form>
            <button class="btn-creation-compte">Créer un compte</button>
   `;
    content.append(accompte);

    const btnCreationCompte = document.querySelector('.btn-creation-compte');
    btnCreationCompte.addEventListener('click', () => {
        const inputNom = document.querySelector('.nom');
        const inputNumero = document.querySelector('.numero');
        let nom = inputNom.value;
        let numero = inputNumero.value;
        const compte = new CompteBancaire(nom, numero);
        const exist = tableau.find(CompteBancaire => CompteBancaire.nom === nom || CompteBancaire.numero === numero);

        if (!exist && nom !== '' && numero !== '' && !isNaN(numero) && isNaN(nom)) {
            tableau.push(compte);
            response('Success', `Votre compte a bien été créé au nom de : ${compte.nom} avec le numéro ${compte.numero}`, 'green');
        } else if (isNaN(numero)) {
            response('Erreur', 'veuillez entrer un nombre', 'red');
        }
        else if (!isNaN(nom)) {
            response('Erreur', 'veuillez entrer un nom et pas un nombre', 'red');
        }
        else if (nom == '' || numero == '') {
            response('Erreur', 'Veuillez renseigner tous les champs', 'red');
        }
        else if (exist) {
            response('Erreur', 'Les identifiants rentrés sont déjà utilisés pour un autre compte', 'red');
        }
        console.log(tableau);
    });
});




// faire un dépot


btnDepot.addEventListener('click', () => {
    if (content.querySelector('.depot')) return;
    document.querySelector('.accompte')?.remove();
    deleteResponse();

    const depot = document.createElement('div');
    depot.classList.add('depot', 'form', 'close');
    depot.innerHTML = `
            <h2>Faire un dépot</h2>
            <form>
                <input class="nom" type="text" placeholder="Entrez votre nom" required>
                <input class="numero" type="text" placeholder="Numéro du compte" required>
                <input id="montant" type="text" placeholder="Entrez un montant" required>
            </form>
            <button class="btn-confirm">Confirmer</button>          
   `;
    content.append(depot);
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', () => {
        const inputNom = document.querySelector('.nom');
        const inputNumero = document.querySelector('.numero');
        let inputMontant = document.querySelector('#montant');
        let nom = inputNom.value;
        let numero = inputNumero.value;
        let montant = inputMontant.value;
        const exist = tableau.find(CompteBancaire => CompteBancaire.nom === nom && CompteBancaire.numero === numero);

        if (exist && montant > 0) {
            exist.solde = Number(exist.solde) + Number(montant);
            response('Success', `Votre transaction est acceptée pour le compte : ${nom} avec le numéro ${numero}`, 'green');
        } else if (isNaN(montant) || montant <= 0) {
            response('Erreur', 'veuillez entrer un nombre(positif)', 'red');
        }
        else {
            response('Erreur', `Vous n'avez pas les bons identifiants`, 'red');
        }
        console.log(tableau);
    });

});





btnClose.addEventListener('click', () => {
    const forms = document.querySelectorAll('.close');
    forms.forEach(form => form.remove());
});


