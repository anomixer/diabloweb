# ディアブロウェブ版 (DiabloWeb)

これはオリジナルのディアブロゲームのウェブ移植版で、GalaXyHaXzとdevilutionチームによって再構築されたソースコードを基に開発されています。

## 🎮 オンラインプレイ

[diabloweb.pages.dev](https://diabloweb.pages.dev) にアクセスして今すぐプレイを開始！

## 🌐 言語サポート

このプロジェクトは現在、多言語インターフェースをサポートしています：
- 🇺🇸 English（英語）
- 🇹🇼 繁體中文（繁体中国語）
- 🇨🇳 简体中文（簡体中国語）
- 🇯🇵 日本語
- 🇰🇷 한국어（韓国語）

ゲーム画面の右上角で言語を切り替えることができます。

## 📋 2025年9月9日更新記録

### 🔧 技術修正と改善

#### 1. Node.js互換性問題の解決
- **問題**: プロジェクトが古い `node-sass@4.14.1` を使用していて、Node.js 20と互換性がない
- **解決策**: 
  - `node-sass`を削除し、現代的な `sass` (Dart Sass) に移行
  - webpackの設定を更新して新しいSassローダーを使用
  - OpenSSL Legacy Provider問題を修正し、ビルドスクリプトに `--openssl-legacy-provider` パラメータを追加

#### 2. Sharewareバージョンの読み込み問題修正
- **問題**: 「無料版をプレイ」ボタンクリック後に404エラーとファイルサイズエラーが発生
- **根本原因**: 
  - `spawn.mpq` ファイル (25.8 MB) がCloudflare Pagesの25MB静的ファイル制限を超過
  - GitHub Releasesからの直接読み込み時にCORSクロスドメイン問題が発生
- **最終解決策**:
  - 大ファイルを小さなチャンクに分割：`spawn.mpq.chunk000` (20MB) + `spawn.mpq.chunk001` (4.8MB)
  - 分割情報を記録するメタデータファイル `spawn.mpq.meta` を作成
  - 読み込みロジックを修正：チャンクファイルを順次ダウンロードしてメモリ内で再構築
  - 全ファイルを同一ドメインから提供してCORS問題を回避

#### 3. CI/CDビルド問題の修正
- **問題**: Cloudflare Pages CI環境でESLint警告がエラーとして扱われる
- **解決策**: ループ内での関数作成を避けるようにコードをリファクタリングして `no-loop-func` ルールに準拠

#### 4. 国際化サポートの追加
- **機能**: 完全な多言語サポート（英語/繁体中国語/簡体中国語/日本語/韓国語）
- **実装**:
  - 言語の自動検出と永続化ストレージをサポートするi18nシステムを構築
  - リアルタイム切り替えをサポートする言語セレクターコンポーネントを追加
  - メニュー、エラーメッセージ、読み込み提示を含む全ユーザーインターフェーステキストを翻訳
  - 各言語の職業名ローカライゼーションをサポート

### 🗂️ 新規追加ファイル構造
```
src/
├── i18n/
│   ├── index.js          # 国際化コア機能
│   ├── en.json           # 英語翻訳
│   ├── zh-tw.json        # 繁体中国語翻訳
│   ├── zh-cn.json        # 簡体中国語翻訳
│   ├── ja.json           # 日本語翻訳
│   └── ko.json           # 韓国語翻訳
├── components/
│   ├── LanguageSelector.js    # 言語セレクターコンポーネント
│   └── LanguageSelector.scss  # 言語セレクタースタイル
public/
└── chunks/
    ├── spawn.mpq.chunk000     # 分割ファイル 1
    ├── spawn.mpq.chunk001     # 分割ファイル 2
    └── spawn.mpq.meta         # 分割メタデータ
split_spawn.js                 # ファイル分割ツールスクリプト
```

### 🚀 デプロイ最適化
- Cloudflare Pages自動デプロイを使用
- ファイルチャンク技術でクラウドプラットフォームのファイルサイズ制限を回避
- 読み込み体験を最適化し、チャンクダウンロード進行表示をサポート

### 🎯 ゲーム体験の改善
- 無料試用版が読み込めない問題を修正
- 多言語インターフェースを追加し、各地域ユーザーの体験を向上
- 完全なオリジナルゲーム機能を維持
- セーブデータ管理とファイルアップロード機能をサポート

## 🛠️ ローカル開発

### システム要件
- Node.js 18+ 
- npm または yarn

### インストール手順
```bash
# プロジェクトをクローン
git clone https://github.com/anomixer/diabloweb
cd diabloweb

# 依存関係をインストール
npm install --legacy-peer-deps

# 開発サーバーを起動
npm start

# 本番ビルドを構築
npm run build
```

### ファイル分割ツール
`spawn.mpq` ファイルを再分割する必要がある場合：
```bash
node split_spawn.js
```

## 📁 ゲームファイル説明

### 正規版ゲーム
- オリジナル `DIABDAT.MPQ` ファイルをサポート
- [GoG](https://www.gog.com/game/diablo) から正規版ゲームを購入可能
- ファイルドラッグ＆ドロップアップロードをサポート

### 試用版
- 無料のシェアウェアバージョン、ウェブ専用版に圧縮済み（約25MB）
- 自動チャンク読み込み、手動ダウンロード不要
- 試用用の基本ゲームコンテンツを含む

## 🤝 貢献

IssueとPull Requestの投稿を歓迎します！

## 📄 ライセンス

このプロジェクトはオリジナルのDiabloWebプロジェクトを基に開発されています。詳細は関連ライセンス文書を参照してください。

## 🔗 関連リンク

- オリジナルプロジェクト: [d07RiV/diabloweb](https://github.com/d07RiV/diabloweb)
- オンラインプレイ: [diabloweb.pages.dev](https://diabloweb.pages.dev)
- 問題報告: [GitHub Issues](https://github.com/anomixer/diabloweb/issues)
