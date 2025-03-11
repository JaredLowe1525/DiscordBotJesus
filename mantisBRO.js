const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Create the client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Read Bible verses from the text file
const getRandomBibleVerses = () => {
  try {
    const bibleFilePath = path.join(__dirname, 'bible.txt'); // Path to your bible.txt file
    const bibleContent = fs.readFileSync(bibleFilePath, 'utf-8');
    const verses = bibleContent.split('\n').filter(Boolean); // Split file by line, remove empty lines
    let versesResult = '';
    for (let i = 0; i < 4; i++) {
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      versesResult += randomVerse + '\n';
    }
    return versesResult;
  } catch (err) {
    console.error('Error reading Bible file:', err);
    return 'There was an error fetching Bible verses. Please try again later.';
  }
};

// Read motivational quotes from a quotes.txt file
const getRandomQuotes = () => {
  try {
    const quotesFilePath = path.join(__dirname, 'quotes.txt'); // Path to your quotes.txt file
    const quotesContent = fs.readFileSync(quotesFilePath, 'utf-8');
    const quotes = quotesContent.split('\n').filter(Boolean); // Split file by line, remove empty lines
    let quotesResult = '';
    for (let i = 0; i < 2; i++) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quotesResult += randomQuote + '\n';
    }
    return quotesResult;
  } catch (err) {
    console.error('Error reading Quotes file:', err);
    return 'There was an error fetching a quote. Please try again later.';
  }
};

// Bot ready event
client.once('ready', () => {
  console.log('Mantis the Baptist is online and ready to spread wisdom!');
});

// Message event handler
client.on('messageCreate', message => {
  if (message.author.bot) return;

  // Command to fetch Bible verses
  if (message.content.trim() === '!Jesus') {
    const randomVerses = getRandomBibleVerses();
    message.channel.send(randomVerses);
  }

  // Command to fetch motivational quote
  if (message.content.trim() === '!mot') {
    const randomQuote = getRandomQuotes();
    message.channel.send(randomQuote);
  }
});


// Log in to Discord with your bot token
client.login('your token here'); // Replace with your bot's token
