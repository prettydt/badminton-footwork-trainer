(function (root) {
  // 按球场 3x3 网格顺序排列（面向球网，中心为起始位）
  const POINTS = [
    { id: 'fl', name: '左前' },
    { id: 'f', name: '正前' },
    { id: 'fr', name: '右前' },
    { id: 'l', name: '左侧' },
    { id: 'r', name: '右侧' },
    { id: 'bl', name: '左后' },
    { id: 'b', name: '正后' },
    { id: 'br', name: '右后' },
  ];

  function pickNext(enabledIds, lastId, random = Math.random) {
    if (enabledIds.length === 0) throw new Error('至少需要启用一个点位');
    const pool = enabledIds.length > 1 ? enabledIds.filter((id) => id !== lastId) : enabledIds;
    return pool[Math.floor(random() * pool.length)];
  }

  const api = { POINTS, pickNext };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Footwork = api;
})(globalThis);
