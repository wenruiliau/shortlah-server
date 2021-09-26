const express = require('express');
const UrlModel = require('../models');

const router = express.Router();

router.post('/api/create', async (req, res) => {
  const data = req.body.data[0];

  const regexExp = /^http/;

  let urlToShorten = data.url;
  const hasAlias = !!data.alias;
  let urlSlug = '';

  // Add https link to make it route to external link
  if (!urlToShorten.match(regexExp)) {
    urlToShorten = `https://${urlToShorten}`;
  }

  if (hasAlias) {
    urlSlug = data.alias;
  } else {
    urlSlug = Math.random().toString(36).substr(2, 5);
  }

  // 100 tries to get random slug. Odds are your favor :)
  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    let slugExists = await UrlModel.exists({ slug: urlSlug });
    if (slugExists && hasAlias) {
      res.status(409).send({ message: 'Slug in use' });
    } else if (slugExists && !hasAlias) {
      urlSlug = Math.random().toString(36).substr(2, 5);
    }
    slugExists = false;
    break;
  }

  const urlMongooseObj = new UrlModel({ slug: urlSlug, url: urlToShorten });

  try {
    await urlMongooseObj.save();
    res.send(urlMongooseObj);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/api/:slug', async (req, res) => {
  const urlObj = await UrlModel.findOne({ slug: req.params.slug })
    .select('url')
    .lean();
  const urlExists = !!urlObj;

  if (!urlExists) {
    res.status(404).send({ message: 'URL not found' });
  }

  const urlLink = urlObj.url;
  res.send(JSON.stringify({ redirectUrl: urlLink }));
});

module.exports = router;
