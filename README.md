
# Archive: LatGram / LatVok

**My ancient vocabulary/grammar trainer for Classical Latin with a fully-featured offline experience.**

This repository contains my first big project from when I started to learn programming back in 2009.
At that time, the web was vastly different from what we know today.
HTML5 was still in its infancy, and ECMAScript6 was not even released yet.
CSS3 technically existed, but many of today's well-known CSS3 features lacked browser support.
Instead, tables and framesets were the go-to practices for designing websites.

I was in middle school at that time, learning Classical Latin as part of my curriculum.
Classical Latin makes heavy use of affixing and infixing to indicate the grammatical function of a word within a sentence.
Understanding this process, generally referred to as _inflection_, is, in my opinion, the most significant obstacle when it comes to learning the language.
To make matters worse, a latin verb can have up to around 200 inflections, each with a different grammatical meaning, and consequently, translation.

Sadly, there was no convenient way to practice inflections on-the-go with a computer program:
The few online services at that time depended on a stable internet connection, and some also required a paid subscription.
Furthermore, the size of their vocabulary was greatly limited.
As an alternative, one could exploit a configurable vocabulary trainer for training inflections, but only by manually entering every single inflection of each word.

My program circumvented this problem by storing reusable prefixes, called _stems_, for each word, which could then be concatenated with the appropriate _ending_ to form a complete word.
Since there is only a finite amount of possible word endings in Classical Latin, these endings can be hard-coded as part of the program's source code.
This approach effectively reduced `mn` combinations of stems and endings to only `m + n`, which resulted in smaller storage requirements, and the ability to add new vocabulary with little effort.
There is only one drawback:
Any word which does not strictly follow the standard inflection rules (such as _esse_, _posse_, _ire_, _ferre_) remains unsupported.

I built two websites around this concept, which can be downloaded and enjoyed without an internet connection:

[LatGram](https://slyphix.github.io/latgram-latvok-archive/latgram) (started in 2010) asked the user to apply inflection rules to a word in its basic (dictionary) form.
This served as a proof-of-concept for various word categories, including adjectives, nouns, and verbs.

[LatVok](https://slyphix.github.io/latgram-latvok-archive/latvok) (started in 2014) displayed an already inflected word, and asked the user to determine its grammatical form and its translation.
In addition, users could finally add their own vocabulary by submitting CSV files.

Unfortunately, the websites are only available in German (including most parts of the code, lol), making them rather inaccessible for international visitors.
In addition, I never fully completed LatVok, and therefore, the documentation page regarding custom vocabulary is outdated to this day.
You can still test the vocabulary upload feature with the files in the `latvok-vokabular` directory.

Today, this project is hardly relevant since recent advances in NLP research trivialized the process of generating Latin inflections with a computer.
Rather unsurprisingly, the 2023 version of ChatGPT answers every single LatGram prompt correctly.
