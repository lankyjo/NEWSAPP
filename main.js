const paragraph = document.querySelectorAll('.sub-headline p')
const loader = document.querySelector('.news-loader');
    paragraph.forEach(p => {
    // p.innerText = p.innerText.substring(0,100) + '...'
        splitToWords(p)
    })

function splitToWords(text){
    let words = text.innerText.split(' ')
    if(words.length > 10){
        text.innerText = words.splice(0, 10).join(' ') + '...'
    }
}

const menuBar = document.querySelector('.menubar')
const menu = document.querySelector('.mobile-menu')
menuBar.addEventListener('click', ()=> {
    menu.classList.toggle('active')
})

const API_KEY = 'gpQywqs4NupUtqPFdvpOR7BkONhU1EqzeMVMHgWo'
let API = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&language=en`

console.log(API)

const topNews = document.querySelectorAll('.top')
const sports = document.querySelectorAll('.sports')
const entertainment = document.querySelectorAll('.entertainment')
const finance = document.querySelectorAll('.finance')

document.addEventListener('DOMContentLoaded', function(){
    loader.style.display = 'grid'
})
topNews.forEach(link => {
    link.addEventListener('click', function(){
        API = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&language=en`
        document.querySelector('.white-text').innerHTML = 'in the world'
    console.log(API);
    loadCategories()
    })
})

function linkAction(links){
    links.forEach(link => {
        link.addEventListener('click', function(){
            console.log(link.innerText.toLowerCase())
            document.querySelector('.white-text').innerHTML = `in ${link.innerText}`
            let categories = link.innerText.toLowerCase()
            API = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&language=en&limit=10&categories=${categories}`
            console.log(API)            
            loadCategories()
        })
    })
}
linkAction(sports)
linkAction(entertainment)
linkAction(finance)
function loadCategories(){
    const newsArea = document.querySelector('.news-area');
    newsArea.innerHTML = ''
    loader.style.display = 'grid'
    async function fetchNews() {
        try {
            const response = await fetch(API);
            const data = await response.json();    
            return data.data;
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }
    
    function createNewsCard(data) {
        const card = document.createElement('div');
        card.className = 'card';
    
        card.innerHTML = `
            <div class="image">
                <img src="${data.image_url}" alt="${data.title}">
            </div>
            <div class="headline">
                <h3>${data.title}</h3>
            </div>
            <div class="sub-headline">
                <p>${data.description}</p>
            </div>
            <div class="read-more">
            <a href="${data.url}" target="_blank" rel="noopener noreferrer">Read article</a>
            </div>
        `;
    
        return card;
    }
    async function populateNewsArea() {
        const newsArea = document.querySelector('.news-area');
        const articles = await fetchNews();
    
        articles.forEach(article => {
            const newsCard = createNewsCard(article);
            newsArea.appendChild(newsCard);
        loader.style.display = 'none'
        });
    }
    populateNewsArea()
}
async function fetchNews() {
    try {
        const response = await fetch(API);
        const data = await response.json();    
        return data.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function createNewsCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <div class="image">
            <img src="${data.image_url}" alt="${data.title}">
        </div>
        <div class="headline">
            <h3>${data.title}</h3>
        </div>
        <div class="sub-headline">
            <p>${data.description}</p>
        </div>
        <div class="read-more">
        <a href="${data.url}" target="_blank" rel="noopener noreferrer">Read article</a>
        </div>
    `;

    return card;
}

async function populateNewsArea() {
    const newsArea = document.querySelector('.news-area');
    const articles = await fetchNews();

    articles.forEach(article => {
        const newsCard = createNewsCard(article);
        newsArea.appendChild(newsCard);
        loader.style.display = 'none'
    });
}
populateNewsArea()

const mobileLinks = document.querySelectorAll('.mobile-menu ul li')

mobileLinks.forEach(ml => {
    ml.addEventListener('click', function(){
    menu.classList.toggle('active')
    const menuInput = document.getElementById('menubar-toggler')
    menuInput.checked = false
    })
})

let links = document.querySelectorAll('.linked')

links.forEach(link => {
    link.onclick = function(){
    links.forEach(link => {
        link.classList.remove('color-active-red')
    })
    link.classList.add('color-active-red')
    }
})