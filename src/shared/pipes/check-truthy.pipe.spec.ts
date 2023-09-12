import { CheckTruthyPipe } from './check-truthy.pipe';

describe('CheckTruthyPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckTruthyPipe();
    expect(pipe).toBeTruthy();
  });
});
