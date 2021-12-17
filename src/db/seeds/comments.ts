import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('comments').truncate();

  // Inserts seed entries
  await knex('comments').insert([
    //   id: 1,
    {
      productRequestsId: 1,
      content:
        'Awesome idea! Trying to find framework-specific projects within the hubs can be tedious',
      replyingTo: '',
      userId: 1,
    },
    //   id: 2,
    {
      productRequestsId: 1,
      content:
        'Please use fun, color-coded labels to easily identify them at a glance',
      replyingTo: '',
      userId: 2,
    },
    //   id: 3,
    {
      productRequestsId: 2,
      content:
        'Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.',
      replyingTo: '',
      userId: 3,
    },
    //   id: 4,
    {
      productRequestsId: 2,
      content:
        'Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.',
      replyingTo: '',
      userId: 5,
    },
    //   replay to 4: replays
    {
      productRequestsId: 2,
      content:
        "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
      replyingTo: 'hummingbird1',
      userId: 5,
    },
    {
      productRequestsId: 2,
      content:
        "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
      replyingTo: 'annev1990',
      userId: 6,
    },
    //   id: 5,
    {
      productRequestsId: 3,
      content:
        "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
      replyingTo: '',
      userId: 7,
    },
    // id: 6
    {
      productRequestsId: 4,
      content:
        "Right now, there is no ability to add images while giving feedback which isn't ideal because I have to use another app to show what I mean",
      replyingTo: '',
      userId: 8,
    },
    // id: 7
    {
      productRequestsId: 4,
      content:
        "Yes I'd like to see this as well. Sometimes I want to add a short video or gif to explain the site's behavior..",
      replyingTo: '',
      userId: 9,
    },
    // id: 8
    {
      productRequestsId: 5,
      content:
        'I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?',
      replyingTo: '',
      userId: 9,
    },
    // id: 8: replays
    {
      productRequestsId: 5,
      content:
        "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
      replyingTo: 'arlen_the_marlin',
      userId: 11,
    },
    // id: 9
    {
      productRequestsId: 5,
      content:
        "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
      replyingTo: '',
      userId: 12,
    },
    // id: 10
    {
      productRequestsId: 7,
      content:
        'This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.',
      replyingTo: '',
      userId: 10,
    },
    // id: 11
    {
      productRequestsId: 7,
      content:
        "Yeah, this would be really good. I'd love to see deeper insights into my code!",
      replyingTo: '',
      userId: 12,
    },
    // id: 12
    {
      productRequestsId: 8,
      content:
        "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
      replyingTo: '',
      userId: 7,
    },
    // id: 13
    {
      productRequestsId: 9,
      content:
        "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
      replyingTo: '',
      userId: 6,
    },
    // id: 14
    {
      productRequestsId: 10,
      content:
        "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
      replyingTo: '',
      userId: 1,
    },
    // id: 15
    {
      productRequestsId: 12,
      content:
        "I'd love to see this! It always makes me so happy to see little details like these on websites.",
      replyingTo: '',
      userId: 10,
    },
    // id: 15: replays
    {
      productRequestsId: 12,
      content:
        "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
      replyingTo: 'arlen_the_marlin',
      userId: 1,
    },
  ]);
}
