# RegEx for Humans.

   “I had a problem, and I decided to solve it using RegEx.  
    Now, I have two problems.”

Regular Expressions are notoriously hard to read, write, or maintain.

> Exhibit A: 1st result on google for "email regex":
>
> `/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

The 2 major problems of RegEx are:
1. Whitespaces are not ignored;  
   Experssions can't be split into lines, or indented.
2. It uses weird symbols for control;
   would you rather read `(?<=Y)X` or "X that comes after Y"?

**RegEx for Humans** is a readable and maintainble **way to write RegEx's**.  

It's a tiny JS library with functions that return normal JS Regular Expression objects.  

![exmaple-1: find phone numbers in a long text](https://github.com/nitasn/regex-for-humans/blob/master/example-1.png?raw=1)

   
    The library returns normal JS RegExp objects, so `phonePattern` now holds  
    /(\d{3}|\(\d{3}\))( |\-)?\d{4}( |\-)?\d{3}/g

![output of exmaple-1](https://github.com/nitasn/regex-for-humans/blob/master/exmple-1-output.png?raw=1)

*RegEx for Humans* is built entirely in TS, and weighs ~2KB when minified.

***

Note: this library is currently in early alpha.  
This article will contain more examples of using *RegEx for Humans*, as the library grows.
