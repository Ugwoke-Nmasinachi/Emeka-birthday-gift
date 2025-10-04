const requestToPlayPage = document.querySelector('.requestToPlayPage');
const gamePage = document.querySelector('.gamePage');
const gameBoard = document.querySelector('.gameBoard');
const gameResultPage = document.querySelector('.gameResultPage');
const birthdayCardPage = document.querySelector('.birthdayCardPage');
const playGameBtn = document.getElementById('playGameBtn');
const playAgainBtn = document.getElementById('playAgain');
const viewCardBtn = document.getElementById('viewCard');
const messageElement = document.getElementById('message');


const imageSources = [
    '/assets/Images/iphone12.jpeg',
    '/assets/Images/iphone17.jpeg',
    '/assets/Images/iphone8.jpeg',
    '/assets/Images/iphoneXr.jpeg',
    '/assets/Images/macbook.jpeg',
    '/assets/Images/ipad.jpeg',
    '/assets/Images/airpods.jpeg',
    '/assets/Images/airpods max.jpeg',
]

//duplicate images (making 2 of each image). 2x8 = 16
const cardImages = [...imageSources, ...imageSources];//so it spreads it twice
shuffle(cardImages);

//function to hanlde game
function loadGame(){
    //ensure only game page is displaying
    requestToPlayPage.style.display = 'none';
    birthdayCardPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameResultPage.style.display = 'none';

    let isBoardLocked = false; //to track when user can click or not
    let flippedCards = [];//to keep array of first and second card that was selected to check if they match
    let matched = 0; //track how many has been matched. He needs to match 8 cards to move to next page

    cardImages.forEach(src => {
        //for each image, create a card
        let card = document.createElement('div');
        card.classList = 'card';
        card.dataset.imgSrc = src; //<div class="card" data-img-src="src">

        //create the actual image
        let img = document.createElement('img');
        img.src = src;
        card.appendChild(img);//put inside card

        card.addEventListener('click', () => handleGameLogic(card));//every card clicked
        gameBoard.append(card);
    })

    function handleGameLogic(card){
        if(isBoardLocked || card.classList.contains('flipped')){
            return; //ignore clcik if they clicked an already flipped card or board is locked
        }

        card.classList.add('flipped');//flip it
        flippedCards.push(card); //add it to array

        if(flippedCards.length == 2){
            checkMatch();
        }
    }

    function checkMatch(){
        const [card1, card2] = flippedCards;

        //check if they match
        let isMatch = card1.dataset.imgSrc == card2.dataset.imgSrc;

        if(isMatch){
            //we don't remove flipped if they match so that it doesn't close back
            isBoardLocked = true; //lock the board while it shows matching animation back
            setTimeout(() => {
                matched++;
                if(matched == 8){
                    //ensure move to next page if all are matched
                    requestToPlayPage.style.display = 'none';
                    birthdayCardPage.style.display = 'none';
                    gamePage.style.display = 'none';
                    gameResultPage.style.display = 'block';
                }

                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];//empty array for a new set of matches
                isBoardLocked = false; //unlock board;
            },700)
            
        }else{
            isBoardLocked = true; //lock the board while it flips back
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                isBoardLocked = false; //unlock board
            },800)

        
        }
    }

    
    
}

function loadBirthdayCard(){
    //ensure only card page is displaying
    requestToPlayPage.style.display = 'none';
    birthdayCardPage.style.display = 'block';
    gamePage.style.display = 'none';
    gameResultPage.style.display = 'none';

    //create typewriter animation
    let message = "Happy Birthday to youuuuuuuu. I wish you a long life and prosperity. I pray God continues to bless you and your business.  I pray the rest of the year is good for you. Enjoy your day😝🧡. heheheheheheh!!";
    let index = 0; //to track what letter we're at
    function typewriter(){
        if(index < message.length){//meaning message isn't done
            messageElement.innerHTML += message.charAt(index);//keep on adding each letter based on current index
            index++;
            setTimeout(typewriter, 150);//calling the function again after a tiny amt of time. this gives illusion of typewriting
        }
    }
    typewriter();
}

//function to shuffle array
function shuffle(array){
    for(let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//when user clicks to view card
viewCardBtn.addEventListener('click', loadBirthdayCard)
//when user clciks to play again
playAgainBtn.addEventListener('click', loadGame);
//when user clicks play game
playGameBtn.addEventListener('click', loadGame);
