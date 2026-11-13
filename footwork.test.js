const test = require('node:test');
const assert = require('node:assert');
const { POINTS, pickNext } = require('./footwork.js');

const ALL = POINTS.map((p) => p.id);

test('共 8 个点位且 id 唯一', () => {
  assert.strictEqual(POINTS.length, 8);
  assert.strictEqual(new Set(ALL).size, 8);
});

test('随机结果覆盖全部 8 个点位', () => {
  const seen = new Set();
  let last = null;
  for (let i = 0; i < 2000; i++) {
    last = pickNext(ALL, last);
    seen.add(last);
  }
  assert.deepStrictEqual([...seen].sort(), [...ALL].sort());
});

test('不会连续出现同一个点位', () => {
  let last = null;
  for (let i = 0; i < 2000; i++) {
    const next = pickNext(ALL, last);
    assert.notStrictEqual(next, last);
    last = next;
  }
});

test('只从启用的点位中选择', () => {
  const enabled = ['fl', 'br'];
  let last = null;
  for (let i = 0; i < 200; i++) {
    last = pickNext(enabled, last);
    assert.ok(enabled.includes(last));
  }
});

test('只启用一个点位时允许重复', () => {
  assert.strictEqual(pickNext(['f'], 'f'), 'f');
});

test('随机数边界值不越界', () => {
  assert.strictEqual(pickNext(ALL, null, () => 0), 'fl');
  assert.strictEqual(pickNext(ALL, null, () => 0.999999), 'br');
});

test('没有启用点位时报错', () => {
  assert.throws(() => pickNext([], null));
});
