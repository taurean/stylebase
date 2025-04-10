const pkg = require('./package.json');

// Custom banner plugin that runs first
const addBannerFirst = {
  postcssPlugin: 'add-version-banner-first',
  Once(root) {
    root.prepend({ type: 'comment', text: `stylebase v${pkg.version}` });
  }
};

// Custom banner plugin that runs last
const addBannerLast = {
  postcssPlugin: 'add-version-banner-last',
  OnceExit(root) {
    // Get the first node
    const firstNode = root.first;
    
    // If it's not already our version comment, add it
    if (!firstNode || firstNode.type !== 'comment' || !firstNode.text.includes(`stylebase v${pkg.version}`)) {
      root.prepend({ type: 'comment', text: `stylebase v${pkg.version}` });
    }
  }
};

module.exports = (ctx) => {
  const isProduction = ctx.env !== 'preview';
  
  return {
    plugins: [
      // Add banner first
      addBannerFirst,
      
      // Process @import statements
      require('postcss-import'),
      
      // Minify in production build only
      isProduction && require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: false,  // Don't remove all comments
            removeAllButFirst: true  // Keep the first comment
          }
        }]
      }),
      
      // Add banner again at the end in case it was removed
      addBannerLast
    ].filter(Boolean)
  };
};