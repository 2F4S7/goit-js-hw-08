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
}

function handleNewElements(images) {
  return images.map(createElements);
}

function handleRenderElements(newElements) {
  galleryRef.append(...newElements);
}

handleRenderElements(handleNewElements(gallery));

function handleModalOpen(event) {
  event.preventDefault();
  window.addElementListener("keydown", handlePressKey);

  const { target } = event;
  const { dataset } = target;

  if (target.nodeName != "IMG") {
    return;
  }

  const hrefImg = dataset.source;
  const indexCount = dataset.index;

  modalRef.classList.add("is-open");
  bigImgRef.src = hrefImg;
  bigImgRef.alt = target.alt;
  bigImgRef.setAttribute("data-index", indexCount);
}

function handleModalClose() {
  modalRef.classList.remove("is-open");
  bigImgRef.src = "";
  bigImgRef.alt = "";
  window.removeEventListener("keydown", handlePressKeys);
}

function handleBackdropCloseModal({ target, currentTarget }) {
  if (target === currentTarget) {
    handleModalClose();
  }
}

function handleChangeClick({ target }) {
  const { dataset } = target;
  const currentIndexImg = Number(dataset.index);

  if (currentIndexImg + 1 === gallery.length) {
    target.src = gallery[0].original;
    target.alt = gallery[0].description;
    dataset.index = 0;
    return;
  }

  target.src = gallery[currentIndexImg + 1].original;
  target.alt = gallery[currentIndexImg + 1].description;
  dataset.index = currentIndexImg + 1;
}

function handlePressKeys(event) {
  if (event.code === "Escape") {
    handleModalClose();
  }

  const { dataset } = bigImgRef;
  const index = Number(dataset.index);

  if (event.code === "ArrowRight") {
    if (index + 1 === gallery.length) {
      bigImgRef.src = gallery[0].original;
      bigImgRef.alt = gallery[0].description;
      dataset.index = 0;
      return;
    }
    bigImgRef.src = gallery[index + 1].original;
    bigImgRef.alt = gallery[index + 1].description;
    dataset.index = index + 1;
  }

  if (event.code === "ArrowLeft") {
    if (index - 1 < 0) {
      bigImgRef.src = gallery[8].original;
      bigImgRef.src = gallery[8].description;
      dataset.index = 8;
      return;
    }
    bigImgRef.src = gallery[index - 1].original;
    bigImgRef.alt = gallery[index - 1].description;
    dataset.index = index - 1;
  }
}
