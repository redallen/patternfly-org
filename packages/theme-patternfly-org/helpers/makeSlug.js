const { slugger } = require('./slugger');

module.exports = {
  makeSlug: (source, section, id) => {
    let url = '';

    if (!source.includes('pages-')) {
      url += `/documentation`;
    }

    if (section) {
      url += `/${slugger(section)}`
    }

    if (id) {
      url += `/${slugger(id)}`;
    }

    if (source && !source.includes('pages-')) {
      url += `/${source}`;
    }

    return url;
  }
}
