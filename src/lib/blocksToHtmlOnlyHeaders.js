const blockContentToHtml = require('@lyra/block-content-to-html')
const h = blockContentToHtml.h

const BlockRenderer = props => {
  const style = props.node.style || 'normal'
  const level = style.replace(/[^\d]/g, '')
  const listItemClass =
    Number(level) < 2
      ? 'header-map__item'
      : 'header-map__item header-map__item--indented'
  return h(
    `li.${listItemClass}`,
    h(
      'a.header-map__link',
      {href: `#${props.node.extra.id}`},
      props.node.children
    )
  )
}

const serializers = {
  types: {
    block: BlockRenderer
  }
}

const blocksToHtmlOnlyHeaders = blockContent => {
  if (!blockContent) {
    return
  }
  const items = []
  blockContent.map(item => {
    if (item._type === 'block' && item.style === 'h1') {
      items.push(item)
    }
    if (item._type === 'block' && item.style === 'h2') {
      items.push(item)
    }
  })
  return blockContentToHtml({
    blocks: items,
    serializers: serializers
  })
}

module.exports = blocksToHtmlOnlyHeaders
