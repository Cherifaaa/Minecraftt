// Variables globales
 // Compteur qui permet de connaître l'image sur laquelle on se trouve


for(let i =1; i<=5; i++){

    let compteur = {compteur: 0}; 
    const diapo = document.querySelector(".diapo_" + i);
    const elements = document.querySelector(".elements_" + i);

    

    // On clone la 1ère image
    let firstImage = elements.firstElementChild.cloneNode(true);

    // On injecte le clone à la fin du dipao
    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    // On récupère la largeur d'une slide
    slideWidth = diapo.getBoundingClientRect().width;

    // On récupère les flèches
    let next = document.querySelector(".nav-droite_"+i);
    let prev = document.querySelector(".nav-gauche_"+i);

    // On gère le clic
    next.addEventListener("click", () => slideNext(slides, compteur, elements));
    prev.addEventListener("click", () => slidePrev(slides, compteur, elements));

        // On automatise le défilement
        //timer = setInterval(slideNext, 5000);


}




function slideNext(slides, compteur, elements) {   // Cette fonction fait défiler le diapo vers la droite

    // On incrémente le compteur
    compteur.compteur++;
    elements.style.transition = "1s linear";

    let decal = -slideWidth * compteur.compteur;
    elements.style.transform = `translateX(${decal}px)`;

    // On attend la fin de la transition et on "rembobine" de façon cachée
    setTimeout(function () {
        if (compteur.compteur >= slides.length - 1) {
            compteur.compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, 1000);
}

function slidePrev(slides, compteur, elements) {   // Cette fonction fait défiler le diapo vers la gauche

    // On décrémente le compteur
    compteur.compteur--;
    elements.style.transition = "1s linear";

    if (compteur.compteur < 0) {
        compteur.compteur = slides.length - 1;
        let decal = -slideWidth * compteur.compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(() => slidePrev(slides, compteur, elements), 1);
    }

    let decal = -slideWidth * compteur.compteur;
    elements.style.transform = `translateX(${decal}px)`;

}

