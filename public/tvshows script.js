let currPage = 0; //set the page number to 0 for start
//declare the funcion of the onclick
let no = 0;
function next() {
  currPage = currPage + 1; //add the number of 1 so it can go by 1 /1 when you click

  fetch("https://www.episodate.com/api/most-popular?page=" + currPage) //add the no of currPage to your fetch API
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      document.getElementById("containerOne").innerHTML = "";
      //now run a for loop and target the main tv_shows array in the object
      for (let i = 0; i < post.tv_shows.length; i++) {
        no = no + 1;
        const cards = post.tv_shows[i];

        document.getElementById("containerOne").innerHTML += `
        <a href="http://localhost:5500/details?id=${cards.id}">
        <div class="card">
        <img src="${cards.image_thumbnail_path}" alt="image of ${cards.name}">
        <div class="cardContents">
        <div id="htwo">${no}</div>
            <h4>${cards.name}</h4>
            <h5>${cards.country}</h5>
            <h6>${cards.start_date}</h6>
        </div>
    </div>
        </a>
        `;
      }
    });
}
next(); //declare the function so it can appear
function prev() {
  currPage = currPage - 1;

  fetch("https://www.episodate.com/api/most-popular?page=" + currPage) //add the no of currPage to your fetch API
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      document.getElementById("containerOne").innerHTML = "";
      //now run a for loop and target the main tv_shows array in the object
      for (let i = 0; i < post.tv_shows.length; i++) {
        const cards = post.tv_shows[i];

        no = no - 1;
        if (no < 20) {
          no;
        }
        document.getElementById("containerOne").innerHTML += `
        <a href="http://localhost:5500/details?id=${cards.id}">
        <div class="card">
        <img src="${cards.image_thumbnail_path}" alt="image of ${cards.name}">
        <div class="cardContents">
        <div id="htwo">${no}</div>
            <h4>${cards.name}</h4>
            <h5>${cards.country}</h5>
            <h6>${cards.start_date}</h6>
        </div>
    </div>
        </a>
      `;
        // console.log(cards.id);
        // if(cards.id === details.id){
        //   detail.id = cards.id
        // }
      }
    });
}

// search throughout the whole api and use the api of searcyh
const search = () => {
  document.getElementById("clear").style.opacity = 1;
  document.getElementById("movieSearch").style.opacity = 1; //opacity should change when the search input is onkeyup to 1
  const term = document.getElementById("searchItem").value; //put the value of your search input in a variable and then pass it into your api

  //when all the values in the input are cleared the movieSearch should not show

  if (document.getElementById("searchItem").value.length == "") {
    document.getElementById("clear").style.opacity = 0;
    return (document.getElementById("movieSearch").style.opacity = 0);
  }

  fetch("https://www.episodate.com/api/search?q=" + term) //the value of your input hass been passed to gety the name of value youre searching for
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      document.getElementById("movieSearch").innerHTML = "";
      for (let i = 0; i < post.tv_shows.length; i++) {
        const cards = post.tv_shows[i];
        no = no + 1;
        document.getElementById("movieSearch").innerHTML += `
        <a href="http://localhost:5500/details?id=${cards.id}">
        <div class="movieSearchItems">
        <img src="${cards.image_thumbnail_path}" alt="${cards.name}">
        <div class="movieSearchItemsContents">
            <h4>${cards.name}</h4>
            <h6>${cards.start_date}</h6>
            <div id="htwo" >${no}</div>
        </div>
    </div>
        </a>
        `;
      }
    });
};

//clear all items in the input from your icon and also movieSearch should not show
function clearSearch() {
  let remove = document.getElementById("searchItem");
  remove.value = "";
  document.getElementById("movieSearch").style.opacity = 0;
  document.getElementById("clear").style.opacity = 0;
}
//run server
//get the details

const fes = document.querySelectorAll(".fes");

fes.forEach((sub) =>
  sub.addEventListener("click", () => {
    document.querySelectorAll(".replas").forEach((r) => {
      r.src = sub.src;
    });
  })
);
