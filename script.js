const treeContainer = document.getElementById("trees-container");
const categoriesContainer = document.getElementById("categorie-container");
let cardContainer = document.getElementById("cardContainer");

// loading function
const manageLoading = (status) => {
  if (status) {
    document.getElementById("spniner").classList.remove("hidden");
  } else {
    document.getElementById("spniner").classList.add("hidden");
  }
};
/**
 * main tree data load
 */
const loadTreeData = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((alltree) => displayTreeContainer(alltree.plants))
    .catch((err) => {
      console.log(err);
    });
};
/**
 * categories data load
 */
const categoriesData = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
/**
 * dispaly categories
 */
const displayCategories = (categories) => {
  categories.forEach((categorie) => {
    categoriesContainer.innerHTML += `
    <li id="${categorie.id}" class="text-lg hover:bg-[#15803D] hover:text-white p-3 rounded-md cat-btn">${categorie.category_name}</li>
    `;
  });
};

/**
 * display categories actice class added
 */
categoriesContainer.addEventListener("click", (e) => {
  const allli = document.querySelectorAll("li");
  allli.forEach((li) => {
    li.classList.remove("active");
  });
  if (e.target.localName === "li") {
    e.target.classList.add("active");
    displayCategoriesData(e.target.id);
    manageLoading(true);
  }
});
const displayCategoriesData = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((trees) => displayTreeContainer(trees.plants));
};
// plants details
const plantsData = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((tree) => displayPlantsDetails(tree.plants));
};
const displayPlantsDetails = (plants) => {
  console.log(plants);
  const plantsDetails = document.getElementById("plantsDetails");
  plantsDetails.innerHTML = "";
  plantsDetails.innerHTML += `
                <div class="">
                    <h1 class="font-bold text-xl">${plants.name}</h1>
                    <div class="w-full h-60 overflow-hidden rounded-xl mt-4 mb-2">
                      <img class="h-full w-full object-cover duration-400 ease-in-out will-change-transform scale-100 hover:scale-110  duration-100 bg-center" src="${plants.image}" alt="">
                    </div>
                    
                    <h2><span class="font-bold ">Category:</span> ${plants.category}</h2>
                    <h2><span class="font-bold my-2">Price: ৳</span>${plants.price}</h2>
                    <p><span class="font-bold ">Description: </span>${plants.description}</p>
                </div>
  `;
  document.getElementById("plants-modal").showModal();
};
/**
 * dispaly main tree
 */
const displayTreeContainer = (trees) => {
  treeContainer.innerHTML = "";
  trees.forEach((tree) => {
    treeContainer.innerHTML += `
    <div class="bg-white p-4 h-fit rounded-md">
      <figure>
      <div class="w-full h-[150px] overflow-hidden rounded-xl">
        <img class=" w-full h-full duration-400 ease-in-out will-change-transform scale-100 hover:scale-110  duration-100 object-cover bg-center" src="${
          tree.image
        }"
        alt="Shoes" />
      </div>
      </figure>
      <div class=" mt-3">
        <h2 onclick="plantsData(${tree.id})" class="font-bold text-xl">${
      tree.name
    }</h2>
        <p>${tree.description.slice(0, 100)}...</p>
        <div class="flex justify-between items-center my-3">
          <h2 class="bg-[#CFF0DC] text-[#15803D] px-3 py-2 rounded-full">${
            tree.category
          }</h2>
          <p>৳ <span> ${tree.price} </span></p>
        </div>
        <div class="card-actions justify-end">
            <button id='${
              tree.id
            }' class="btn bg-[#15803D] text-white w-full rounded-full px-6 py-3 font-semibold transition-transform duration-300 hover:scale-110 hover:bg-green-500">Add to Card</button>
        </div>
      </div>
    </div>
`;
  });
  manageLoading(false);
};

/**
 * add to card
 */
let addToCard = [];
treeContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const title = e.target.parentNode.parentNode.children[0].innerText;
    const price =
      e.target.parentNode.parentNode.children[2].children[1].children[0]
        .innerText;
    const id = e.target.id;
    const checkQuantity = addToCard.find((item) => item.id == id);
    if (checkQuantity) {
      checkQuantity.quantity++;
    } else {
      addToCard.push({
        title: title,
        price: price,
        quantity: 1,
        id: id,
      });
    }
    displayCard(addToCard);
    alert(`${title} Added`);
  }
});

/**
 * display side card
 */
const displayCard = (card) => {
  cardContainer.innerHTML = "";
  const totalPrice = document.getElementById("totalPrice");
  let priceCount = 0;
  card.forEach((item) => {
    cardContainer.innerHTML += `
            <div class="p-3 bg-white shadow-lg rounded-lg text-xl mb-3 flex justify-between items-center"> 
              <div class="space-y-3">
                <h3 id="cardTitle" class="font-bold">${item.title}</h3>
                <p class="">৳ <span id="cardPrice">${item.price}</span> ✕ <span id="cardQuantity">${item.quantity}</span></p>
              </div>
              <div>
                <p onclick="cardItemDelete(${item.id})" class="text-xl cursor-pointer">✕</p>
              </div>
            </div>
            `;
    priceCount += Number(item.price * item.quantity);
  });
  totalPrice.innerText = priceCount;
};
/**
 * card delete
 */
const cardItemDelete = (cardId) => {
  console.log(cardId);
  addToCard.map((item, index) => {
    if (item.id == cardId) {
      addToCard.splice(index, 1);
      displayCard(addToCard);
    }
  });
};

categoriesData();
loadTreeData();
