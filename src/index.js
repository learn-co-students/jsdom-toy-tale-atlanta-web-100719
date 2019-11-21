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

  const response = fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      let div = document.querySelector('#toy-collection');
      data.forEach(toy => {
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
        div.appendChild(card)
      });
    })

})
