import { fetchImg, btnLoad, totalRender } from "./application";

const form = document.querySelector(".search-form");

let arrayBusqueda;
let inputText;
let page = 1;
let per_page = 40;

form.addEventListener('submit', (event) => {
    totalRender = 0;
    event.preventDefault();
    document.querySelector(".gallery").innerHTML = ``;
    const search = document.querySelector(".search-form input").value;
    arrayBusqueda = search.split(" ");
    inputText = arrayBusqueda.join("+");
    page = 1;
    fetchImg(inputText, page, per_page);
})

btnLoad.addEventListener('click', (e) => {
    e.preventDefault();
    page += 1;
    btnLoad.classList.add('load-more');
    fetchImg(inputText, page, per_page);
    // lightbox.refresh();
    btnLoad.classList.remove('load-more');
})