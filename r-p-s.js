let score = JSON.parse(localStorage.getItem('score')) || 
{
  wins: 0,
  losses:0,
  ties:0
};

updateScore();


function updateScore()
{
  document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties:${score.ties}.`;
}

function updateResult()
{
  document.querySelector('.js-result')
  .innerHTML = `${result}`;
}


/*
if(!score)
{
  score = 
  {
    wins: 0,
    losses:0,
    ties:0
  };
}
*/
function pickComputerMove()
{
  const randomNo = Math.random();
  let computerMove;

  if(randomNo >= 0 && randomNo <= 1/3)
  {
    computerMove = 'rock';
  }
  else if(randomNo > 1/3 && randomNo <= 2/3)
  {
    computerMove = 'paper';
  }
  else if(randomNo > 2/3 && randomNo <= 1)
  {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;



function autoPlay()
{
  if(!isAutoPlaying)
  {
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playgame(playerMove);
    document.querySelector('.js-auto').innerHTML = 'Stop Auto Play';
    }, 1000);
    isAutoPlaying = true;
    
  }
  else
  {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto').innerHTML = 'Auto Play';
  }
  
}

document.querySelector('.js-rock-btn').addEventListener('click',()=>
{
  playgame('rock');
});
document.querySelector('.js-paper-btn').addEventListener('click',()=>
{
  playgame('paper');
});
document.querySelector('.js-scissors-btn').addEventListener('click',()=>
{
  playgame('scissors');
});
document.querySelector('.js-reset').addEventListener('click',()=>
{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score')
  updateScore();
});
document.querySelector('.js-auto').addEventListener('click',()=>
{
  autoPlay();
});

document.body.addEventListener('keydown',(event)=>
{
  if(event.key === 'r')
  {
    playgame('rock');
  }
  else if(event.key === 'p')
  {
    playgame('paper');
  }
  else if(event.key === 's')
  {
    playgame('scissors');
  }
});


function playgame(playerMove)
{
  const computerMove = pickComputerMove();
  let result = '';

    if(playerMove === 'scissors')
    {
      if(computerMove === 'rock')
      {
        result = 'You Lose.';
      }
      else if(computerMove === 'paper')
      {
        result = 'You Win.';
      }
      else if(computerMove === 'scissors')
      {
        result = 'Tie.';
      }
    }
    else if(playerMove === 'paper')
    {
      if(computerMove === 'rock')
      {
        result = 'You Win.';
      }
      else if(computerMove === 'paper')
      {
        result = 'Tie.';
      }
      else if(computerMove === 'scissors')
      {
        result = 'You Lose.';
      }
    }
    else if(playerMove === 'rock')
    {
      if(computerMove === 'rock')
      {
        result = 'Tie.';
      }
      else if(computerMove === 'paper')
      {
        result = 'You Lose.';
      }
      else if(computerMove === 'scissors')
      {
        result = 'You Win.';
      }
    }

    if(result === 'You Win.')
    {
      score.wins += 1;
    }
    else if(result === 'You Lose.')
    {
      score.losses += 1;
    }
    else if(result === 'Tie.')
    {
      score.ties += 1;
    }

  localStorage.setItem('score' , JSON.stringify(score));
  updateScore();

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves')
  .innerHTML = 
  `You
  <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
  <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
  Computer`;
}