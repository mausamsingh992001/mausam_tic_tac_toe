const x_class= 'x'
const o_class= 'o'
const win_condition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellelements=document.querySelectorAll('[cell-shape]')
const playingarea=document.getElementById("playingarea")
const gameendedpage=document.getElementById("gameended")
const gameendedpagetext=document.querySelector(
    '[game_ended_text]')

const playagainbutton=document.getElementById("playagainbutton")
const xshape=document.getElementById("xshape")
const oshape=document.getElementById("oshape")
let x_turn
xshape.addEventListener('click',startgamex)
oshape.addEventListener('click',startgameo)


playagainbutton.addEventListener('click',startgamex)



function startgamex(){

    x_turn=true;
    cellelements.forEach(cell =>{
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click',onclick)
        cell.addEventListener('click', onclick  ,   {once:true})
    })
    hover()
    gameendedpage.classList.remove('show')
    }


    function startgameo(){

        x_turn=false;
        cellelements.forEach(cell =>{
            cell.classList.remove(x_class)
            cell.classList.remove(o_class)
            cell.removeEventListener('click',onclick)
            cell.addEventListener('click', onclick  ,   {once:true})
        })
        hover()
        gameendedpage.classList.remove('show')
        }


function onclick(e)
{
    const cell=e.target
    const current_class= x_turn?x_class : o_class
    makeshape(cell,current_class)
    if(iswin(current_class)){
        endgame(false)
    }
    else if(isdraw()){
        endgame(true)
    }
    else{
    swap()
    hover()
    }

}
function endgame(draw){
    var no_of_games
    if(draw){
    gameendedpagetext.innerText ="Draw!"
    no_of_games=document.getElementById("noofgames").value
    no_of_games++
    document.getElementById("noofgames").value=no_of_games

    }
    else{
        var message;
         no_of_games=document.getElementById("noofgames").value
    no_of_games++
    document.getElementById("noofgames").value=no_of_games
        if(!x_turn){
            message="player O wins!!"
            var oscore=document.getElementById("playeroscore").value
            oscore++
             document.getElementById("playeroscore").value=oscore
        }
        else{
            message="player X wins!!"
            var xscore=document.getElementById("playerxscore").value
            xscore++
            document.getElementById("playerxscore").value=xscore
        }
        gameendedpagetext.innerText= message
        
    }
    gameendedpage.classList.add('show')
}

function isdraw(){
    return [...cellelements].every(index =>{
        return index.classList.contains(x_class)||
        index.classList.contains(o_class)
    })
}

function makeshape(cell,current_class){
    cell.classList.add(current_class)
}
function swap(){
    x_turn=!x_turn
}
function hover()
{
    playingarea.classList.remove(x_class)
    playingarea.classList.remove(o_class)
    if(x_turn){
    playingarea.classList.add(x_class)
    }
    else{
        playingarea.classList.add(o_class)
    }
}

function iswin(current_class){
    return win_condition.some(triplet =>{
        return triplet.every(index =>{
            return cellelements[index].classList.contains(current_class)
        })
    })
}


