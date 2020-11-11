class PageHeader {
  constructor(headerElement, Pageheader) {
    this.headerElement = headerElement;
    this.Pageheader = Pageheader;
    this.updateAverage = this.updateAverage.bind(this);
  }

  updateAverage(average) {
    var badge = $('.badge');
    badge.text(average);
  }

}
