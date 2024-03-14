const catErrorImg = document.querySelector("#cat-error-img");
const inputCode = document.querySelector("#input-code");
const loadBtn = document.querySelector("#load-btn");
const lastCodes = document.querySelector("#last-codes");

const getCatImageByError = (errorCode) => {
  return "https://http.cat/" + errorCode + ".jpg";
};

const setCatImage = () => {
  const errorCode = inputCode.value;
  if (localStorage.getItem("catErrors") !== null) {
    const catErrors = JSON.parse(localStorage.getItem("catErrors"));
    if (catErrors.length < 5) {
      catErrors.unshift(errorCode);
    } else {
      catErrors.pop();
      catErrors.unshift(errorCode);
    }
    localStorage.setItem("catErrors", JSON.stringify(catErrors));
    renderLastCatsCodes(catErrors);
  } else {
    localStorage.setItem("catErrors", JSON.stringify([errorCode]));
    renderLastCatsCodes([errorCode]);
  }
  catErrorImg.src = getCatImageByError(errorCode);
};

const renderLastCatsCodes = (arr) => {
  lastCodes.textContent = "Последние 5 кодов ошибок, которые вы загружали: ";
  lastCodes.textContent += [...arr].join(", ");
};

loadBtn.addEventListener("click", () => {
  setCatImage();
});

inputCode.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    setCatImage();
  }
});

function main() {
  catErrorImg.src = getCatImageByError("404");
  if (localStorage.getItem("catErrors") !== null) {
    const catErrors = JSON.parse(localStorage.getItem("catErrors"));
    renderLastCatsCodes(catErrors);
  }
}

main();
