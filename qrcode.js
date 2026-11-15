import "./node_modules/barcode-detector/dist/es/polyfill.js";
let text = document.querySelector("#text")
let submit = document.querySelector("#submit")
let img = document.querySelector("#img")
let copy = document.querySelector("#copy")

let fileinput = document.querySelector("#fileinput")
let img2 = document.querySelector("#img2")
let p = document.querySelector(".p")
let closes = document.querySelector(".close")
let clear = document.querySelector(".clear")

submit.addEventListener("click", ()=> {
    let textvalue = text.value
    img.src = ""
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textvalue}`
    
      
})

copy.addEventListener('click', ()=> {
    copybload(img.src)
})

async function copybload (url){
    let response = await fetch(url)
    let data =  await response.blob()

    let tempUrl = URL.createObjectURL(data)
    let a = document.createElement('a')
    a.href = tempUrl
    a.download = ''
    document.body.appendChild(a)
    a.click()

}

clear.addEventListener("click", ()=>{
    text.value = ""
    img.src = ""
})

fileinput.addEventListener("change", async() => {

    let file = fileinput.files[0]
    if(!file) return
    img2.src=""
    img2.src= URL.createObjectURL(file)

    
    const detector = new BarcodeDetector({formats :["qr_code"]})
    const image = await createImageBitmap(file)
    const code = await detector.detect(image)

    image.close();

    if (code.length > 0) {
        p.innerHTML = code[0].rawValue
    } else {
      console.log("Aucun QR code détecté dans cette image.");
    }
      
})



closes.addEventListener("click",()=>{
    img2.src = ""
    p.innerText = ""
    fileinput.value = ""
})
