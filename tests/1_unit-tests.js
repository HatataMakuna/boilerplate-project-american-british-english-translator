const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

/*
Translate Mangoes are my favorite fruit. to British English
Translate I ate yogurt for breakfast. to British English
Translate We had a party at my friend's condo. to British English
Translate Can you toss this in the trashcan for me? to British English
Translate The parking lot was full. to British English
Translate Like a high tech Rube Goldberg machine. to British English
Translate To play hooky means to skip class or work. to British English
Translate No Mr. Bond, I expect you to die. to British English
Translate Dr. Grosh will see you now. to British English
Translate Lunch is at 12:15 today. to British English
Translate We watched the footie match for a while. to American English
Translate Paracetamol takes up to an hour to work. to American English
Translate First, caramelise the onions. to American English
Translate I spent the bank holiday at the funfair. to American English
Translate I had a bicky then went to the chippy. to American English
Translate I've just got bits and bobs in my bum bag. to American English
Translate The car boot sale at Boxted Airfield was called off. to American English
Translate Have you met Mrs Kalyani? to American English
Translate Prof Joyner of King's College, London. to American English
Translate Tea time is usually around 4 or 4.30. to American English
Highlight translation in Mangoes are my favorite fruit.
Highlight translation in I ate yogurt for breakfast.
Highlight translation in We watched the footie match for a while.
Highlight translation in Paracetamol takes up to an hour to work.

Advanced Tests
1. You should provide your own project, not the example URL.
2. You can POST to /api/translate with a body containing text with the text to translate and locale with either american-to-british or british-to-american. The returned object should contain the submitted text and translation with the translated text.
3. The /api/translate route should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English. The span element should wrap the entire time string, i.e. <span class="highlight">10:30</span>.
4. The /api/translate route should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See /components/american-to-british-titles.js for the different titles your application should handle.
5. Wrap any translated spelling or terms with <span class="highlight">...</span> tags so they appear in green.
6. If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.
7. If text is empty, return { error: 'No text to translate' }
8. If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.
9. If text requires no translation, return "Everything looks good to me!" for the translation value.
10. All 24 unit tests are complete and passing.
11. All 6 functional tests are complete and passing.
*/

suite('Unit Tests', () => {
    const translator = new Translator();

    suite('American to British English'), () => {
        // #1
        test('Translate "Mangoes are my favorite fruit." to British English', () => {
            const result = translator.translate("Mangoes are my favorite fruit.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">favourite</span>');
        });

        // #2
        test('Translate "I ate yogurt for breakfast." to British English', () => {
            const result = translator.translate("I ate yogurt for breakfast.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">yoghurt</span>');
        });

        // #3
        test('Translate "We had a party at my friend\'s condo." to British English', () => {
            const result = translator.translate("We had a party at my friend's condo.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">flat</span>');
        });

        // #4
        test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
            const result = translator.translate("Can you toss this in the trashcan for me?", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">bin</span>');
        });

        // #5
        test('Translate "The parking lot was full." to British English', () => {
            const result = translator.translate("The parking lot was full.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">bin</span>');
        });

        // #6
        test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
            const result = translator.translate("Like a high tech Rube Goldberg machine.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">Heath Robinson device</span>');
        });

        // #7
        test('Translate "To play hooky means to skip class or work." to British English', () => {
            const result = translator.translate("To play hooky means to skip class or work.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">bunk off</span>');
        });

        // #8
        test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
            const result = translator.translate("No Mr. Bond, I expect you to die.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">Mr</span>');
        });

        // #9
        test('Translate "Dr. Grosh will see you now." to British English', () => {
            const result = translator.translate("Dr. Grosh will see you now.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">Dr</span>');
        });

        // #10
        test('Translate "Lunch is at 12:15 today." to British English', () => {
            const result = translator.translate("Lunch is at 12:15 today.", "american-to-british");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">12.15</span>');
        });
    }

    suite('British to American English'), () => {
        // #11
        test('Translate "We watched the footie match for a while." to British English', () => {
            const result = translator.translate("We watched the footie match for a while.", "british-to-american");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">soccer</span>');
        });

        // #12
        test('Translate "Paracetamol takes up to an hour to work." to British English', () => {
            const result = translator.translate("Paracetamol takes up to an hour to work.", "british-to-american");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">acetaminophen</span>');
        });

        // #13
        test('Translate "First, caramelise the onions." to British English', () => {
            const result = translator.translate("First, caramelise the onions.", "british-to-american");
            assert.isObject(result);
            assert.property(result, 'translation');
            assert.include(result.translation, '<span class="highlight">caramelize</span>');
        });
    }
});
