const words = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "between", "need", "large", "often", "hand", "high", "place", "hold",
  "free", "real", "life", "few", "north", "open", "seem", "together", "next",
  "white", "children", "begin", "got", "walk", "example", "ease", "paper", "group",
  "always", "music", "those", "both", "mark", "book", "letter", "until", "mile",
  "river", "car", "feet", "care", "second", "enough", "plain", "girl", "usual",
  "young", "ready", "above", "ever", "red", "list", "though", "feel", "talk",
  "bird", "soon", "body", "dog", "family", "direct", "pose", "leave", "song",
  "measure", "door", "product", "black", "short", "number", "class", "wind",
  "question", "happen", "complete", "ship", "area", "half", "rock", "order",
  "fire", "south", "problem", "piece", "told", "knew", "pass", "since", "top",
  "whole", "king", "space", "heard", "best", "hour", "better", "during", "hundred",
  "remember", "step", "early", "power", "change", "brought", "close", "light",
  "follow", "turn", "move", "face", "door", "right", "boy", "old", "too",
];

export function generateWords(count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result;
}

export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  const minutes = timeInSeconds / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}
