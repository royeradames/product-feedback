import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').truncate();

  // Inserts seed entries
  await knex('users').insert([
    // 1
    {
      image: './assets/user-images/image-suzanne.jpg',
      name: 'Suzanne Chang',
      username: 'upbeat1811',
    },
    // 2
    {
      image: './assets/user-images/image-thomas.jpg',
      name: 'Thomas Hood',
      username: 'brawnybrave',
    },
    // 3
    {
      image: './assets/user-images/image-elijah.jpg',
      name: 'Elijah Moss',
      username: 'hexagon.bestagon',
    },
    // 4
    {
      image: './assets/user-images/image-james.jpg',
      name: 'James Skinner',
      username: 'hummingbird1',
    },
    // 5
    {
      image: './assets/user-images/image-anne.jpg',
      name: 'Anne Valentine',
      username: 'annev1990',
    },
    // 6
    {
      image: './assets/user-images/image-ryan.jpg',
      name: 'Ryan Welles',
      username: 'voyager.344',
    },
    // 7
    {
      image: './assets/user-images/image-george.jpg',
      name: 'George Partridge',
      username: 'soccerviewer8',
    },
    // 8
    {
      image: './assets/user-images/image-javier.jpg',
      name: 'Javier Pollard',
      username: 'warlikeduke',
    },
    // 9
    {
      image: './assets/user-images/image-roxanne.jpg',
      name: 'Roxanne Travis',
      username: 'peppersprime32',
    },
    // 10
    {
      image: './assets/user-images/image-victoria.jpg',
      name: 'Victoria Mejia',
      username: 'arlen_the_marlin',
    },
    // 11
    {
      image: './assets/user-images/image-zena.jpg',
      name: 'Zena Kelley',
      username: 'velvetround',
    },
    // 12
    {
      image: './assets/user-images/image-jackson.jpg',
      name: 'Jackson Barker',
      username: 'countryspirit',
    },
  ]);
}
