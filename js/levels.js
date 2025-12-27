export const levels = [
  {
    title: "Food",
    subtitle: "Hmm… what should we eat?",
    exits: {
      E1: "McDo",
      E2: "Jollibee",
      E3: "Chowking"
    },
    dialogue: {
      E1: [
        // { who: "me", text: "Hmm… what should we eat?" },
        { who: "her", text: "McDo 🍟" },
        { who: "me", text: "Let’s eat there sometimes 😌" },
      ],

      E2: [
        // { who: "me", text: "I’m craving something…" },
        { who: "her", text: "Jollibee 🐝" },
        { who: "me", text: "Uy comfort food 💖" },
      ],

      E3: [
        // { who: "me", text: "Let’s try something different." },
        { who: "her", text: "Chowking 😎" },
        { who: "me", text: "Nice choice, I love Chinese food too 😉" },
      ]
    },
    logos: {
      E1: "assets/images/mcdo.png",
      E2: "assets/images/jabe.png",
      E3: "assets/images/chowking.png"
    },
    maze: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,'S',0,0,1,0,0,0,0,0,0,'E1',1],
    [1,1,1,0,1,0,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,0,1],
    [1,1,1,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,'E2',1,1,1,1,0,1,1,1,1,'E3',1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  },

  {
    title: "Drinks",
    subtitle: "Let’s get some drinks ✨",
    exits: {
      E1: "Starbucks",
      E2: "Chagee",
      E3: "Coco"
    },
     dialogue: {
      E1: [
        // { who: "me", text: "Coffee time?" },
        { who: "her", text: "Starbucks ☕" },
        { who: "me", text: "A comfy classic 💕" },
      ],

      E2: [
        // { who: "me", text: "Let’s try something new." },
        { who: "her", text: "Chagee 🍃" },
        { who: "me", text: "Ooo fancy ✨" },
      ],

      E3: [
        // { who: "me", text: "Sweet drinks today." },
        { who: "her", text: "Coco ☕" },
        { who: "me", text: "Sweet and fun 😁" },
      ]
    },
    logos: {
      E1: "assets/images/starbucks.png",
      E2: "assets/images/chagee.png",
      E3: "assets/images/coco.jpg"
    },
   maze: [
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,'S',0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,1,0,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,1,0,1,1,1,1],
  [1,0,1,0,0,0,0,1,0,0,0,'E3',1],
  [1,0,1,0,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,'E2',1],
  [1,1,1,0,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,'E1',1,1,1,1,0,1,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1]
]

  },

  {
    title: "Place",
    subtitle: "Where would you like to go? 🗺️",
    exits: {
      E1: "Mall",
      E2: "Beach",
      E3: "Park"
    },
    dialogue: {
      E1: [
        // { who: "me", text: "Where do you want to go?" },
        { who: "her", text: "Mall 🛍️" },
        { who: "me", text: "Could be fun to go together 🤩" },
      ],

      E2: [
        // { who: "me", text: "I’m thinking something chill." },
        { who: "her", text: "Beach 🌊" },
        { who: "me", text: "Beach sounds relaxing 🐚" },
      ],

      E3: [
        // { who: "me", text: "What about somewhere different?" },
        { who: "her", text: "Park 🏞️" },
        { who: "me", text: "That actually sounds really nice ☺️" },
      ]
    },
    logos: {
      E1: "assets/images/sm.png",
      E2: "assets/images/beach.jpg",
      E3: "assets/images/park.jpg"
    },
   maze: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,'S',0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,'E1',1],
    [1,0,1,1,1,1,1,1,0,1,1,1,1],
    [1,0,1,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,'E3',1],
    [1,'E2',1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  },

   {
    title: "Time",
    subtitle: "Which time do you prefer to go out?",
    exits: {
      E1: "Morning",
      E2: "Afternoon",
      E3: "Night"
    },
    dialogue: {
      E1: [
        { who: "her", text: "Morning ☀️" },
        { who: "me", text: "Mornings can be really nice 😊" },
      ],

      E2: [
        { who: "her", text: "Afternoon 🌤️" },
        { who: "me", text: "That’s a good time to go out 😊" },
      ],

      E3: [
        { who: "her", text: "Night 🌙" },
        { who: "me", text: "Night sounds chill 😊" },
      ]
    },
    logos: {
      E1: "assets/images/Day.jpg",
      E2: "assets/images/Afternoon.jpg",
      E3: "assets/images/Night.jpg"
    },
   maze: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,'S',0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,1,1],
      [1,0,1,1,0,1,1,1,0,1,0,1,1],
      [1,0,1,1,0,0,0,0,0,0,0,'E1',1],
      [1,0,1,1,0,1,1,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,0,1,1,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,0,0,0,0,0,1],
      [1,0,0,0,'E2',1,0,1,1,1,'E3',1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  }
];
