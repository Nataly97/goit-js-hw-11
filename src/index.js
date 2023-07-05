import { fetchImg, lightbox, totalHits } from "./application";

const form = document.querySelector(".search-form");

let arrayBusqueda;
let inputText;
let page = 1;
let per_page = 40;
let totalRender = 0;

form.addEventListener('submit', (event) => {
    totalRender = per_page;
    event.preventDefault();
    document.querySelector(".gallery").innerHTML = ``;
    const search = document.querySelector(".search-form input").value;
    arrayBusqueda = search.split(" ");
    inputText = arrayBusqueda.join("+");
    page = 1;
    fetchImg(inputText, page, per_page, totalRender);
});

// Función para cargar más imágenes
const loadMoreImages = () => {
    page++;
    totalRender += per_page
    fetchImg(inputText, page, per_page, totalRender);
};

// Función para verificar si se llegó al final de la página
const isAtBottomOfPage = () => {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
};

// Evento de desplazamiento de la página
window.addEventListener('scroll', (e) => {
    lightbox.refresh();
    if (isAtBottomOfPage()) {
        loadMoreImages();
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
        console.log(totalHits)
    } else if(totalRender >= totalHits){
        e.stopImmediatePropagation();
    }
});


// btnLoad.addEventListener('click', (e) => {
//     e.preventDefault();
//     page += 1;
//     btnLoad.classList.add('load-more');
//     fetchImg(inputText, page, per_page);
//     lightbox.refresh();
//     btnLoad.classList.remove('load-more');
//     const { height: cardHeight } = document
//         .querySelector(".gallery")
//         .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//     });
// })
