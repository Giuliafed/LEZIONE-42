let imageSelector = document.querySelector ('#image-selection');
let textSelector = document.querySelector ('#text-selection');
let btnForward = document.querySelector ('#forward');
let btnBack = document.querySelector ('#back');
let topLine = document.querySelector ('#top-line')
let bottomLine = document.querySelector ('#bottom-line')
let dowloadButton = document.querySelector ('#download')

let canvas = document.querySelector ('canvas');
let ctx = canvas.getContext ('2d');

let topText = '';
let bottomText = '';
let canvasImage = ''

imageSelector.addEventListener ('click', (e) => {
    if (e.target.tagName === 'IMG') {
        selectImage(e.target)
    }
})

dowloadButton.addEventListener('click', downloadCanvas)

topLine.addEventListener('input',(e) => {
    console.log(e)
    updateText(e.target.value, e.target.id)
})
bottomLine.addEventListener('input',(e) => {
    console.log(e)
    updateText(e.target.value, e.target.id)
})

function selectImage(image) {
    canvasImage = image;
    redrawCanvas(canvasImage,topText,bottomText)
}

function updateText (text, id) {
  ctx.font = '30px Impact'
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textRendering = 'optimizeLegibility'
  ctx.lineWidth = 2
  if (id === 'top-line') {
    topText = text
  } else if (id === 'bottom-line') {
    bottomText = text
  }
  redrawCanvas(canvasImage, topText, bottomText)
}

const CANVAS_WIDTH = 500
const CANVAS_CENTER_X = CANVAS_WIDTH / 2
function redrawCanvas (image, topText, bottomText) {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  ctx.fillText(topText, CANVAS_CENTER_X, 50)
  ctx.strokeText(topText, CANVAS_CENTER_X, 50)
  ctx.fillText(bottomText, CANVAS_CENTER_X, 475)
  ctx.strokeText(bottomText, CANVAS_CENTER_X, 475)
}

function downloadCanvas() {
    let dataURL = canvas.toDataURL('img/jpeg');
    dowloadButton.href = dataURL
}

let fileInput = document.querySelector ('#file-upload');

fileInput.addEventListener('change', handleFileSelection);

function handleFileSelection (e){
    let file = e.target.files[0];

    let reader = new FileReader ();
    reader.readAsDataURL(file);

    reader.addEventListener('load', function(){
        let image = document.createElement('img');
        image.src = reader.result;
        image.addEventListener('load', function(){
            canvasImage = image;
            redrawCanvas(canvasImage,topText,bottomText)
        })
    })
}


btnForward.addEventListener('click', goForward);
btnBack.addEventListener('click', goBack);

function goForward(){
imageSelector.style.display = 'none'
textSelector.style.display = 'block'
} 
function goBack(){
imageSelector.style.display = 'block'
textSelector.style.display = 'none'
} 