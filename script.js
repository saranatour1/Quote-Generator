//get Quotes From API
// Asysncrounus fetch request within a try catch statment
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const twiiterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
//show that a proccess is working

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  //pick a random quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if the author is null, and change that to unknown
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  //check the quote length to determine the styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch Error here
  }
}
//tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}
newQuoteBtn.addEventListener("click", newQuote);
twiiterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();

// to get an item from a local array, you will have to comment out lines 11-20
//and 3 and change line 7 to your local file
