// module.exports = {
//     presets: [
//       'babel-preset-expo',
//       '@babel/preset-typescript',
//     ],
//   };
  
module.exports = function (api) {
api.cache(true);
return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
};
};