const treeContainer = document.getElementById("trees-container");
const categoriesContainer = document.getElementById("categorie-container");

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
  categoriesContainer.innerHTM = "";
  categories.forEach((categorie) => {
    categoriesContainer.innerHTML += `
        <li class="text-lg hover:bg-[#15803D] hover:text-white p-3 rounded-md">${categorie.category_name}</li>
        `;
  });
};
categoriesData();

/**
 * dispaly main tree
 */
const displayTreeContainer = (trees) => {
  //   console.log(trees);
  treeContainer.innerHTML = "";
  trees.forEach((tree) => {
    treeContainer.innerHTML += `
                <div class="card bg-base-100  shadow-sm p-4">
                    <figure>
                        <img class=" w-[300px] h-[150px] object-cover bg-center " src="${tree.image}"
                            alt="Shoes" />
                    </figure>
                    <div class=" mt-3">
                        <h2 class="">${tree.name}</h2>
                        <p>${tree.description}</p>
                        <div class="flex justify-between items-center my-3">
                            <h2 class="bg-[#CFF0DC] text-[#15803D] px-3 py-2 rounded-full">${tree.category}</h2>
                            <p>${tree.price}</p>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn bg-[#15803D] text-white w-full rounded-full">Add to Card</button>
                        </div>
                    </div>
                </div>
  `;
  });
};

loadTreeData();
