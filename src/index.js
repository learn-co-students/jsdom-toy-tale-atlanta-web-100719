let addToy = false

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

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
    return card
  }

  // process the form
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    // prevent default
    event.preventDefault()
    // post it
    let newToy = postData('http://localhost:3000/toys', { name: event.target.name.value, image: event.target.image.value, likes: 0 })
    // add a card
    newToy.then(toy => {
      div.appendChild(makeCard(toy))
    })
    // reset
  })
})
