var expect = require('chai').expect;
var JSDOM = require('jsdom').JSDOM;
var zenyatta = require('../lib');
var readFile = require('../lib/utils').readFile;

describe('test zenyatta', function() {
  var dom;

  before(function() {
    zenyatta({
      args: ['test/test.yml'],
      style: 'zatlas',
      dir: 'test'
    })
    var output = readFile('test/test.html');
    dom = new JSDOM(output).window.document;
  })

  it('check render head', function() {
    expect(dom.querySelector('title').innerHTML).to.equal('test');
  })

  it('check render body', function () {
    expect(dom.querySelector('.brand-title').innerHTML).to.equal('test');
  })

  it('check render foot', function () {
    expect(dom.querySelector('.footer-info .brand span').innerHTML).to.equal('test');
  })
});
