import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Jay',
      email: 'jay@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Kodego',
      email: 'kodego@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  books: [
    {
      // _id: '1',
      name: 'To Kill A Mockingbird',
      url: 'to-kill-a-mockingbird',
      genre: 'Southern Gothic',
      image: '/images/image1.jpg',
      price: 484,
      countInStock: 0,
      author: 'Harper Lee',
      rating: 4.27,
      numReviews: 10,
      description:
        "To Kill a Mockingbird is both a young girl's coming-of-age story and a darker drama about the roots and consequences of racism and prejudice, probing how good and evil can coexist within a single community or individual.",
    },
    {
      // _id: '2',
      name: 'The Great Gatsby',
      url: 'the-great-gatsby',
      genre: 'Tragedy',
      image: '/images/image2.jpg',
      price: 935,
      countInStock: 20,
      author: 'F. Scott Fitzgerald',
      rating: 2.93,
      numReviews: 8,
      description:
        'The Great Gatsby, Third novel by American author F. Scott Fitzgerald, published in 1925. Set in Jazz Age New York, it tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.',
    },
    {
      // _id: '3',
      name: '1 9 8 4',
      url: '1984',
      genre: 'Dystopia',
      image: '/images/image3.jpg',
      price: 935,
      countInStock: 15,
      author: 'George Orwell',
      rating: 4.19,
      numReviews: 9,
      description:
        "1984 is a dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother. 'Big Brother' controls every aspect of people's lives.",
    },
    {
      // _id: '4',
      name: 'The Adventures of Huckleberry Finn',
      url: 'the-adventures-of-huckleberry-finn',
      genre: 'Picaresque novel',
      image: '/images/image4.jpg',
      price: 489,
      countInStock: 5,
      author: 'Mark Twain',
      rating: 4.93,
      numReviews: 18,
      description:
        "Mark Twain's classic The Adventures of Huckleberry Finn (1884) is told from the point of view of Huck Finn, a barely literate teen who fakes his own death to escape his abusive, drunken father. He encounters a runaway slave named Jim, and the two embark on a raft journey down the Mississippi River.",
    },
  ],
};
export default data;
