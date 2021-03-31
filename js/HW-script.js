import images from './gallery-items.js';
const ref = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  bigImgRef: document.querySelector('.lightbox__image'),
  button: document.querySelector('[data-action="close-lightbox"]'),
  index: document.querySelector('[data-action="index"]'),
};

let currentImage = 0;

const createMarkup = images.map((image, index) => {
  const { preview, original, description } = image;
  const listItemRef = document.createElement('li');
  const linkRef = document.createElement('a');
  const imgRef = document.createElement('img');

  listItemRef.classList.add('gallery__item');
  linkRef.classList.add('gallery__link');
  linkRef.href = original;

  imgRef.classList.add('gallery__image');
  imgRef.src = preview;
  imgRef.dataset.source = original;
  imgRef.alt = description;
  imgRef.dataset.index = index;

  listItemRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);
  return listItemRef;
});

ref.gallery.append(...createMarkup);

function onClickHandler(event) {
  event.preventDefault();
  const galleryItemRef = event.target;
  if (galleryItemRef.nodeName === 'IMG') {
    window.addEventListener('keydown', handlePressKeys);
    ref.lightbox.classList.add('is-open');
    ref.lightbox.querySelector('.lightbox__image').src =
      galleryItemRef.dataset.source;
    ref.lightbox.querySelector('.lightbox__image').alt = galleryItemRef.alt;
    currentImage = Number(galleryItemRef.dataset.index);
  }
}

function onCloseHandler() {
  window.removeEventListener('keydown', handlePressKeys);
  ref.lightbox.classList.remove('is-open');
  ref.bigImgRef.src = '';
  ref.bigImgRef.alt = '';
}

function handlePressKeys(event) {
  if (event.code === 'Escape') onCloseHandler();
  if (event.code === 'ArrowLeft') arrowRight();
  if (event.code === 'ArrowRight') arrowLeft();
}

function onBackDropHandler(event) {
  if (event.target !== ref.bigImgRef) {
    onCloseHandler();
  }
}

function arrowRight() {
  if (currentImage > 0) {
    currentImage -= 1;
    ref.bigImgRef.src = images[currentImage].original;
    ref.bigImgRef.alt = images[currentImage].description;
  }
}

function arrowLeft() {
  if (currentImage < images.length - 1) {
    currentImage += 1;
    ref.bigImgRef.src = images[currentImage].original;
    ref.bigImgRef.alt = images[currentImage].description;
  }
}

ref.gallery.addEventListener('click', onClickHandler);
ref.lightbox.addEventListener('click', onBackDropHandler);
ref.button.addEventListener('click', onCloseHandler);
