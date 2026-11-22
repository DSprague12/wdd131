const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Bechler Falls in Yellowstone",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "A trail through Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Denanda Falls along the trail",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Rapids along the Coffee Pot trail",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's Inn. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "The trail around Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, then right onto Twin Butte Road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const searchInput = document.querySelector("#search");
const hikeContainer = document.querySelector("#hike-container");
const searchForm = document.querySelector("#search-form");

function getDistance(hike) {
  return Number.parseFloat(hike.distance);
}

function createHikeCard(hike) {
  const title = document.createElement("h2");
  title.textContent = hike.name;

  const description = document.createElement("p");
  description.textContent = hike.description;

  const rating = document.createElement("span");
  rating.setAttribute("role", "img");
  rating.setAttribute("aria-label", `${hike.difficulty} out of 5 difficulty`);
  rating.textContent =
    "🥾".repeat(hike.difficulty) + "▫️".repeat(5 - hike.difficulty);

  const card = document.createElement("div");
  hike.tags.forEach((tag) => {
    const tagButton = document.createElement("button");
    tagButton.type = "button";
    tagButton.textContent = tag;
    tagButton.addEventListener("click", () => {
      searchInput.value = tag;
      showSearchResults(tag);
    });
    card.append(tagButton);
  });

  const difficulty = document.createElement("p");
  difficulty.append("Difficulty: ", rating);
  card.prepend(title);
  card.append(description, difficulty);
  return card;
}

function renderHikes(hikeList) {
  if (hikeList.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.textContent = "No hikes found. Try a different name, place, or tag.";
    hikeContainer.replaceChildren(emptyState);
  } else {
    hikeContainer.replaceChildren(...hikeList.map(createHikeCard));
  }
}

function showSearchResults(searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  const matches = hikes
    .filter((hike) => {
      return (
        hike.name.toLowerCase().includes(normalizedTerm) ||
        hike.description.toLowerCase().includes(normalizedTerm) ||
        hike.tags.some((tag) => tag.toLowerCase().includes(normalizedTerm))
      );
    })
    .sort((a, b) => getDistance(a) - getDistance(b));

  renderHikes(matches);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showSearchResults(searchInput.value);
});

const randomIndex = Math.floor(Math.random() * hikes.length);
renderHikes([hikes[randomIndex]]);
