// ブロックの形状と色
const BLOCKS = [
    { shape: [[1, 1], [1, 1]], color: '#F00' }, // 赤色
    { shape: [[0, 1, 0], [1, 1, 1]], color: '#0F0' }, // 緑色
    { shape: [[1, 0, 0], [1, 1, 1]], color: '#00F' }, // 青色
    { shape: [[0, 0, 1], [1, 1, 1]], color: '#FF0' }, // 黄色
    { shape: [[1, 1, 0], [0, 1, 1]], color: '#F0F' }, // 紫色
    { shape: [[1, 1, 1, 1]], color: '#0FF' }, // 水色
    { shape: [[0, 1, 1], [1, 1, 0]], color: '#FFA500' } // オレンジ色
  ];
  
  // ゲームのステータス
  const GAME_STATUS = {
    score: 0,
    board: [], // 盤面の状態を表す2次元配列
    currentBlock: null,
    nextBlock: null
  };
  
  // ゲームを開始する関数
  function startGame() {
    // 盤面の初期化
    const board = [];
    for (let i = 0; i < 20; i++) {
      board.push(Array(10).fill(null));
    }
    GAME_STATUS.board = board;
  
    // スコアの初期化
    GAME_STATUS.score = 0;
    updateScore();
  
    // 最初のブロックを生成
    GAME_STATUS.currentBlock = getRandomBlock();
    GAME_STATUS.nextBlock = getRandomBlock();
    drawNextBlock();
  
    // ゲームを開始
    setInterval(() => {
      // ブロックを1つ下に移動
      moveBlock(0, 1);
  
      // ゲームオーバー判定
      if (isGameOver()) {
        clearInterval(intervalId);
        alert('ゲームオーバー');
        return;
      }
  
      // ライン消去
      let lines = 0;
      GAME_STATUS.board.forEach((row, y) => {
        if (row.every(cell => cell !== null)) {
          lines++;
          GAME_STATUS.board.splice(y, 1);
          GAME_STATUS.board.unshift(Array(10).fill(null));
        }
      });
  
      // スコア加算
      if (lines > 0) {
        GAME_STATUS.score += lines * 100;
        updateScore();
      }
  
      // ブロックの描画
      drawGameBoard();
    }, 500);
  
    // キーイベントの登録
    document.addEventListener('keydown', handleKeyPress);
  }
  
  // ランダムなブロックを生成する関数
  function getRandomBlock() {
    const index = Math.floor(Math.random() * BLOCKS.length);
    const block = BLOCKS[index];
    const shape = block.shape.map(row => [...row]);
    return {
      shape,
      color: block.color,
      x: 3,
      y: -2
    };
  }
  
  