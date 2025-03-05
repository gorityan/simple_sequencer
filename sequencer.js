/**
 * sequencer.js - シーケンサーのコア機能
 * 
 * シンプルな16ステップのシーケンサーを実装します。
 * ユーザーはグリッド上のセルをクリックして、パターンを作成できます。
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM要素の取得
  const sequencerGrid = document.getElementById('sequencer-grid');
  const playButton = document.getElementById('play-button');
  const stopButton = document.getElementById('stop-button');
  const clearButton = document.getElementById('clear-button');
  const saveButton = document.getElementById('save-button');
  const loadButton = document.getElementById('load-button');
  const tempoSlider = document.getElementById('tempo');
  const tempoValue = document.getElementById('tempo-value');
  
  // 定数
  const NUM_INSTRUMENTS = 8;
  const NUM_STEPS = 16;
  
  // シーケンサーの状態
  let isPlaying = false;
  let currentStep = -1;
  let sequencerData = Array(NUM_INSTRUMENTS).fill().map(() => Array(NUM_STEPS).fill(false));
  
  // Tone.jsのトランスポートの設定
  Tone.Transport.bpm.value = 120;
  Tone.Transport.timeSignature = [4, 4];
  Tone.Transport.swing = 0.2;
  
  // UIの初期化
  function initializeUI() {
    // グリッドの作成
    for (let i = 0; i < NUM_INSTRUMENTS; i++) {
      const row = document.createElement('div');
      row.className = 'grid-row';
      
      for (let j = 0; j < NUM_STEPS; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        
        // クリックイベントの追加
        cell.addEventListener('click', () => {
          toggleCell(cell, i, j);
        });
        
        row.appendChild(cell);
      }
      
      sequencerGrid.appendChild(row);
    }
    
    // その他のUIイベントリスナーの設定
    playButton.addEventListener('click', startSequencer);
    stopButton.addEventListener('click', stopSequencer);
    clearButton.addEventListener('click', clearSequencer);
    saveButton.addEventListener('click', savePattern);
    loadButton.addEventListener('click', loadPattern);
    
    // テンポの変更イベント
    tempoSlider.addEventListener('input', () => {
      const tempo = tempoSlider.value;
      tempoValue.textContent = tempo;
      Tone.Transport.bpm.value = tempo;
    });
  }
  
  // セルの状態を切り替える
  function toggleCell(cell, row, col) {
    // 配列の範囲チェック
    if (row < 0 || row >= NUM_INSTRUMENTS || col < 0 || col >= NUM_STEPS) {
      console.error('セルの範囲外:', row, col);
      return;
    }
    
    // データの状態を確認して反転
    const isActive = sequencerData[row][col];
    sequencerData[row][col] = !isActive;
    
    // UIを更新
    if (isActive) {
      cell.classList.remove('active');
    } else {
      cell.classList.add('active');
    }
    
    // 音を鳴らす（プレビュー）
    if (!isActive && instruments && instruments[row]) {
      const instrument = instruments[row];
      
      if (instrument.note) {
        instrument.synth.triggerAttackRelease(
          instrument.note, 
          '8n', 
          Tone.now(), 
          instrument.velocity
        );
      } else {
        // ノイズシンセの場合
        instrument.synth.triggerAttackRelease('8n');
      }
    }
    
    // デバッグ用：状態をログ
    console.log(`セル (${row},${col}) の状態: ${sequencerData[row][col]}`);
  }
  
  // シーケンサーを開始
  function startSequencer() {
    if (isPlaying) return;
    
    // Tone.jsの起動（初回のみ必要）
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
    
    // 再生中のステップを表示/音を鳴らすためのループを設定
    const repeat = (time) => {
      // 前のステップの強調表示を削除
      if (currentStep >= 0) {
        const prevCells = document.querySelectorAll(`.grid-cell[data-col="${currentStep}"]`);
        prevCells.forEach(cell => cell.classList.remove('playing'));
      }
      
      // 次のステップへ移動
      currentStep = (currentStep + 1) % NUM_STEPS;
      
      // 現在のステップを強調表示
      const currentCells = document.querySelectorAll(`.grid-cell[data-col="${currentStep}"]`);
      currentCells.forEach(cell => cell.classList.add('playing'));
      
      // アクティブなセルの音を鳴らす
      for (let i = 0; i < NUM_INSTRUMENTS; i++) {
        if (sequencerData[i][currentStep] && instruments[i]) {
          const instrument = instruments[i];
          if (instrument.note) {
            // 通常のシンセ
            instrument.synth.triggerAttackRelease(
              instrument.note, 
              '8n', 
              time, 
              instrument.velocity
            );
          } else {
            // ノイズシンセ
            instrument.synth.triggerAttackRelease('8n', time);
          }
        }
      }
    };
    
    // 16分音符ごとにループを実行
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();
    
    isPlaying = true;
    playButton.textContent = '一時停止';
  }
  
  // シーケンサーを停止
  function stopSequencer() {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // すべてのスケジュールされたイベントをキャンセル
    
    // 再生中の強調表示を削除
    if (currentStep >= 0) {
      const cells = document.querySelectorAll('.grid-cell.playing');
      cells.forEach(cell => cell.classList.remove('playing'));
      currentStep = -1;
    }
    
    isPlaying = false;
    playButton.textContent = '再生';
  }
  
  // シーケンサーをクリア
  function clearSequencer() {
    // データをリセット
    sequencerData = Array(NUM_INSTRUMENTS).fill().map(() => Array(NUM_STEPS).fill(false));
    
    // UIをリセット
    const cells = document.querySelectorAll('.grid-cell.active');
    cells.forEach(cell => cell.classList.remove('active'));
    
    // コンソールログで確認
    console.log('シーケンサーがクリアされました');
  }
  
  // パターンを保存（ローカルストレージ）
  function savePattern() {
    try {
      // データが正しく形成されているか確認
      if (!Array.isArray(sequencerData) || sequencerData.length !== NUM_INSTRUMENTS) {
        throw new Error('シーケンサーデータの形式が正しくありません');
      }
      
      // 保存前にコンソールに出力して確認
      console.log('保存するパターン:', sequencerData);
      
      localStorage.setItem('sequencerPattern', JSON.stringify(sequencerData));
      alert('パターンが保存されました！');
    } catch (e) {
      alert('パターンの保存に失敗しました。');
      console.error('保存エラー:', e);
    }
  }
  
  // パターンを読み込み（ローカルストレージ）
  function loadPattern() {
    try {
      const savedPattern = localStorage.getItem('sequencerPattern');
      
      if (savedPattern) {
        // 現在のグリッドをクリア（UIとデータの両方）
        const activeCells = document.querySelectorAll('.grid-cell.active');
        activeCells.forEach(cell => {
          cell.classList.remove('active');
        });
        
        // 保存されたデータを読み込み
        sequencerData = JSON.parse(savedPattern);
        
        // 保存されていたアクティブなセルを再設定
        for (let i = 0; i < NUM_INSTRUMENTS; i++) {
          for (let j = 0; j < NUM_STEPS; j++) {
            if (sequencerData[i][j]) {
              const cell = document.querySelector(`.grid-cell[data-row="${i}"][data-col="${j}"]`);
              if (cell) {
                cell.classList.add('active');
              }
            }
          }
        }
        
        alert('パターンを読み込みました！');
      } else {
        alert('保存されたパターンが見つかりません。');
      }
    } catch (e) {
      alert('パターンの読み込みに失敗しました。');
      console.error('読み込みエラー:', e);
    }
  }
  
  // 音量を調整する関数（オプション）
  function setMasterVolume(level) {
    Tone.Destination.volume.value = Tone.gainToDb(level);
  }
  
  // 初期化
  initializeUI();
  setMasterVolume(0.8); // 全体の音量を80%に設定
});