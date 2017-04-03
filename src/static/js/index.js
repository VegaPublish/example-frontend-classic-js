window.App = {
  handleMenuClick: function (element) {
    document.location = element.querySelectorAll('a')[0].getAttribute('href')
  }
}
