const path = require('path')

const root = path.resolve(__dirname, '..')

module.exports = {
  root,
  public: path.resolve(root, 'public'),
  build: path.resolve(root, 'public', 'build'),
  src: path.resolve(root, 'web')
}
