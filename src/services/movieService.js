const movies = [
    {
        _id: 1,
        title: 'Mission: Impossible - Dead Reckoning Part One',
        genre: 'Action',
        director: 'Christopher McQuarrie',
        year: '2023',
        imageUrl: 'img/mission-impossible-2023.jpeg',
        rating: 4,
        description: `Ethan Hunt (Tom Cruise) and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission -- not even the lives of those he cares about most.`
    },
    {
        _id: 2,
        title: 'Jurassic World Dominion',
        genre: 'Action',
        director: 'Colin Trevorrow',
        year: '2022',
        imageUrl: 'img/jurassic-world-dominion.jpeg',
        rating: 3,
        description: `Dominion takes place four years after Isla Nublar has been destroyed. Dinosaurs now live--and hunt--alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures.`
    },
    {
        _id: 3,
        title: 'The Garfield Movie',
        genre: 'Animation',
        director: 'Mark Dindal',
        year: '2024',
        imageUrl: 'img/the-garfield-movie.jpeg',
        rating: 0,
        description: 'Garfield has an unexpected reunion with his long-lost father, a scruffy street cat who draws him into a high-stakes heist.'
    },
];

exports.getAllMovies = () => {
    return movies.slice();
};

exports.addMovie = (movieInfo) => {
    movieInfo._id = movies.length == 0 ? 1 : movies[movies.length - 1]._id + 1; 
    movies.push(movieInfo);
}