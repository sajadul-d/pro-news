//console.log('app.js is connected');

//news catagory load function
const newsCatagoryLoad = () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatagory(data.data.news_category));
};

const displayCatagory = (catagories) => {
  let newsCatagory = document.getElementById('catagory-container');
  for (const catagory of catagories) {
    // console.log(catagory);
    const divCatagory = document.createElement('div');
    //divCatagory.classList.add('row');
    divCatagory.innerHTML = `
    <nav class="navbar navbar-light bg-light">
    <form class="container-fluid justify-content-start">
      <butto onclick="catagoryDetails('${catagory.category_id}')" class="btn-outline-success me-2">${catagory.category_name}</button>
    </form>
    </nav>
    `;
    newsCatagory.appendChild(divCatagory);
  }
};

function catagoryDetails(id) {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadNews(data.data));
}

function loadNews(data) {
  //console.log(data.length);
  const newsNumber = document.getElementById('news-number');
  newsNumber.innerText = `${data.length} items found for those Catagory`;
  if (data.length == 0) {
    newsNumber.innerText = `No iteams found for those Catagory`;
  }
  const loadAllNews = document.getElementById('load-news');
  loadAllNews.innerText = '';
  for (const detail of data) {
    //console.log(detail.findLastIndex());
    const image = detail.author.img;
    //console.log(image);
    const newsDiv = document.createElement('div');
    let text = detail.details;
    const textdetails = text.slice(0, 500);
    newsDiv.classList.add('row');
    newsDiv.innerHTML = `
        <div class="col-md-4">
          <img src="${detail.thumbnail_url}" alt="">
        </div>
        <div class="col-md-7">
              <h5>${detail.title}</h5>
              <p>${textdetails}</p>
        <div class="row">
         <div class="col-md-2 col-sm-2 col-xs-1">
          <img class="img-fluid rounded-circle w-25" src="${image}" alt="">
         </div>
         <div class="col md-2">
            <h6>${detail.author.name}</h6>
            <p>${detail.author.published_date}</p>

         </div>
         <div class="col md-4">
           <h6>Views: ${detail.total_view}M </h6>

         </div>
         <div class="col-md-4">
           <button onclick="detailsNews('${text}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsmodal">Details</button>
           
         </div>
       </div>
    `;
    loadAllNews.appendChild(newsDiv);
  }
}
function detailsNews(data) {}
detailsNews();
newsCatagoryLoad();
