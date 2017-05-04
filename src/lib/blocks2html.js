const BlockContentToHtml = require('@sanity/block-content-to-html')

const options = {
  customTypeHandlers: {
    image: node => {
      return (
        `
          <img src="${node.attributes.asset.url}" />
        `
      )
    }
  },
  blockTypeHandlers: {
    textBlock: {
      h1: node => {
        return (
          `
            <a id="${node.extra.id}">
              <h1>${node.children}</h1>
            </a>

          `
        )
      },
      h2: node => {
        return (
          `
            <a id="${node.extra.id}">
              <h2>${node.children}</h2>
            </a>

          `
        )
      }
    }

  }
}

const toHtml = new BlockContentToHtml(options)

const blocks2html = function (content) {
  if (!content) {
    return
  }
  return toHtml.convert(content)
}

module.exports = blocks2html
