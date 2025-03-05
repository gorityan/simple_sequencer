/**
 * tones.js - 楽器の音色設定
 * 
 * このファイルは、シーケンサーで使用する各楽器の音色を定義します。
 * Tone.jsを使用して、さまざまな種類のシンセサイザーと効果を作成します。
 */
// 今後増やしていくかも
// オーディオエフェクト
const reverb = new Tone.Reverb({
    decay: 1.5,
    wet: 0.2
  }).toDestination();
  
  // リミッターを追加して音量を制御
  const limiter = new Tone.Limiter(-3).toDestination();
  
  // 楽器の定義
  const instruments = [
    // キック
    {
      name: 'キック',
      synth: new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 5,
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
        }
      }).connect(limiter),
      note: 'C1',
      velocity: 1
    },
    
    // スネア
    {
      name: 'スネア',
      synth: new Tone.NoiseSynth({
        noise: {
          type: 'white'
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.02,
          release: 0.2
        }
      }).connect(limiter),
      note: null, // ノイズシンセの場合はノートなし
      velocity: 0.7
    },
    
    // ハイハット
    {
      name: 'ハイハット',
      synth: new Tone.MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 0.1,
          release: 0.1
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).connect(limiter),
      note: null,
      velocity: 0.4
    },
    
    // クラップ
    {
      name: 'クラップ',
      synth: new Tone.NoiseSynth({
        noise: {
          type: 'pink'
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        }
      }).connect(reverb).connect(limiter),
      note: null,
      velocity: 0.6
    },
    
    // ベース
    {
      name: 'ベース',
      synth: new Tone.MonoSynth({
        oscillator: {
          type: 'square'
        },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.4,
          release: 0.8
        },
        filterEnvelope: {
          attack: 0.01,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 50,
          octaves: 2.6
        }
      }).connect(limiter),
      note: 'C2',
      velocity: 0.9
    },
    
    // シンセ
    {
      name: 'シンセ',
      synth: new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'sawtooth'
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).connect(reverb).connect(limiter),
      note: 'C4',
      velocity: 0.6
    },
    
    // ピアノ
    {
      name: 'ピアノ',
      synth: new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.2,
          release: 0.8
        }
      }).connect(reverb).connect(limiter),
      note: 'E4',
      velocity: 0.7
    },
    
    // FX
    {
      name: 'FX',
      synth: new Tone.FMSynth({
        modulationIndex: 12.22,
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.5
        },
        modulation: {
          type: 'square'
        },
        modulationEnvelope: {
          attack: 0.2,
          decay: 0.01,
          sustain: 0.5,
          release: 0.1
        }
      }).connect(reverb).connect(limiter),
      note: 'A5',
      velocity: 0.5
    }
  ];
  
  // ノートマッピング - 各楽器ごとに異なるノートを設定可能
  const noteMapping = [
    // キック - 1つのノートのみ
    ['C1'],
    
    // スネア - ノートなし(ノイズ)
    [null],
    
    // ハイハット - ノートなし
    [null],
    
    // クラップ - ノートなし(ノイズ)
    [null],
    
    // ベース - 低いノート
    ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3'],
    
    // シンセ - 中音域のコード
    ['C4', 'E4', 'G4'], // Cメジャー
    
    // ピアノ - メロディー用の音階
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    
    // FX - 高音域の効果音
    ['A5', 'C6', 'D6', 'F6', 'G6']
  ];