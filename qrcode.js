let text = document.querySelector("#text")
let submit = document.querySelector("#submit")
let img = document.querySelector("#img")
let copy = document.querySelector("#copy")

let fileinput = document.querySelector(".file")
let img2 = document.querySelector("#img2")
let p = document.querySelector(".p")
let closes = document.querySelector(".close")

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

async function fetchRequest(formData, file){
    let response = await fetch ("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    })
    let dat = await response.json()
    let result = dat[0].symbol[0].data
    p.innerText = result
    img2.src = URL.createObjectURL(file)
} 

fileinput.addEventListener("change", e => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append("file", file)
    fetchRequest(formData, file)
    img2.src=""
})

closes.addEventListener("click",()=>{
    img2.src = ""
    p.innerText = ""
    fileinput.value = ""
})