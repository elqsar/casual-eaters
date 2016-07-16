const expect = require('chai').expect;
const sinon = require('sinon');

describe('simple test', () => {
  it('should be true', () => {
    expect(1).to.equal(1);
  });
});

describe('simple sinon test', () => {
  it('should pass', () => {
    const stub = sinon.stub();
    stub.withArgs(1).returns(10);

    expect(stub(1)).to.equal(10);
  });
});
