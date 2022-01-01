type Char = string; // ts doesn't have fixed-length strings...


// sequenceOf(3, DIGIT) // todo make "3-4" and "3+" work

// todo lookaheads/behinds...


/**
 * a wrapper over regular string,
 * to indicate that the content is already special-chars-escaped.
 *
 * the content is something like "[a-z]" or "\\*"
 */
class RegexSnippet {
  private constructor(readonly content: string) {}

  static specialChars = new Set<string>(
    ". ^ $ * + - ? ( ) [ ] { } \\ | / = ! < >".match(/\S+?/g)
  );

  public static wrap(chars: string) {
    return new RegexSnippet(chars);
  }

  public static escape(chars: string) {
    return new RegexSnippet(
      [...chars]
        .map((char) => (this.specialChars.has(char) ? "\\" : "") + char)
        .join("")
    );
  }

  [Symbol.toPrimitive]() {
    return this.content;
  }
}

type RgxSnpt_or_Str = RegexSnippet | string; // just for short

export const DIGIT = RegexSnippet.wrap("\\d");
export const LETTER_OR_DIGIT = RegexSnippet.wrap("\\w");
export const WHITE_SPACE = RegexSnippet.wrap("\\s");
export const WORD_BOUNDARY = RegexSnippet.wrap("\\b");
export const NOT_DIGIT = RegexSnippet.wrap("\\D");
export const NOT_LETTER_OR_DIGIT = RegexSnippet.wrap("\\W");
export const NOT_WHITE_SPACE = RegexSnippet.wrap("\\S");
export const NOT_WORD_BOUNDARY = RegexSnippet.wrap("\\B");
export const ANY_CHAR = RegexSnippet.wrap(".");

export function anyCharBetween(from: Char, to: Char) {
  const _from = RegexSnippet.escape(from);
  const _to = RegexSnippet.escape(to);
  return RegexSnippet.wrap(`[${_from}-${_to}]`);
}

function escapeIfNeeded(thing: RgxSnpt_or_Str) {
  if (thing instanceof RegexSnippet) {
    return thing;
  }
  return RegexSnippet.escape(thing);
}

export function anyOf(...expressions: (RgxSnpt_or_Str | RgxSnpt_or_Str[])[]) {
  // flatten
  const exps = expressions.map((exp) => {
    if (Array.isArray(exp)) {
      return exp.map(escapeIfNeeded).join("");
    } else {
      return escapeIfNeeded(exp);
    }
  });
  return RegexSnippet.wrap(`(${exps.join("|")})`);
}

export function anyCharOfThese(chars: Char[]) {
  const escapedChars = chars.map(RegexSnippet.escape);
  return RegexSnippet.wrap(`[${escapedChars}]`);
}

export function anyCharButThese(chars: Char[]) {
  const escapedChars = chars.map(RegexSnippet.escape);
  return RegexSnippet.wrap(`[^${escapedChars}]`);
}

type Reps =
  | "at-least-one"
  | "zero-or-more"
  | `${number}-${number}`
  | `${number}`
  | number;

function toQuantifier(reps: Reps) {
  switch (reps) {
    case "at-least-one": // todo maybe only "1+"
      return "+";
    case "zero-or-more":
      return "*";
    default:
      return `{${reps}}`;
  }

  // todo "3+" should become {3,}
}

export function sequenceOf(reps: Reps, ...exps: RgxSnpt_or_Str[]) {
  let exp = exps.map(escapeIfNeeded).join("");
  exp = exps.length > 1 ? `(${exp})` : exp;
  exp += toQuantifier(reps);
  return RegexSnippet.wrap(exp);
}

export function shortestSequenceOf(reps: Reps, ...exps: RgxSnpt_or_Str[]) {
  const greedyVersion = sequenceOf(reps, ...exps).content;
  return RegexSnippet.wrap(greedyVersion + "?");
}

export function optional(exp: RgxSnpt_or_Str) {
  // todo varargs
  const string =
    exp instanceof RegexSnippet
      ? exp.content
      : RegexSnippet.escape(exp).content;

  return RegexSnippet.wrap(string + "?");
}

// type Flag = "case-insensitive" | "multi-line-mode" | "support-unicode";

export function regexInLongerText(...exps: RgxSnpt_or_Str[]) {
  const exp = exps.map(escapeIfNeeded).join("");
  return new RegExp(exp, "g");
}

export function regexWholeText(...exps: RgxSnpt_or_Str[]) {
  const exp = exps.map(escapeIfNeeded).join("");
  return new RegExp(`^${exp}$`, "gm");
}
