const treeContainer = document.getElementById("trees-container");
const categoriesContainer = document.getElementById("categorie-container");
let cardContainer = document.getElementById("cardContainer");

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
const displayCategoriesData = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((trees) => displayTreeContainer(trees.plants));
};

categoriesContainer.addEventListener("click", (e) => {
  const allli = document.querySelectorAll("li");
  allli.forEach((li) => {
    li.classList.remove("active");
  });
  if (e.target.localName === "li") {
    e.target.classList.add("active");
    displayCategoriesData(e.target.id);
  }
});
/**
 * dispaly main tree
 */
const displayTreeContainer = (trees) => {
  treeContainer.innerHTML = "";
  trees.forEach((tree) => {
    treeContainer.innerHTML += `
    <div class="card bg-base-100  shadow-sm p-4">
      <figure>
      <img class=" w-[300px] h-[150px] object-cover bg-center " src="${
        tree.image
      }"
      alt="Shoes" />
      </figure>
      <div class=" mt-3">
        <h2 onclick="my_modal_5.showModal() class="font-bold text-xl">${
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
            }' class="btn bg-[#15803D] text-white w-full rounded-full">Add to Card</button>
        </div>
      </div>
    </div>
`;
  });
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
            <div class="p-3 bg-[#CFF0DC] rounded-lg text-xl mb-3 flex justify-between items-center"> 
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
