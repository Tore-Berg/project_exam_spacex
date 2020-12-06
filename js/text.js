//Quotes from Elon Musk. Credits: www.inc.com
let quotes = [
  "When something is important enough, you do it even if the odds are not in your favor.",
  "Some people don't like change, but you need to embrace change if the alternative is disaster.",
  "Failure is an option here. If things are not failing, you are not innovating enough.",
  "Persistence is very important. You should not give up unless you are forced to give up.",
  "There's a tremendous bias against taking risks. Everyone is trying to optimize their ass-covering.",
  "It's OK to have your eggs in one basket as long as you control what happens to that basket.",
  "Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.",
  "I don't think it's a good idea to plan to sell a company.",
  "It is a mistake to hire huge numbers of people to get a complicated job done. Numbers will never compensate for talent in getting the right answer (two people who don't know something are no better than one), will tend to slow down progress, and will make the task incredibly expensive.",
  "A company is a group organized to create a product or service, and it is only as good as its people and how excited they are about creating. I do want to recognize a ton of super-talented people. I just happen to be the face of the companies.",
  "People work better when they know what the goal is and why. It is important that people look forward to coming to work in the morning and enjoy working.",
  "If you're co-founder or CEO, you have to do all kinds of tasks you might not want to do... If you don't do your chores, the company won't succeed... No task is too menial.",
  "I say something, and then it usually happens. Maybe not on schedule, but it usually happens.",
  "I do think there is a lot of potential if you have a compelling product and people are willing to pay a premium for that. I think that is what Apple has shown. You can buy a much cheaper cell phone or laptop, but Apple's product is so much better than the alternative, and people are willing to pay that premium.",
  "I don't spend my time pontificating about high-concept things; I spend my time solving engineering and manufacturing problems.",
  "I always invest my own money in the companies that I create. I don't believe in the whole thing of just using other people's money. I don't think that's right. I'm not going to ask other people to invest in something if I'm not prepared to do so myself.",
  "I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better.",
  "The path to the CEO's office should not be through the CFO's office, and it should not be through the marketing department. It needs to be through engineering and design.",
];

let count = 0;
let i = 0;
let currentQuote = "";
let letter = "";

const autoWriteQuotes = () => {
  if (count === quotes.length) {
    count = 0;
  }
  currentQuote = quotes[count];
  letter = currentQuote.slice(0, ++i);

  document.querySelector("#quotes").innerHTML = `<p>${letter}</p>`;

  if (letter.length === currentQuote.length) {
    count++;
    i = 0;
  }

  setTimeout(autoWriteQuotes, 100);
}
autoWriteQuotes();
