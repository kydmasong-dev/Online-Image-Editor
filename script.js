const fileInput = document.querySelector(".file-input"),
    editOptions = document.querySelectorAll(".editOptions button"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    cropOptions = document.querySelectorAll(".crop button"),
    cropName = document.querySelector(".crop-info .name"),
    cropValue = document.querySelector(".crop-info .value"),
    // cropSlider = document.querySelector("#cropSlider1 input"),

    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img"),
    saveImgBtn = document.querySelector(".save-img");

let image,
    styles = null;
let rect2;

document.getElementById("filterBox").style.display = "block";
document.getElementById("cropItems").style.display = "none";
document.getElementById("rotateBox").style.display = "none";

let brightness = "100",
    saturation = "100",
    inversion = "0",
    grayscale = "0";
let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;
let one = (two = three = four = "100");
let resetFlag = true;

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        // document.querySelector(".crop").style.display = "block"
        if (resetFlag) resetFilterBtn.click();
        resetFlag = true;
        document.querySelector(".container").classList.remove("disable");
    });
    image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
        // Resize canvas to fit the image
    };
};

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    previewImg.style.width = one.value;
    styles = previewImg.style;
};

editOptions.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector(".selected").classList.remove("selected");
        option.classList.add("selected");
        cropBox.style.display = "none";

        // filterName.innerText = option.innerText;
        document.querySelector(".active")?.classList.remove("active");

        if (option.id === "filter") {
            document.getElementById("filterBox").style.display = "block";
            document.getElementById("cropItems").style.display = "none";
            document.getElementById("rotateBox").style.display = "none";

            document.getElementById("brightness").classList = "active";
        } else if (option.id === "crop") {
            document.getElementById("filterBox").style.display = "none";
            document.getElementById("cropItems").style.display = "block";
            document.getElementById("rotateBox").style.display = "none";
            // document.getElementById("one").classList = "active";
            enableCropping();
        } else {
            document.getElementById("filterBox").style.display = "none";
            document.getElementById("cropItems").style.display = "none";
            document.getElementById("rotateBox").style.display = "block";
        }
    });
});

filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

// cropOptions.forEach(option => {
//     option.addEventListener("click", () => {
//         document.querySelector(".active").classList.remove("active");
//         option.classList.add("active");
//         // cropSlider2.style.display = "none";

//         cropName.innerText = option.innerText != "Free" ? "Aspect Ratio " + option.innerText : "Width";

//         if (option.id === "one") {
//             // cropSlider.max = "200";
//             // cropSlider.value = one;
//             cropValue.innerText = `${one}%`;
//         } else if (option.id === "two") {
//             // cropSlider.max = "200";
//             // cropSlider.value = two;
//             cropValue.innerText = `${two}%`
//         } else if (option.id === "three") {
//             // cropSlider.max = "100";
//             // cropSlider.value = three;
//             cropValue.innerText = `${three}%`;
//         } else {
//             // cropSlider.max = "100";
//             // cropSlider.value = four;
//             cropValue.innerText = `${four}%`;
//             // cropSlider2.style.display = "block";

//         }
//     });
// });

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
};

const updateCrop = () => {
    cropValue.innerText = `${cropSlider.value}%`;
    const selectedCrop = document.querySelector(".crop .active");

    if (selectedCrop.id === "one") {
        one = cropSlider.value;
    } else if (selectedCrop.id === "two") {
        two = cropSlider.value;
    } else if (selectedCrop.id === "three") {
        three = cropSlider.value;
    } else {
        four = cropSlider.value;
    }
    applyFilter();
};

rotateOptions.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = "100";
    saturation = "100";
    inversion = "0";
    grayscale = "0";
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
};

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(
        previewImg,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
};
// cropSlider.addEventListener("input", updateCrop);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

// crop image functionality
const imageInput = document.getElementById("imageInput");
const canvasContainer = document.getElementById("canvasContainer");
const cropBox = document.getElementById("cropBox");
cropBox.style.display = "none";
const cropCanvas = document.getElementById("cropCanvas");

let resizing = false;
let currentHandle;

