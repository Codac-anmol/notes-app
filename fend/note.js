
function refresh() {
    fetch("http://localhost:3005/note", {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("refresh called")
            ref(data)
        })

}

function addNote() {
    let Ntitle = document.getElementById("title").value
    let Ncontent = document.getElementById("content").value
    console.log(Ntitle)
    console.log(Ncontent)


    fetch("http://localhost:3005/note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": Ntitle,
            "content": Ncontent
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            refresh()
        })

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

}


function ref(arr) {
    let container = document.querySelector(".notes-container")
    container.innerHTML = "";
    arr.forEach(element => {
        let nwdiv = document.createElement("div")
        nwdiv.innerHTML = `<div class="note" id="${element.id}">
                <h3>${element.title}</h3>
                <p>${element.content}</p>
                <button onclick="delNote(this)" class="delete">Delete</button>
            </div>`;
        container.append(nwdiv)

    });
}


function delNote(btn) {
    let did = btn.parentElement.id
    console.log(did)
    fetch("http://localhost:3005/note", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id":did
        })
    })
    .then(res => res.json())
    .then(data => {
            console.log(data)
            refresh()
        })
}

