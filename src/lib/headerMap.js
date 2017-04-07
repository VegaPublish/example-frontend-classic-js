const BlockContentToHtml = require('@sanity/block-content-to-html')

const options = {
  blockTypeHandlers: {
    textBlock: {
      h1: node => {
        return (
          `
            <li class="header-map__item">
              <a class="header-map__link" href="#${node.extra.id}">${node.children}</a>
            </li>
          `
        )
      },
      h2: node => {
        return (
          `
            <li class="header-map__item header-map__item--indented">
              <a class="header-map__link" href="#${node.extra.id}">${node.children}</a>
            </li>
          `
        )
      }
    }

  }
}

const toHtml = new BlockContentToHtml(options)

const headerMap = function (content) {
  const items = []
  content.map(function (item) {
    if (item._type === 'block' && item.style === 'h1') {
      items.push(item)
    }
    if (item._type === 'block' && item.style === 'h2') {
      items.push(item)
    }
  })

  return toHtml.convert(items)
}

module.exports = headerMap
