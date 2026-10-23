const articles = [
    {
        id: 1,
        title: 'Septimus Heap Book One: Magyk',
        date: 'July 5, 2022',
        description:
            'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
        imgAlt: 'Book cover for Septimus Heap 1',
        ages: '10-14',
        genre: 'Fantasy',
        stars: '⭐⭐⭐⭐'
    },
    {
        id: 2,
        title: 'Magnus Chase Book One: Sword of Summer',
        date: 'December 12, 2021',
        description:
            'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
        imgSrc:
            'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
        imgAlt: 'Book cover for Magnus Chase 1',
        ages: '12-16',
        genre: 'Fantasy',
        stars: '⭐⭐⭐⭐'
    },
    {
        id: 3,
        title: 'Belgariad Book One: Pawn of Prophecy',
        date: 'Feb 12, 2022',
        description:
            "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
        imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
        imgAlt: 'Book cover for Pawn of Prophecy',
        ages: '12-16',
        genre: 'Fantasy',
        stars: '⭐⭐⭐⭐⭐'
    }
];

const articleList = document.querySelector('#articles');

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function createArticle(book) {
    const article = createElement('article', 'book-post');
    const titleId = `book-title-${book.id}`;
    article.setAttribute('aria-labelledby', titleId);

    const metadata = createElement('aside', 'book-meta');
    metadata.setAttribute('aria-label', 'Book details');
    const details = createElement('dl');
    const fields = [
        ['Published', book.date],
        ['Recommended age', book.ages],
        ['Genre', book.genre]
    ];

    fields.forEach(([label, value]) => {
        const row = createElement('div');
        row.append(createElement('dt', '', label), createElement('dd', '', value));
        details.append(row);
    });

    const ratingRow = createElement('div');
    const rating = createElement('dd', 'rating', book.stars);
    rating.setAttribute('aria-label', `${book.stars.length} out of 5 stars`);
    ratingRow.append(createElement('dt', '', 'Rating'), rating);
    details.append(ratingRow);
    metadata.append(details);

    const content = createElement('div', 'book-content');
    const title = createElement('h2', '', book.title);
    title.id = titleId;

    const figure = createElement('figure');
    const cover = createElement('img', 'cover');
    cover.src = book.imgSrc;
    cover.alt = book.imgAlt;
    const caption = createElement('figcaption', '', book.title);
    figure.append(cover, caption);

    const description = createElement('p', 'description', book.description);
    content.append(title, figure, description);
    article.append(metadata, content);

    return article;
}

articles.forEach((book) => articleList.append(createArticle(book)));
