import characterData from '/battle/data.js'
import Character from '/battle/Character.js'

function getCatSound(){
let catSound = new Audio('audiomass-outputcat.mp3')
catSound.play()
return catSound}

function getFishSound(){
    let fishSound = new Audio('audiomass-outputfish.mp3')
fishSound.play()
return fishSound}

function getPigSound(){
    let pigSound = new Audio('audiomass-outputpig.mp3')
pigSound.play()
return pigSound}

function getDogSound(){
    let dogSound = new Audio('audiomass-outputdog.mp3')
dogSound.play()
return dogSound}

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false



function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}


function getSound(){ 
    
    let pig = true
    let dog = true

    if (wizard.health === 60 || monster.health === 25 || monster.health === 20){getCatSound()}
   if (monster.health === 30){
        
        setTimeout(()=>{
        getFishSound()
        
        

        },1500)
       
    } 
    
        pig = false
        if (monster.health === 25 && pig === false){
        setTimeout(()=>{
        getPigSound()
        
         },1500)
    }

        dog = false
        if (monster.health === 20 && dog === false){
        setTimeout(()=>{
        getDogSound()
         },1500)
    }
    

    
}


function attack() {
    getSound()



    if (wizard.health === 60){
    
    setTimeout(()=>{
                  
    if(!isWaiting){
        
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
            
        }    
        
    }
    },2500)}

    else{if(!isWaiting){
        
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
            
        }    
        
    }}
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all combatants are dead" :
        wizard.health > 0 ? "The Terminator Milo Wins" :
            "Milo's enemies are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

render()
