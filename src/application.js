import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_URL = 'pixabay.com/api/';
const API_KEY = '37658196-3d9d2c437cbd70881c58a1843';
const divGallery = document.querySelector(".gallery");
export const btnLoad = document.querySelector("#load");
export let totalHits;
let lightbox;

export async function fetchImg(queryImg, page, per_page, totalRender) {
        axios({
            method:'GET',
            url:`https://${API_URL}?key=${API_KEY}&q=${queryImg}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`,
            responseType: 'stream',
        }).then(
            async function (response) {
                const petitionResult = JSON.parse(response.data)
                totalHits = await petitionResult.totalHits;
                const render = await petitionResult.hits;
                if (totalHits === 0) {
                    divGallery.innerHTML = ``;
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                } else if (totalHits <= totalRender) {
                    // btnLoad.classList.add('load-more');
                    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                } else {
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    for (let value of render) {
                        let webformatURL = value.webformatURL;
                        let largeImageURL = value.largeImageURL;
                        let tags = value.tags;
                        let likes = value.likes;
                        let views = value.views;
                        let comments = value.comments;
                        let downloads = value.downloads;
            
                        divGallery.innerHTML += `
                        <div class="photo-card">
                            <a class="gallery__link" href="${largeImageURL}">
                                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                            </a>
            
                            <div class="info"> 
                                <p class="info-item"><b>Likes: ${likes}</b></p>
                                <p class="info-item"><b>Views: ${views}</b></p>
                                <p class="info-item"><b>Comments: ${comments}</b></p>
                                <p class="info-item"><b>Downloads: ${downloads}</b></p>
                            </div>
                        </div>`;
                        lightbox = new SimpleLightbox('.photo-card a', {
                            captionsData: "alt",
                            captionDelay: 250,
                        });
                    }
                    // btnLoad.classList.remove('load-more');
                }
            }
        )
    return { totalRender, totalHits};
}
export { lightbox };


// fetch(`https://${API_URL}?key=${API_KEY}&q=${queryImg}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`);
    // const petitionResult = await petitionResponse.json();
    // totalHits = await petitionResult.totalHits;
    // const render = await petitionResult.hits;
    // if (totalHits === 0) {
    //     divGallery.innerHTML = ``;
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    // } else if (totalRender >= totalHits) {
    //     btnLoad.classList.add('load-more');
    //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    // } else {
    //     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    //     for (let value of render) {
    //         let webformatURL = value.webformatURL;
    //         let largeImageURL = value.largeImageURL;
    //         let tags = value.tags;
    //         let likes = value.likes;
    //         let views = value.views;
    //         let comments = value.comments;
    //         let downloads = value.downloads;

    //         divGallery.innerHTML += `
    //         <div class="photo-card">
    //             <a class="gallery__link" href="${largeImageURL}">
    //                 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    //             </a>

    //             <div class="info"> 
    //                 <p class="info-item"><b>Likes: ${likes}</b></p>
    //                 <p class="info-item"><b>Views: ${views}</b></p>
    //                 <p class="info-item"><b>Comments: ${comments}</b></p>
    //                 <p class="info-item"><b>Downloads: ${downloads}</b></p>
    //             </div>
    //         </div>`;
    //         lightbox = new SimpleLightbox('.photo-card a', {
    //             captionsData: "alt",
    //             captionDelay: 250,
    //         });
    //     }
    //     btnLoad.classList.remove('load-more');
    // }