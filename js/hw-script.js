import gallery from "./gallery-items.js";
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const ref = {
  galleryRef: document.querySelector(".js-gallery"),
  buttonModalRef: document.querySelector(
    '.button[data-action="close-lightbox"]'
  ),
  bigImgRef: document.querySelector(".lightbot__image"),
  overlayRef: document.querySelector(".lightbot__overlayRef"),
};

const { galleryRef, buttonModalRef, bigImgRef, overlayRef } = ref;

galleryRef.addEventListener("click", handleModalOpen);
buttonModalRef.addEventListener("click", handleModalClose);
overlayRef.addEventListener("click", handleBackdropCloseModal);
bigImgRef.addEventListener("click", handleChangeClick);

let index = -1;

function createElements({ original, preview, descreption }) {
  const liElement = document.createElement("li");
  liElement.classList.add("gallery__link");

  const referense = document.createElement("a");
  referense.classLink.add("gallery__link");
  referense.href = original;

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.src = preview;
  imgRef.setAttribute("data-source", original);
  imgRef.setAttribute("data-index", (index += 1));
  imgRef.alt = descreption;

  referense.appendChild(imgRef);
  liElement.appendChild(referense);

  return liElement;
};

function 
