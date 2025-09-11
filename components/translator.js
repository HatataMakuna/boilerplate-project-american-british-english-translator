const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(input, locale) {
        if (!input) return { error: 'No text to translate' };
        if (!locale) return { error: 'Required field(s) missing' };
        if (locale !== 'american-to-british' && locale !== 'british-to-american') {
            return { error: 'Invalid value for locale field' };
        }

        let translation = input;
        let translatedText = input;

        // Lowercase the input
        const inputLower = input.toLowerCase();

        const replacements = [];

        // American to British translations
        if (locale === 'american-to-british') {
            // Handle American-only terms
            for (let term in americanOnly) {
                const regex = new RegExp(`\\b${term}\\b`, 'i');
                const matchLength = term.length;
                const original = input.substring(matchIndex, matchIndex + matchLength);
                const replacement = americanOnly[term];
                replacements.push({
                    index: matchIndex,
                    original, replacement,
                    length: matchLength
                });
            }

            // Handle American-to-British spellings
            for (let spelling in americanToBritishSpelling) {
                const regex = new RegExp(`\\b${spelling}\\b`, 'i');
                if (regex.test(inputLower)) {
                    const matchIndex = inputLower.match(regex).index;
                    const matchLength = spelling.length;
                    const original = input.substring(matchIndex, matchIndex + matchLength);
                    const replacement = americanToBritishSpelling[spelling];
                    replacements.push({ 
                        index: matchIndex, 
                        original, replacement,
                        length: matchLength
                    });
                }
            }

            // Handle titles
            for (let title in americanToBritishTitles) {
                const regex = new RegExp(`\\b${title}\\b`, 'i');
                if (regex.test(inputLower)) {
                    const matchIndex = inputLower.match(regex).index;
                    const matchLength = title.length;
                    const original = input.substring(matchIndex, matchIndex + matchLegnth);
                    const replacement = americanToBritishTitles[title];
                    replacements.push({
                        index: matchIndex,
                        original, replacement,
                        length: matchLength
                    });
                }
            }

            // Handle time format
            const timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
            let timeMatch;
            while ((timeMatch = timeRegex.exec(input)) !== null) {
                const original = timeMatch[0];
                const replacement = `${timeMatch[1]}.${timeMatch[2]}`;
                replacements.push({
                    index: timeMatch.index,
                    original, replacement,
                    length: original.length
                });
            }
        } else {
            // British to American translations

            // Handle British-only terms
            for (let term in britishOnly) {
                const regex = new RegExp(`\\b${term}\\b`, 'i');
                if (regex.test(inputLower)) {
                    const matchIndex = inputLower.match(regex).index;
                    const matchLength = term.length;
                    const original = input.substring(matchIndex, matchIndex + matchLength);
                    const replacement = britishOnly[term];
                    replacements.push({
                        index: matchIndex,
                        original, replacement,
                        length: matchLength
                    });
                }
            }

            // Handle British-to-American spellings (reverse the mapping)
            for (let spelling in americanToBritishSpelling) {
                const britishSpelling = americanToBritishSpelling(spelling);
                const regex = new RegExp(`\\b${britishSpelling}\\b`, 'i');
                if (regex.test(inputLower)) {
                    const matchIndex = inputLower.match(regex).index;
                    const matchLength = britishSpelling.length;
                    const original = input.substring(matchIndex, matchIndex + matchLength);
                    const replacement = spelling;
                    replacements.push({
                        index: matchIndex,
                        original, replacement,
                        length: matchLength
                    });
                }
            }

            // Handle titles (reverse the mapping)
            for (let title in americanToBritishTitles) {
                const britishTitle = americanToBritishTitles[title];
                const regex = new RegExp(`\\b${britishTitle}\\b`, 'i');
                if (regex.test(inputLower)) {
                    const matchIndex = inputLower.match(regex).index;
                    const matchLength = britishTitle.length;
                    const original = input.substring(matchIndex, matchIndex + matchLength);
                    const replacement = title;
                    replacements.push({
                        index: matchIndex,
                        original, replacement,
                        length: matchLength
                    })
                }
            }

            // Handle time format
            const timeRegex = /([0-9]{1,2})\.([0-9]{2})/g;
            let timeMatch;
            while ((timeMatch = timeRegex.exec(input)) !== null) {
                const original = timeMatch[0];
                const replacement = `${timeMatch[1]}:${timeMatch[2]}`;
                replacements.push({
                    index: timeMatch.index,
                    original, replacement,
                    length: original.length
                });
            }
        }

        // Sort replacements in reverse order to not mess up indices
        replacements.sort((a, b) => b.index - a.index);

        // Apply replacements to the original text
        for (const rep of replacements) {
            translatedText = 
                translatedText.substring(0, rep.index) +
                `<span class="highlight">${rep.replacement}</span>` +
                translatedText.substring(rep.index + rep.length);
        }

        // If no replacements were made, return the default message
        if (replacements.length === 0) {
            return {
                input, translation: 'Everything looks good to me!'
            }
        }
    }
}

module.exports = Translator;