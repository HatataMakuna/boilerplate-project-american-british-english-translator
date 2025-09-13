const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        const input = text;

        // Track all replacements
        const replacements = [];

        // American to British translations
        if (locale === 'american-to-british') {
            // Handle American-only terms
            for (let term in americanOnly) {
                const regex = new RegExp(`\\b${this.escapeRegExp(term)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(input)) !== null) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: americanOnly[term],
                        length: match[0].length
                    });
                }
            }

            // Handle American-to-British spellings
            for (let spelling in americanToBritishSpelling) {
                const regex = new RegExp(`\\b${this.escapeRegExp(spelling)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(input)) !== null) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: americanToBritishSpelling[spelling],
                        length: match[0].length
                    });
                }
            }

            // Handle American to British titles - needs special handling
            for (let title in americanToBritishTitles) {
                // Case-insensitive search but preserve case for replacement
                const regex = new RegExp(`\\b${this.escapeRegExp(title)}`, 'i');
                const match = input.match(regex);
                if (match) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: this.capitalizeFirstLetter(americanToBritishTitles[title]),
                        length: match[0].length
                    });
                }
            }

            // Handle time format
            const timeRegex = /(\d{1,2}):(\d{2})/g;
            let timeMatch;
            while ((timeMatch = timeRegex.exec(input)) !== null) {
                replacements.push({
                    index: timeMatch.index,
                    original: timeMatch[0],
                    replacement: `${timeMatch[1]}.${timeMatch[2]}`,
                    length: timeMatch[0].length
                });
            }
        } else {
            // British to American translations

            // Handle British-only terms
            for (let term in britishOnly) {
                const regex = new RegExp(`\\b${this.escapeRegExp(term)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(input)) !== null) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: britishOnly[term],
                        length: match[0].length
                    });
                }
            }

            // Handle British-to-American spellings (reverse the mapping)
            for (let american in americanToBritishSpelling) {
                const british = americanToBritishSpelling[american];
                const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(input)) !== null) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: american,
                        length: match[0].length
                    });
                }
            }

            // Handle titles (reverse the mapping) - needs special handling
            for (let american in americanToBritishTitles) {
                const british = americanToBritishTitles[american];
                // Case-insensitive search but preserve case for replacement
                const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'i');
                const match = input.match(regex);
                if (match) {
                    replacements.push({
                        index: match.index,
                        original: match[0],
                        replacement: this.capitalizeFirstLetter(american),
                        length: match[0].length
                    });
                }
            }

            // Handle time format
            const timeRegex = /(\d{1,2})\.(\d{2})/g;
            let timeMatch;
            while ((timeMatch = timeRegex.exec(input)) !== null) {
                replacements.push({
                    index: timeMatch.index,
                    original: timeMatch[0],
                    replacement: `${timeMatch[1]}:${timeMatch[2]}`,
                    length: timeMatch[0].length
                });
            }
        }

        // If no replacements, return original with message
        if (replacements.length === 0) {
            return {text: input, translation: "Everything looks good to me!"};
        }

        // Sort replacements by index and length (to handle overlapping terms correctly)
        replacements.sort((a, b) => {
            if (a.index !== b.index) return a.index - b.index;
            return b.length - a.length; // Handle longer matches first
        });

        // Filter out overlapping replacements
        const filteredReplacements = [];
        let lastEnd = -1;
        
        for (const rep of replacements) {
            if (rep.index >= lastEnd) {
                filteredReplacements.push(rep);
                lastEnd = rep.index + rep.length;
            }
        }
        
        // Apply all replacements in reverse order to avoid index shifting
        filteredReplacements.sort((a, b) => b.index - a.index);
        
        let translation = input;
        for (const rep of filteredReplacements) {
            translation = 
                translation.substring(0, rep.index) + 
                `<span class="highlight">${rep.replacement}</span>` + 
                translation.substring(rep.index + rep.length);
        }

        return {text: input, translation: translation};
    }

    // Helper function to escape special regex characters
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

module.exports = Translator;