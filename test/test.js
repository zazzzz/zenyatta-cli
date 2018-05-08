var expect = require('chai').expect;
var JSDOM = require('jsdom').JSDOM;
var zenyatta = require('../lib');
var util = require('../lib/utils');

describe('test zenyatta', function () {
  var dom;

  before(function () {
    zenyatta({
      args: ['test/zenyatta.yml'],
      template: 'zatlas',
      style: 'zatlas',
      dir: 'test'
    })
    var output = util.readFile('test/zenyatta.html');
    dom = new JSDOM(output).window.document;
  })

  it('check render layout', function () {
    expect(dom.querySelector('title').innerHTML).to.equal('zenyatta');
  })

  it('check render head', function () {
    expect(dom.querySelector('header h1').innerHTML).to.equal('zenyatta');
  })

  it('check render body', function () {
    expect(dom.querySelector('main').className).to.equal('page-main');
  })

  it('check render foot', function () {
    expect(dom.querySelectorAll('footer .col').length).to.equal(3);
  })

  after(function () {
    util.removeFile('test/zenyatta.html');
    util.removeFile('test/zenyatta.css');
    util.removeFile('test/zenyatta.js');
  })
});
