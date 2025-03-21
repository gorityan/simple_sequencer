# シンプル音楽メーカー

ブラウザで動作するシンプルな音楽シーケンサーです。プログラミングの知識がなくても、クリックだけで簡単に音楽を作ることができます。

![image](https://github.com/user-attachments/assets/4825686b-f81a-4215-821e-2bec9455779a)


## 特徴

- 8種類の楽器音色
- 16ステップのシーケンサー
- テンポ調整機能（60〜180 BPM）
- パターン保存・読み込み機能
- 直感的なクリック操作

## 使い方

1. **グリッドの操作**:
   - グリッド上のセルをクリックして音を配置します
   - 縦軸は楽器の種類、横軸はタイミングを表します
   - 配置した音はもう一度クリックすると削除できます

2. **コントロール**:
   - 「再生」ボタン: パターンを再生します
   - 「停止」ボタン: 再生を停止します
   - 「テンポ」スライダー: 再生スピードを調整します
   - 「クリア」ボタン: すべての音を削除します
   - 「保存」ボタン: 現在のパターンをブラウザに保存します
   - 「読み込み」ボタン: 保存されたパターンを読み込みます

## 楽器の説明

1. **キック**: 低音のバスドラム - リズムの基礎となる重低音
2. **スネア**: ドラムセットのスネアドラム - バックビートを作ります
3. **ハイハット**: 金属的な高音のシンバル - リズムに細かさを加えます
4. **クラップ**: 手拍子のような音 - アクセントとして使えます
5. **ベース**: 低音の旋律楽器 - 曲の土台となる低音メロディを作ります
6. **シンセ**: シンセサイザーの音色 - コード進行や雰囲気を作ります
7. **ピアノ**: ピアノの音色 - メロディやハーモニーの作成に便利です
8. **FX**: 効果音的な音色 - 曲のアクセントや転換点に使えます

## パターン作成のヒント

### 基本的なドラムパターン
```
キック：  x       x       x       x    
スネア：      x       x       x       x
ハイハット: x x x x x x x x x x x x x x x x
```

### 一般的なビート
```
キック：  x       x       x           
スネア：      x       x       x       x
ハイハット:   x   x   x   x   x   x   x   
```

### メロディ作成
- ピアノで簡単なメロディを作り、ベースでその低音を補強すると良いでしょう
- 4分割（4拍子）で考えると作りやすいです
- まずはC, E, G（ドミソ）の音だけで試してみましょう

## インストール方法

1. このリポジトリをダウンロードまたはクローンします:
   ```
   git clone https://github.com/gorityan/simple-music-maker.git
   ```

2. index.htmlをブラウザで開くだけで使用できます

3. オンラインでも使用できます: [デモページ](https://github.com/gorityan/simple_sequencer.git)

## ブラウザ対応

- Google Chrome (推奨)
- Firefox
- Safari
- Microsoft Edge

※音声機能はブラウザによって動作が異なる場合があります。最新のGoogle Chromeでの使用を推奨します。

## 技術仕様

- HTML5, CSS3, JavaScript (ES6+)
- Web Audio API (Tone.js)
- ローカルストレージ（パターン保存）

## 今後の開発予定

- より多くの楽器音色
- 複数パターンの連結機能
- MIDI出力機能
- モバイル対応の改善
- カスタムサウンドのアップロード機能

## トラブルシューティング

- **音が鳴らない場合**: ブラウザの設定で音声再生が許可されているか確認してください
- **パターンが保存できない**: プライベートブラウジングモードではローカルストレージが使えない場合があります
- **動作が重い場合**: 他のタブやアプリケーションを閉じてメモリを解放してみてください

## ライセンス

MIT License

## 作者

gorityan

---

楽しい音楽制作ライフを！
