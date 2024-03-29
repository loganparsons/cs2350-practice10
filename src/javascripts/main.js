import "bootstrap"


let initial_cards = [
    {
      place: "Route 66, Nevada", 
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas atque itaque quod facere vel nostrum, quae illo alias consequatur voluptatem. Laboriosam quod possimus nulla sequi dolorem expedita aut voluptatibus asperiores!", 
      poster: "https://plus.unsplash.com/premium_photo-1675826908169-ac0de41a213a?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
      place: "Red Rock Canyon, Nevada",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dignissimos fugiat aperiam, doloribus eius deleniti dicta labore repellendus, eaque odit ut nam? Id autem est voluptatem, dicta dolores voluptates nisi.",
      poster: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?q=80&w=2677&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  function hideForm(){
    document.querySelector("#myForm").classList.add('d-none')
    document.querySelector("#cards").classList.remove('d-none')
  }

  function hideCards(){
    document.querySelector("#myForm").classList.remove('d-none')
    document.querySelector("#cards").classList.add('d-none')
  }

  function getCards(){
    if(localStorage.getItem('cards') && localStorage.getItem("cards") != '[]'){
        return JSON.parse(localStorage.getItem('cards'))
    } else {
        return initial_cards
    }
    
  }

  function addNewCards(event){
    event.preventDefault()

    let t = document.querySelector("#place").value
    let d = document.querySelector("#description").value
    let p = document.querySelector("#poster").value

    let cards = getCards()
    if(t && d && p){
        let card = { place: t, description: d, poster: p }
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))

    }

    this.reset()
    displayCards()
  }

  function displayCards(){
    let cards = getCards()
    let cards_html = ''
    let ndx = 0
    for(let c of cards){
        cards_html += `
            <div class="card col mb-3" data-ndx="${ndx}">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${c.poster}" class="img-fluid rounded-start" alt="${c.place}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${c.place}</h5>
                            <p class="card-text">${c.description}</p>
                            <p class="card-text">
                                <button class="btn btn-danger to-delete">Delete</button>
                            </p>
                       </div>
                    </div>
                </div>
            </div>`
        ndx++
    }

    document.querySelector("#cards").innerHTML = cards_html

    document.querySelectorAll('.to-delete').forEach(function(btn){
        btn.onclick = function(event){
            if(confirm("Are you sure you want to delete this postcard?")){
                cards.splice(event.target.closest('.col').dataset.ndx, 1)
                localStorage.setItem("cards", JSON.stringify(cards))
                displayCards()
            }
        }
    })

    hideForm
}
document.querySelector("#myForm").onsubmit = addNewCards
document.querySelector("#new_card").onclick = hideCards
document.querySelector(".to-cancel").onclick = hideForm


displayCards()
