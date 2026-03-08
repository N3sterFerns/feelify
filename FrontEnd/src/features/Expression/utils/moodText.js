export const moodTextMap = {
  happy: [
    "Feeling great 😄",
    "You're in a good vibe",
    "Looking cheerful",
    "You seem energetic",
    "Nice positive mood"
  ],

  sad: [
    "A bit low today",
    "Feeling thoughtful",
    "Looks like a quiet moment",
    "A calm mood",
    "Taking it slow"
  ],

  surprised: [
    "Something caught your attention",
    "That was unexpected!",
    "Looking curious",
    "Eyes wide open!",
    "Something interesting happening"
  ],

  angry: [
    "A bit intense right now",
    "Strong energy detected",
    "Looking serious",
    "Focused and determined",
    "Powerful mood"
  ],

  neutral: [
    "Feeling balanced",
    "Chill mood detected",
    "Cool and relaxed",
    "Focused and calm",
    "Just vibing"
  ]
};


export function getRandomMoodText(emotion) {
  const texts = moodTextMap[emotion] || ["Reading your vibe..."];
  return texts[Math.floor(Math.random() * texts.length)];
}