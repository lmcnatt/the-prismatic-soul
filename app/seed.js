const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const TABLE_NAME = process.env.TABLE_NAME || "prismatic-soul";
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

const items = [
  {
    entityType: "CHARACTER", entityId: "silas",
    name: "Silas",
    title: "The Keeper of the Woods",
    role: "The Cosmic Gardener — he tends to the Roots of the multiverse",
    alignment: "True Neutral",
    origin: "He hails from Zylphara, a long-lost dominion of singing glass towers and light-woven bridges. It fell not because they were evil, but because they forgot to tend to the roots of their own existence.",
    personality: "Kindly, grandfatherly, maddeningly slow. Possesses infinite Intelligence but lacks Action. He views the end of worlds as a natural changing of seasons.",
    description: "Silas is the Keeper of the Woods Between Worlds — the ancient gardener who maintains the roots of reality across every plane. He teaches that Intelligence is not a weapon to be swung, but a seed to be planted.",
    appearance: "A tall, lean elderly man with kind features framed by wild white hair. His beard is long, often physically woven into the moss of the forest floor. He is always barefoot. His eyes have no fixed color — they reflect the nearest pool.",
    imageKey: "Silas.png",
    currentStatus: "Away on a Vigil, singing the souls of the dying star Aethelos home",
    quotes: [
      "You worry that the sun is setting in Everden, Little Bird. But the sun must set so the stars may breathe.",
      "The leaves fall, little bird. It is the way of things. New leaves will grow in another eon. Why rush?",
      "I could tell you the way, yes. But then you would only know the path, not the walking of it."
    ]
  },
  {
    entityType: "CHARACTER", entityId: "felicity",
    name: "Felicity",
    title: "Horizon Walker Ranger of Humblewood",
    role: "The Action to Silas's Intelligence — she is the guide who sees the Splendor within the heroes",
    alignment: "Chaotic Good",
    origin: "A Horizon Walker Ranger from Humblewood (Luma race), now trapped in Oriven in the form of a common House Wren.",
    personality: "Sassy, impatient, fiercely protective. She possesses a Ranger sight that allows her to see the Splendor within the PCs.",
    description: "Felicity crashed into Oriven when the cosmic currents went haywire during Silas's Vigil. Stripped of her power and form, she appears as a tiny wren — but she is the one who recognizes the heroes' true potential.",
    currentForm: "Common House Wren (in Oriven)",
    motivation: "Desperate to save Humblewood (Everden) from the fires caused by Splendor drain",
    imageKey: "Felicity.png",
    currentStatus: "Trapped in Oriven, searching for heroes to save Humblewood",
    quotes: [
      "Stop staring! My center of gravity is completely different! I usually have thumbs!",
      "Your form is terrible. You swing that hammer like a goblin with a palsy. But... I saw it. When you fight... the grey goes away."
    ]
  },
  {
    entityType: "CHARACTER", entityId: "vakos",
    name: "Vakos",
    title: "The Eclipse of Gods",
    role: "The True BBEG — The Anti-Creator, a Black Hole of divinity",
    alignment: "Neutral Evil",
    concept: "Once Prince Valen, a mortal man from a world that died of natural entropy. He refused to let the light die and consumed forbidden Splendor to survive. It turned him into a living void.",
    philosophy: "Believes Godhood is achieved by consuming the multiverse's Splendor. He wants to be the one true god, fearfully worshipped and infinitely powerful.",
    description: "A silhouette of Vantablack — pure void in humanoid form. He has no features. Inside his chest, faint screaming faces and dim stars are visible: the gods and Splendor he has consumed, trapped in his void.",
    imageKey: "Vakos.png",
    currentStatus: "Building the Throne of Lenses to focus all Splendor into himself",
    visuals: "He casts no shadow; he eats shadows. When he speaks, it sounds like a thousand voices in unison — the voices of the gods he has killed."
  },
  {
    entityType: "CHARACTER", entityId: "kyriel",
    name: "Kyriel",
    title: "The Illuminator",
    role: "The Lieutenant — The False Savior and Architect of Stasis",
    alignment: "Lawful Evil",
    concept: "Once a Solar Angel in a world that destroyed itself through war. He prayed for the Creator to intervene, but the Creator remained silent, respecting Agency. Broken by the silence, he found Vakos.",
    philosophy: "Believes Free Will is a mistake. Wants to use Vakos to wipe the slate clean and build a perfect, static universe of pure Order where nothing ever changes and no one ever disobeys.",
    description: "A Solar Angel in blinding golden armor. Up close, the gold is rusted, flaking, with holes. His wings are dark and murky with chunks of feathers missing. He speaks in a calm, resonant monotone.",
    imageKey: "Kyriel.png",
    currentStatus: "Commands the Splendor removal on the front lines — the players believe he is the BBEG for most of the campaign",
    fate: "He believes he is in charge and is using Vakos. When he finally realizes he is not the master but food for the master, it will be too late.",
    visuals: "When he uses power, the light doesn't warm you — it crystallizes you. His version of Splendor is Stasis."
  },
  {
    entityType: "CHARACTER", entityId: "vexia",
    name: "Vexia",
    title: "The Discordant",
    role: "The Tertiary Villain — Agent of Entropy and Archfey of Ruin",
    alignment: "Chaotic Evil",
    concept: "An Archfey who became obsessed with finding a new color or sound that could surpass the Creator's work. She stared into the Void and it stared back, granting her the power to Unravel Splendor.",
    philosophy: "Bored by the Creator's order. Wants Sensation — to hear the sound a world makes when it snaps. She treats the multiverse as her personal toy box.",
    description: "A shapeshifting Elven woman with fire-red hair who vibrates with chaotic energy. She follows Vakos because he is the biggest predator in the ocean, and swimming in his wake guarantees she gets to eat the scraps.",
    imageKey: "Vexia.png",
    currentStatus: "The Hunter/Enforcer, sent to deal with heroes and create chaos — and Kyriel's rival",
    visuals: "Shapeshifting and chaotic. She can take the song of a living thing and play it backwards, turning them into abominations."
  },
  {
    entityType: "CHARACTER", entityId: "faelar",
    name: "Faelar",
    title: "Wizard of the Keep",
    role: "Powerful Wizard and PC Mentor in Oriven",
    alignment: "Neutral Good",
    description: "Faelar has stared into the weaving of magic for sixty years. He detects the Rift tearing through the Wilderness and sends the party to investigate, validating the cosmic threat.",
    dialogue: [
      "I've stared into the weaving of magic for sixty years, and I have never seen a knot like this. There is a static coming from the Wilderness. It's not just necromancy or chaotic magic; it's like the world is being erased in patches.",
      "I cast a detection spell this morning, and it screamed. Something is tearing the sky above the ravine. Go there. Investigate."
    ]
  },
  {
    entityType: "WORLD", entityId: "oriven",
    name: "Oriven",
    description: "The starting world — a standard high-fantasy realm containing The Keep on the Borderlands and The Caves of Chaos in the kingdom of Cavalor. The party begins their journey here, encountering the interference that heralds Vakos's assault on the multiverse.",
    status: "Active — under Interference from the Chaos Bell",
    features: ["The Keep on the Borderlands", "The Caves of Chaos", "Kingdom of Cavalor", "The Waste"]
  },
  {
    entityType: "WORLD", entityId: "everden",
    name: "Everden (Humblewood)",
    description: "Felicity's home world, a realm of birdfolk and humblefolk living in harmony with ancient forests. Currently suffering from Splendor drain manifested as raging elemental fire — the Aspect of Fire threatens to consume everything.",
    splendorName: "The Great Rhythm",
    status: "Suffering — Splendor drain causing the Aspect of Fire"
  },
  {
    entityType: "WORLD", entityId: "zylphara",
    name: "Zylphara",
    description: "Silas's home world — a lost dominion of crystal spires, singing glass towers, and light-woven bridges. It destroyed itself by hoarding Splendor, letting its brilliance burn too bright until the world shattered under the weight of its own glory.",
    status: "Destroyed — consumed by its own unchecked Splendor"
  },
  {
    entityType: "WORLD", entityId: "woods",
    name: "The Woods Between Worlds",
    description: "A timeless, infinite forest hub containing shimmering pools that lead to different realities. The atmosphere is sleepy and apathetic — those who linger too long may lose their will to leave. Silas tends this garden as the Cosmic Gardener.",
    atmosphere: "Sleepy, dreamlike, and apathetic. Time moves differently here — a single breath of the Woods could be days or weeks in mortal time.",
    status: "Eternal — the hub of the multiverse"
  },
  {
    entityType: "WORLD", entityId: "aethelos",
    name: "Aethelos",
    description: "A distant star currently dying of natural causes — not by evil, but by old age. Silas has traveled to the Far Orchard of the Woods to perform The Vigil, singing the souls of this dying world back into the Splendor so they can return to the Creator.",
    status: "Dying — natural entropy, Silas performing the Vigil"
  }
];

async function seed() {
  console.log(`Seeding ${items.length} items into ${TABLE_NAME}...`);
  for (const item of items) {
    await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    console.log(`  ✓ ${item.entityType}/${item.entityId} — ${item.name}`);
  }
  console.log("Done.");
}

seed().catch(err => { console.error("Seed failed:", err); process.exit(1); });
