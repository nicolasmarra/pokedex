const nom = document.getElementById('nom')
const id = document.getElementById('id')
const image = document.querySelector('.pokemon')

const form = document.getElementById('form')
const recherche = document.querySelector('.recherche')
const precedent = document.querySelector('.precedent')
const suivant = document.querySelector('.suivant')

let valeur = 1

const fetchPokemon = async pokemon => {
  const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (APIReponse.status == 200) return await APIReponse.json()
}

const renderPokemon = async pokemon => {
  nom.innerHTML = 'Chargement...'
  id.innerHTML = ''
  const data = await fetchPokemon(pokemon)

  if (data) {
    image.style.display = 'block'
    nom.innerHTML = data.name
    id.innerHTML = data.id

    image.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    /* Alternative
   image.src = `https://raw.githubusercontent.com/POKEAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`
  */

    recherche.value = ''

    valeur = data.id
  } else {
    nom.innerHTML = 'Aucun résultat'
    id.innerHTML = ''
    image.style.display = 'none'
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  renderPokemon(recherche.value.toLowerCase())
})

precedent.addEventListener('click', () => {
  if (valeur > 1) valeur--

  renderPokemon(valeur)
})

suivant.addEventListener('click', () => {
  valeur++
  renderPokemon(valeur)
})

renderPokemon(valeur)
