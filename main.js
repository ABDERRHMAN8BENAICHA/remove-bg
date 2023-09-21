let mineScren = document.querySelector(".mine-scren");
let mineStart = document.querySelector(".mine-start");
let mineLoader = document.querySelector(".mine-loader");
let mineResolt = document.querySelector(".mine-resolt");
let UploadInput = document.getElementById("Upload");
let before = document.getElementById("before");
let after = document.getElementById("after");
let btnStart = document.getElementById("start");
let beforeSmall = document.getElementById("before-small");
let UploadAnother = document.getElementById("Upload-Another");
let DownloadHref = document.getElementById("DownloadHref");

const API_KAY = "aiJjS6chSZZoA9V5qhGZuGXq";
const API_URL = "https://api.remove.bg/v1.0/removebg";
const reader = new FileReader();
const formData = new FormData();
let file = null;

function shaowScren (scren) {
    mineScren.style.display = "none"
    mineLoader.style.display = "none"
    mineResolt.style.display = "none"
    mineStart.style.display = "none"
    scren.style.display = "flex";
}

shaowScren(mineScren)

UploadInput.addEventListener(("input"),()=> {
    file = UploadInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = ()=> {
        let urlFile = reader.result;
        before.src = urlFile
        beforeSmall.src  = urlFile;
    }
    shaowScren(mineStart);
})

btnStart.addEventListener(("click"),()=> {
    formData.append("image_file",file)
    shaowScren(mineLoader);
    getResponse();

})

function getResponse () {
    fetch(API_URL,{
        method: "POST",
        headers: {
            'X-Api-Key': API_KAY,
        },
        body : formData,
    }).then(res => res.blob()).then(blob => {
        reader.readAsDataURL(blob);
        reader.onloadend = ()=> {
            let urlFile = reader.result;
            after.src = urlFile;
            DownloadHref.setAttribute("href",urlFile);
            shaowScren(mineResolt)
        }
    })
}

UploadAnother.addEventListener(("click"),()=> {
    window.location.reload()
})

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};