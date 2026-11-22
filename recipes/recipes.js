const recipes = [
    {
        name: 'Sweet Potato Waffles',
        tags: ['Waffles', 'Sweet Potato', 'Side'],
        description: 'Savory waffles made with Sweet potato with a hint of Ginger',
        image: 'images/sweet-potato-waffle-md.jpg',
        rating: 4
    },
    {
        name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
        tags: ['Chicken', 'Entree'],
        description:
            'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
        image: 'images/escalopes-de-poulet-a-la-creme.webp',
        rating: 4.5
    },
    {
        name: 'Oven Roasted potato slices',
        tags: ['Potatoes', 'side'],
        description:
            'Easy and delicious oven roasted potatoes that go great with almost anything.',
        image: 'images/roasted-potatoes.webp',
        rating: 4
    },
    {
        name: 'Black Beans and Rice',
        tags: ['Southwest', 'entree'],
        description:
            'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
        image: 'images/black-beans-and-rice.jpg',
        rating: 3
    },
    {
        name: 'Chicken Curry',
        tags: ['chicken', 'entree', 'Indian'],
        description:
            'Quick and easy Chicken curry recipe made with easy to find ingredients.',
        image: 'images/chicken-curry.webp',
        rating: 5
    },
    {
        name: 'Chocolate Chip Cookies',
        tags: ['dessert'],
        description: 'Delicious soft chocolate chip cookies with coconut.',
        image: 'images/chocolate-chip-cookies.jpg',
        rating: 5
    },
    {
        name: 'Gooseberry cake with vanilla cream and crumble',
        tags: ['dessert', 'German'],
        description:
            "This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with crumble that's flavored with vanilla. A must have recipe for gooseberry lovers!!",
        image: 'images/german-gooseberry-cake.jpg',
        rating: 5
    },
    {
        name: 'Apple Crisp',
        tags: ['dessert'],
        description:
            "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
        image: 'images/apple-crisp.jpg',
        rating: 4
    }
];

const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('#recipe-search');
const recipeGrid = document.querySelector('.recipe-grid');

function createRecipeCard(recipe) {
    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.name;
    image.className = 'recipe-image';

    const category = document.createElement('p');
    category.className = 'category';
    category.textContent = recipe.tags
        .map((tag) => tag[0].toUpperCase() + tag.slice(1))
        .join(', ');

    const title = document.createElement('h2');
    title.className = 'recipe-title';
    title.textContent = recipe.name;

    const description = document.createElement('p');
    description.className = 'recipe-description';
    description.textContent = recipe.description;

    const rating = document.createElement('span');
    rating.className = 'rating';
    rating.setAttribute('role', 'img');
    rating.setAttribute('aria-label', `Rating: ${recipe.rating} out of 5 stars`);
    rating.textContent = '⭐'.repeat(Math.floor(recipe.rating)) +
        '☆'.repeat(5 - Math.floor(recipe.rating));

    const content = document.createElement('div');
    content.className = 'recipe-content';
    content.append(category, title, description, rating);

    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.append(image, content);
    return card;
}

function renderRecipes(recipeList) {
    if (recipeList.length === 0) {
        const message = document.createElement('p');
        message.className = 'no-recipes';
        message.textContent = 'No recipes found. Try a different name, description, or tag.';
        recipeGrid.replaceChildren(message);
        return;
    }

    recipeGrid.replaceChildren(...recipeList.map(createRecipeCard));
}

function showSearchResults(searchTerm) {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const matches = recipes
        .filter((recipe) =>
            recipe.name.toLowerCase().includes(normalizedTerm) ||
            recipe.description.toLowerCase().includes(normalizedTerm) ||
            recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedTerm))
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    renderRecipes(matches);
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showSearchResults(searchInput.value);
});

const randomIndex = Math.floor(Math.random() * recipes.length);
renderRecipes([recipes[randomIndex]]);
