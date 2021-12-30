import {
  anyCharBetween,
  anyOf,
  anyCharOfThese,
  anyCharButThese,
  sequenceOf,
  shortestSequenceOf,
  optional,
  DIGIT,
  LETTER_OR_DIGIT,
  WHITE_SPACE,
  WORD_BOUNDARY,
  NOT_DIGIT,
  NOT_LETTER_OR_DIGIT,
  NOT_WHITE_SPACE,
  NOT_WORD_BOUNDARY,
  ANY_CHAR,
  regexInLongerText,
  regexWholeText,
} from "./main";

///////////////////////////////////////////////////////////////////////////////
///          Find all Phone Numbers in a Long Text         (Test #1)        ///
///////////////////////////////////////////////////////////////////////////////

console.log("Find all Phone Numbers in a Long Text  (Test #1)");

const long_text = `
  my phone number is 054-9876543.
  my friend's phone number's 054 1234-567;
  she is 23 years old.
  also check out (054) 5831 325 it's great!
`;

const phonePattern = regexInLongerText(
  anyOf(sequenceOf(3, DIGIT), ["(", sequenceOf(3, DIGIT), ")"]),
  optional(anyOf(" ", "-")),
  sequenceOf(4, DIGIT),
  optional(anyOf(" ", "-")),
  sequenceOf(3, DIGIT)
);

console.log("final regex:", phonePattern);
console.log('searching in this text: "', long_text, '"');
long_text.match(phonePattern)?.forEach((number) => {
  console.log("👉", number);
});
console.log();

///////////////////////////////////////////////////////////////////////////////
///          Validate Email Addresses from a User          (Test #2)        ///
///////////////////////////////////////////////////////////////////////////////

console.log("Validate Email Addresses from a User  (Test #2) ");

const emailValidaror = regexWholeText(
  sequenceOf("at-least-one", LETTER_OR_DIGIT),
  sequenceOf("zero-or-more", ".", sequenceOf("at-least-one", LETTER_OR_DIGIT)),
  "@",
  sequenceOf("at-least-one", LETTER_OR_DIGIT),
  sequenceOf("at-least-one", ".", sequenceOf("at-least-one", LETTER_OR_DIGIT))
);

const addressToTest = [
  "hello@gmail.com",
  "meow.com",
  "hello@co.il",
  "hello@com",
  "david.ben.tov@whatever999.com",
];

console.log("final regex:", emailValidaror);

for (const addr of addressToTest) {
  const isOkay = emailValidaror.test(addr);
  console.log(isOkay ? "✅" : "❌", addr);
}
