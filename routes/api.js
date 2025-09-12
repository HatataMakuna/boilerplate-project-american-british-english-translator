'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (text === undefined || locale === undefined) {
        return res.status(400).json({ error: 'Required field(s) missing'});
      }

      // Check if text is empty
      if (text === '') {
        return res.status(400).json({ error: 'Required field(s) missing'});
      }

      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.status(400).json({ error: 'Invalid value for locale field' });
      }

      const result = translator.translate(text, locale);
      return res.json(result);
    });
};
