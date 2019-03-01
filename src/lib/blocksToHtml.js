const blockContentToHtml = require('@lyra/block-content-to-html')
const h = blockContentToHtml.h

const ImageRenderer = props => {
  return h('img', {src: props.node.asset.url})
}

const FootnoteRenderer = props => {
  return h('span', {className: 'footnote'}, ' * ')
}

const serializers = {
  types: {
    image: ImageRenderer,
    footnote: FootnoteRenderer
  }
}

const blocksToHtml = blockContent => {
  if (!blockContent) {
    return
  }
  return blockContentToHtml({
    blocks: blockContent,
    serializers: serializers
  })
}

module.exports = blocksToHtml