function enableCropping() {
    rect2 = cropCanvas.getBoundingClientRect();
    cropBox.style.display = "block";
    cropBox.style.width = rect2.width / 2 + "px";
    cropBox.style.height = rect2.height / 2 + "px";
    updateResizeHandles();
}

function updateResizeHandles() {
    const handles = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

    handles.forEach((handle) => {
        const handleElement = document.getElementById(handle + "Handle");
        handleElement.addEventListener("mousedown", function (event) {
            startResize(event, handle);
        });
    });
}

function startResize(event, handle) {
    console.log("start");
    resizing = true;
    currentHandle = handle;

    const rect = cropBox.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    document.addEventListener("mousemove", function (event) {
        handleResize(event, offsetX, offsetY);
    });

    document.addEventListener("mouseup", function () {
        endResize();
    });
}

function handleResize(event, offsetX, offsetY) {
    if (resizing) {
        console.log(currentHandle);

        const rect = canvasContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(x, y, offsetX, offsetY);
        switch (currentHandle) {
            case "topLeft":
                resizeTopLeft(x, y, offsetX, offsetY);
                break;
            case "topRight":
                resizeTopRight(x, y, offsetX, offsetY);
                break;
            case "bottomLeft":
                resizeBottomLeft(x, y, offsetX, offsetY);
                break;
            case "bottomRight":
                resizeBottomRight(x, y, offsetX, offsetY);
                break;
        }
    }
}

function endResize() {
    resizing = false;
    currentHandle = null;
}

function resizeTopLeft(x, y, offsetX, offsetY) {
    console.log("topleft");
    const newWidth = parseInt(cropBox.style.width) + (cropBox.offsetLeft - x);
    const newHeight = parseInt(cropBox.style.height) + (cropBox.offsetTop - y);

    cropBox.style.width = `${newWidth}px`;
    cropBox.style.height = `${newHeight}px`;
    cropBox.style.left = `${x}px`;
    cropBox.style.top = `${y}px`;
}

function resizeTopRight(x, y, offsetX, offsetY) {
    const newWidth = x - cropBox.offsetLeft; //
    const newHeight = parseInt(cropBox.style.height) + (cropBox.offsetTop - y);
    console.log(newHeight, newWidth);
    cropBox.style.width = `${newWidth}px`;
    cropBox.style.height = `${newHeight}px`;
    cropBox.style.right = `${x}px`;
    cropBox.style.top = `${y}px`;
}

function resizeBottomLeft(x, y, offsetX, offsetY) {
    const newWidth = parseInt(cropBox.style.width) + (cropBox.offsetLeft - x);
    const newHeight = y - cropBox.offsetTop; //+ offsetY;

    cropBox.style.width = `${newWidth}px`;
    cropBox.style.height = `${newHeight}px`;
    cropBox.style.left = `${x}px`;
}

function resizeBottomRight(x, y, offsetX, offsetY) {
    const newWidth = x - cropBox.offsetLeft; //+ offsetX;
    const newHeight = y - cropBox.offsetTop; // + offsetY;

    cropBox.style.width = `${newWidth}px`;
    cropBox.style.height = `${newHeight}px`;
}

function cropImage() {
    image.onload();
    const rect = cropBox.getBoundingClientRect();
    rect2 = cropCanvas.getBoundingClientRect();
    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    // Set the new canvas size to the crop box dimensions
    croppedCanvas.width = (rect.width * image.width) / rect2.width;
    croppedCanvas.height = (rect.height * image.height) / rect2.height;
    //  console.log(rect, rect2, image.height)
    //  Draw the cropped region onto the new canvas
    croppedCtx.drawImage(
        image, // Source image (the original image)
        0, // Source rectangle's left coordinate
        0, // Source rectangle's top coordinate
        image.width, // Source rectangle's width
        image.height, // Source rectangle's height
        ((rect2.left - rect.left) * image.width) / rect2.width, // Destination canvas's left coordinate
        ((rect2.top - rect.top) * image.height) / rect2.height, // Destination canvas's top coordinate
        image.width, // Destination canvas's width
        image.height // Destination canvas's height
    );

    previewImg.src = croppedCanvas.toDataURL();
    resetFlag = false;
    console.log(previewImg.style);
    image.src = croppedCanvas.toDataURL();
}

function updateFilters() {}
