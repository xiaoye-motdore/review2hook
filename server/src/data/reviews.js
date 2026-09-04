// Data-fetching layer.
// For now this returns hardcoded mock reviews for any ASIN.
// Later this should call an actual Amazon review source (API or scraper)
// and key results by the real ASIN.

const MOCK_PRODUCT = {
  asin: "B0MOCKASIN1",
  title: "Fiskars-Style Bypass Garden Pruning Shears, 8-Inch",
};

const MOCK_REVIEWS = [
  { id: 1, rating: 2, text: "The blade went dull after only two weeks of light use on rose bushes. I have to sharpen it constantly, which is annoying for something I just bought." },
  { id: 2, rating: 5, text: "Cuts through thick branches like butter. The ergonomic handle doesn't hurt my hand even after an hour of pruning." },
  { id: 3, rating: 1, text: "The spring mechanism popped out the first day I used it and I couldn't find the tiny part in the grass. Total waste of money." },
  { id: 4, rating: 3, text: "Decent shears but the safety lock is stiff and hard to flip with one hand, especially when my hands are cold." },
  { id: 5, rating: 4, text: "Good grip and comfortable, but they started rusting after just a few weeks even though I dried them off each time." },
  { id: 6, rating: 2, text: "My hand cramps up after 15 minutes because the handle is too small for my grip size. Wish there was a larger option." },
  { id: 7, rating: 5, text: "Perfect for my rose garden. Clean cuts every time and the non-stick coating means sap doesn't build up on the blade." },
  { id: 8, rating: 1, text: "Blade was already loose out of the box, wobbles side to side. Feels cheaply made despite the price." },
  { id: 9, rating: 3, text: "Works fine on thin stems but really struggles with anything thicker than a pencil. Had to switch to loppers." },
  { id: 10, rating: 2, text: "The sap and resin gunk up the blade so badly that after one afternoon of pruning it barely closes anymore." },
  { id: 11, rating: 4, text: "Sharp out of the box and the color is bright enough that I stopped losing it in the flower beds." },
  { id: 12, rating: 1, text: "Broke clean in half after three uses trying to cut a branch that wasn't even that thick. Returned it immediately." },
  { id: 13, rating: 5, text: "Best pruners I've owned. The bypass blades give a clean cut that doesn't crush the stem like my old anvil pruners did." },
  { id: 14, rating: 2, text: "Handle grip started peeling and getting sticky after being left in a shed all summer. Cheap material." },
  { id: 15, rating: 3, text: "The lock mechanism is confusing, I never know if it's actually locked or not, and it's popped open in my bag twice." },
  { id: 16, rating: 1, text: "Rusted within a week of normal outdoor storage. I expected better rust resistance for a gardening tool." },
  { id: 17, rating: 4, text: "Lightweight and easy to carry around the yard all day. My wrist doesn't get tired like with my old heavier pair." },
  { id: 18, rating: 2, text: "Blade dulls fast on woody stems, I'm sharpening it every other week which is more maintenance than I signed up for." },
  { id: 19, rating: 5, text: "The spring-loaded action really reduces hand fatigue, I was able to prune my whole hedge without my hand cramping." },
  { id: 20, rating: 1, text: "One of the handles cracked at the hinge after a month. Doesn't feel durable enough for regular garden work." },
  { id: 21, rating: 3, text: "Fine for small jobs but the blade gap lets thin stems slip through instead of getting cut cleanly." },
  { id: 22, rating: 2, text: "Sap buildup is a real problem, the blades get so sticky and gunky that cutting becomes a struggle halfway through a session." },
  { id: 23, rating: 4, text: "Comfortable non-slip grip even when my hands are sweaty from working in the heat. Solid clean cuts on rose stems." },
  { id: 24, rating: 1, text: "The tiny screw holding the blades together fell out and got lost. Now the shears are basically useless." },
  { id: 25, rating: 5, text: "Sharp, sturdy, and the safety catch is easy to use one-handed once you get used to it. No complaints." },
  { id: 26, rating: 2, text: "Started getting rust spots on the blade within days, even though I store it in a dry garage." },
  { id: 27, rating: 3, text: "The handles are a bit too small for larger hands, my palm gets sore pinching them for long pruning sessions." },
  { id: 28, rating: 1, text: "Blade misaligned out of the box so it pinches stems instead of cutting them cleanly. Frustrating for a new tool." },
  { id: 29, rating: 4, text: "Great for everyday trimming, though thicker deadwood branches are still a struggle and I need loppers for those." },
  { id: 30, rating: 2, text: "Grip material started to peel off after a couple months of regular use, leaves residue on my hands now." },
];

export function getProductInfo(asin) {
  return { ...MOCK_PRODUCT, asin };
}

export async function fetchReviewsForAsin(asin) {
  // Mock async data source — swap this out for a real Amazon
  // review-fetching integration (API or scraper) later.
  return MOCK_REVIEWS.map((r) => ({ ...r, asin }));
}
