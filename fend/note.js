
let arr= []
id=1
function addNote(){
    let Ntitle = document.getElementById("title").value
    let Ncontent = document.getElementById("content").value
    console.log(Ntitle)
    console.log(Ncontent)
    arr.push({
        "id":id,
        "title":Ntitle,
        "content":Ncontent
    })
    id=id+1
    console.log(arr)
    refresh()


}
function refresh() {
    let container = document.querySelector(".notes-container")
    container.innerHTML = "";
    arr.forEach(element => {
    let nwdiv = document.createElement("div")
    nwdiv.innerHTML= `<div class="note" id="${element.id}">
                <h3>${element.title}</h3>
                <p>${element.content}</p>
                <button onclick="delNote(this)" class="delete">Delete</button>
            </div>`;
    container.append(nwdiv)

    
});
}


function delNote(btn){
    let did=btn.parentElement.id
    console.log(did)
    arr = arr.filter(element => element.id != did);
    refresh()
}

