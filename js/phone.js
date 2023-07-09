const loadPhones = (search , datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data , datalimit));
};

const displayPhones = (phones , datalimit) => {
  //  console.log(phones.length)
  
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";

  const showMore = document.getElementById('showMore')
  // show All Button
  if(phones.length >datalimit ){
    phones = phones.slice(0, 10);
    showMore.classList.remove('d-none')
  } 
  else{
    showMore.classList.add('d-none')
  }

  // display No pohne Found message
  const noPhone = document.getElementById("no-phone-found");
  const showGrab = document.getElementById("grabPhone");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
    showGrab.classList.add("d-none");
    
  } else {
    noPhone.classList.add("d-none");
    showGrab.classList.remove("d-none");
  }

  // display 10 phones
  phones.forEach((element) => {
    // console.log(element)
    const phonediv = document.createElement("div");
    phonediv.classList.add("col");
    phonediv.innerHTML = `
        <div class="card">
                    <img src="${element.image}" class="card-img-top p-4" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
        `;
    phonesContainer.appendChild(phonediv);
  });
  
  toggleLoader(false);

  
};

const processSearch = (datalimit) => {
  toggleLoader(true);
  const inputField = document.getElementById("phone-field");
  const inputText = inputField.value;
  // inputField.value = "";
  loadPhones(inputText ,datalimit);

}


const searchBtn = document.getElementById("search-phone").addEventListener("click", function () {
    processSearch(10)
  });

// show all btn
  document.getElementById('show-all-btn').addEventListener('click', function(){
    processSearch()
  })

const toggleLoader = (loader) => {
  const loaderSection = document.getElementById("loader-section");
  if (loader) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};



// loadPhones()
