//code to mage picture change within a specific time
let userImg = document.getElementById('userImage');

//container for image src's
const imagesContainer = [
    '/assets/Images/img01.jpg',
    '/assets/Images/img02.jpg',
    '/assets/Images/img03.jpg',
    '/assets/Images/img04.jpg',
    '/assets/Images/img05.jpg',
    '/assets/Images/img06.jpg',
    '/assets/Images/img07.jpg',
    '/assets/Images/img08.PNG',
    '/assets/Images/img09.PNG',
    '/assets/Images/img10.jpg',
    '/assets/Images/img11.jpg',
    '/assets/Images/img12.jpg',
    '/assets/Images/img13.jpg',
    '/assets/Images/img14.jpg',
    '/assets/Images/img15.jpg',
    '/assets/Images/img16.jpg',
    '/assets/Images/img17.jpg',
    '/assets/Images/img18.jpg',
    '/assets/Images/img19.jpg'
    
]

//every interval of 5s, img=age changes to a random image
setInterval(() => {
    const randomIndex = Math.floor(Math.random() * imagesContainer.length);userImg.src = imagesContainer[randomIndex]
}, 1500)