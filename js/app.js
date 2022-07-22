let timeframe = 'weekly';
const container = document.querySelector('.container');
let activitiesCards ;

const menus = document.querySelectorAll(".menu-link");
 

menus.forEach( function(menu){
    menu.addEventListener('click', menuClick)
})

// the dictionary to be created from json 
let data = {};

fetch('./js/data.json')
.then(function(response){
        return response.json()
 })
.then(function(Data){
    Data.forEach(function(element){
      container.insertAdjacentHTML('beforeend', 
        createActivityCard( element, timeframe))
    })
    Data.forEach(element =>{
      data[element.title] = element.timeframes;
    });   
    activitiesCards = document.querySelectorAll('.activities-card');
});


// funtions 
function menuClick(e){
    // console.log(e.target.innerText.toLowerCase())
    menus.forEach(function(menu){
        menu.classList.remove('menu-active')
    })
    e.target.classList.add('menu-active')
    timeframe = e.target.innerText.toLowerCase()

    updateCards(timeframe)

}
function updateCards(timeframe){
  activitiesCards.forEach(card => {
    updateCard( card, timeframe);
  });
}
function updateCard(card, timeframe){
  const title = card.querySelector('.title').innerText;
  const current = data[title][timeframe]['current'];
  const previous = data[title][timeframe]['previous'];

  const timeframeMsg = {
    'daily' : 'Yesterday',
    'weekly' : 'Last Week',
    'monthly' : 'Last Month'
  }

  const hoursElement = card.querySelector('.hours');
  hoursElement.innerText = `${current}hrs`;
  const msgElement = card.querySelector('.description');
  msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`
}
function createActivityCard(element, timeframe){
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous']

    const timeframeMsg = {
      'daily' : 'Yesterday',
      'weekly' : 'Last Week',
      'monthly' : 'Last Month'
    }
    return `
<div class="activities-card ${title.toLowerCase().replace(/\s/g,'')}">
    <div class="activity">
      <div class="row">
        <div class="title">${title}</div>
        <img class="ellipse" src="./images/icon-ellipsis.svg" alt="">
      </div>
      <div class="row-2">
        <div class="hours">${current}hrs</div>
        <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
      </div>
    </div>
</div>`
}