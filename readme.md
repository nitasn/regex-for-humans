# RegEx for Humans.

> “I had a problem, so I decided to solve it using RegEx. Now I have two problems.”

Regular Expressions are notoriously unreadable, unwritable, and unmaintainble -
even when they are just one line long.

RegEx for Humans is a more readable and maintainble way to write RegEx's.

    const phonePattern = regexInLongerText(
      anyOf(
        sequenceOf(3, DIGIT), 
        ["(", sequenceOf(3, DIGIT), ")"]
      ),
      optional(anyOf(" ", "-")),
      sequenceOf(4, DIGIT),
      optional(anyOf(" ", "-")),
      sequenceOf(3, DIGIT)
    );
Now `phonePattern` now is `/(\d{3}|\(\d{3}\))( |\-)?\d{4}( |\-)?\d{3}/g`,
i.e. it's a normal JS RegExp object:

    const some_long_text = `
      my phone number is 054-9876543.
      my friend's phone number's 054 1234-567;
      she is 23 years old.
      also check out (054) 5831 325 it's great!
    `;
    
    some_long_text.match(phonePattern)?.forEach((number) => {
      console.log("👉", number);
    });
    
This outputs:

    👉 054-9876543
    👉 054 1234-567
    👉 (054) 5831 325

Another example:

    const emailValidaror = regexWholeText(
      sequenceOf("at-least-one", LETTER_OR_DIGIT),
      sequenceOf("zero-or-more", 
        ".", 
        sequenceOf("at-least-one", LETTER_OR_DIGIT)
      ),
      "@",
      sequenceOf("at-least-one", LETTER_OR_DIGIT),
      sequenceOf("at-least-one", 
        ".", 
        sequenceOf("at-least-one", LETTER_OR_DIGIT)
      )
    );
    
    const addressToTest = [
      "hello@gmail.com",
      "meow.com",
      "hello@co.il",
      "hello@com",
      "david.ben.tov@whatever999.com",
    ];
    
    for (const addr of addressToTest) {
      const isOkay = emailValidaror.test(addr);
      console.log(isOkay ? "✅" : "❌", addr);
    }

Outputs:

    ✅ hello@gmail.com
    ❌ meow.com
    ✅ hello@co.il
    ❌ hello@com
    ✅ david.ben.tov@whatever999.com


***

Note: this library is currently in alpha.