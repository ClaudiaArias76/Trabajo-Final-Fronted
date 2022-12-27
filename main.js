const $containCards = document.querySelector("*.contain-cards")
const $initPage = document.querySelector("#init-page")
const $previousPage = document.querySelector("#previous-page")
const $nextPage = document.querySelector("#next-page")
const $lastPage = document.querySelector("#last-page")
const $filterAll = document.querySelector("#filter-all")
const $filterWomen = document.querySelector("#filter-women")
const $filterMens = document.querySelector("#filter-mens")
const $filterNoGender = document.querySelector("#filter-no-gender")
const $filterUnknown = document.querySelector("#filter-unknown")

let allDetailRickAndMorty;
let page = 1;
let totalPages;
let Pages = 42;
window.onload =  function(){alert('Bienvenido a esta pagina');}
window.onunload=function(){alert('Vuelva en otro momento');}
window.onload = async() => {
       load(1)
}

function load(pg) {
    if (page < 2) {
       $previousPage.classList.add("desactived")
       $initPage.classList.add("desactived")
    } else {
        $previousPage.classList.remove("desactived")
        $initPage.classList.remove("desactived")
    }
    if(page = 42) {
        $nextPage.classList.add("desactived")
        $lastPage.classList.add("desactived")
    } else {
        $nextPage.classList.remove("desactived")
        $lastPage.classList.add("desactived") 
    }

    fetch(`https://rickandmortyapi.com/api/character?page=${pg}`) 
    .then(response => response.json())
    .then(data => {
        allDetailRickAndMorty = data.results
        totalPages = data.info.page
        paintCards()
    })
    .catch (error => console.log(error))
}

function paintCards(arrayToPaint) {
    $containCards.innerHTML = ""
    allDetailRickAndMorty.forEach(character => {
        $containCards.innerHTML += `
        <div class="card">
            <img  src = "${character.image}" class="rickmoty">
            <div class="contain-info">
            <p> Nombre: ${character.name}</p>
            <p>Género: ${character.gender}</p>
            <p>Especie: ${character.species}</p>
            <p>Estatus: ${character.status}</p>
            <p>Origen: ${character.origin}</p>
            <p>Localización: ${character.location}</p>
            </div>
        </div>
       `
    })

}

$nextPage.onclick = function () {
    if(page <= Pages){
    page += 2
    load(page)
    }
}
$previousPage.onclick = function () {
    if(page > 1) {
    page -= 2
    load(page)
}
}
$initPage.onclick = function () {
    page = 1
    load(page)
}
$lastPage.onclick = function () {
     while (page + 2 < Pages){
         page += 2
    }
    load(page)

}

$filterAll.onclick = function () {
    paintCards(allDetailRickAndMorty)
}

$filterMens.onclick = function () {
    let charactersFilters = [];
    allDetailRickAndMorty.forEach(character => {
        character.gender.forEach(gender => {
            if(gender === Male) {
                charactersFilters.push(character)
            }
        })
    })
    paintCards(charactersFilters)
} 

$filterWomen.onclick = function () {
    let charactersFilters = [];
    allDetailRickAndMorty.forEach(character => {
        character.gender.forEach(gender => {
            if(gender === Female) {
                charactersFilters.push(character)
            }
        })
    })
    paintCards(charactersFilters)
} 
$filterNoGender.onclick = function () {
    let charactersFilters = [];
    allDetailRickAndMorty.forEach(character => {
        character.gender.forEach(gender => {
            if(gender === Genderless) {
                charactersFilters.push(character)
            }
        })
    })
    paintCards(charactersFilters)
} 
$filterUnknown.onclick = function () {
    let charactersFilters = [];
    allDetailRickAndMorty.forEach(character => {
        character.gender.forEach(gender => {
            if(gender === unknown) {
                charactersFilters.push(character)
            }
        })
    })
    paintCards(charactersFilters)
} 





/*let charactersFilters = allDetailRickAndMorty.filter(filterMens => character.gender === "Male")
paintCards(charactersFilters) */



/* $filterAll 
$filterWomen
$filterMens 
$filterNoGender 
$filterUnknown  */







 