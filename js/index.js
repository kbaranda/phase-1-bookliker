document.addEventListener("DOMContentLoaded", function () {
  getBooks()
  getUsers()
});

function getBooks(){
  fetch("http://localhost:3000/books")
  .then(resp => resp.json())
  .then(data => data.forEach(renderBooks))
}

function getUsers() {
  fetch("http://localhost:3000/users")
  .then(resp => resp.json())
}

function renderBooks(book) {
  const list = document.querySelector("#list")
  const li = document.createElement("li")
  li.id = `${book.id}Book`
  li.innerHTML = `${book.title}`
  list.appendChild(li)

  document.getElementById(`${book.id}Book`).addEventListener("click", () => {
    
    const showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML =`
    <img src = ${book.img_url}>
    <h2>${book.title}</h2>
    <h3>${book.subtitle}</h3>
    <p>${book.description}</p>
    <button id = ${book.id}Button>Like <3</button>
    <ul id = "liked-by"><ul>
    `
    let likedBy = book.users

    likedBy.forEach((person) => {
      let likedByUser = document.createElement("li")
      likedByUser.innerText = person.username
      document.querySelector("#liked-by").appendChild(likedByUser)
    })
    
    document.getElementById(`${book.id}Button`).addEventListener("click", () => {  
      let myInfo = {id: 1, username: "pouros"}
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          Accept : "application/json"
        },
        body: JSON.stringify({
          users: [...book.users, myInfo]
        })
      })
      .then(resp => resp.json())
      .then(data => {
        const likedBy = document.querySelector("#liked-by")
        likedBy.innerText = ""
        let newData = data.users
        newData.forEach(book => {
          const newList = document.createElement("li")
          newList.innerText = book.username
          likedBy.appendChild(newList)
        })
      })
    })
  })
}