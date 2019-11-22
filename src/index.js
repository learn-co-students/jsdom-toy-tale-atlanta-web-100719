let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  let div = document.querySelector('#toy-collection');

  // build the cards
  const response = fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      data.forEach(toy => {
        div.appendChild(makeCard(toy))
      });
    })

  function makeCard(toy) {
    let card = document.createElement('div');
    card.className = 'card';
    let h2 = document.createElement('h2');
    h2.innerText = toy.name;
    let img = document.createElement('img');
    img.src = toy.image
    img.className = 'toy-avatar'
    let p = document.createElement('p');
    p.innerText = toy.likes + ' Likes'
    let button = document.createElement('button');
    button.className = 'like-btn'
    button.innerText = 'Like <3'

    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)

    button.addEventListener('click', () => {
      let likes = p.innerText.split(' ')[0]

      //update data
      let patchResponse = fetch('http://localhost:3000/toys/' + toy.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "likes": ++likes }) })
        .then(res => res.json())
        .then((toy) => {
          p.innerText = toy.likes + ' Likes'
        })
    })
    return card
  }

  // process the form
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    // prevent default
    event.preventDefault()
    // post it
    const postResponse = fetch('http://localhost:3000/toys', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.name.value, image: event.target.image.value, likes: 0 })
    })
      .then(res => res.json())
      .then(toy => div.appendChild(makeCard(toy)))
    // reset
    event.target.reset()
  })
})
