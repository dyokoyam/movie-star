import { Note } from '@/app/types/note';

export const MOCK_NOTES: Note[] = [
  {
    id: "note-1",
    title: "プロジェクトのアイデア",
    content: `新しいプロジェクトのアイデアをまとめました。

1. 映画検索アプリ
   - React + TypeScriptでフロントエンド
   - Go + Ginでバックエンド
   - PostgreSQLでデータベース

2. 特徴
   - レスポンシブデザイン
   - リアルタイム検索
   - お気に入り機能
   - レビューシステム

実装する際のポイント：
- API設計をしっかりする
- セキュリティ対策を忘れずに
- パフォーマンスを意識した設計`,
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2時間前
    tags: ["プロジェクト", "アイデア", "開発"],
  },
  {
    id: "note-2",
    title: "今日のタスク",
    content: `✅ 完了したタスク：
- データベース設計の確認
- APIエンドポイントの実装
- ユニットテストの作成

🔄 進行中のタスク：
- フロントエンドのUI実装
- レスポンシブデザインの調整
- パフォーマンス最適化

⏳ 今後のタスク：
- デプロイ設定
- ドキュメント作成
- レビュー対応`,
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30分前
    tags: ["タスク", "今日"],
  },
  {
    id: "note-3",
    title: "読書メモ - 「アトミック・デザイン」",
    content: `アトミックデザインの原則：

【Atoms】
- ボタン、入力フィールド、ヘッダーなどの最小単位
- 他の分子や有機体を構成する基本要素

【Molecules】
- 複数の原子が結合した比較的単純なUIコンポーネント
- 検索フォーム、カードなど

【Organisms】
- 分子が集まってできた複雑なUIコンポーネント
- ヘッダー、フッター、サイドバーなど

【Templates】
- ページレベルのレイアウト
- ワイヤーフレーム的な構造

【Pages】
- 実際のコンテンツが入った最終的なデザイン

この考え方をプロジェクトに適用して、コンポーネント設計を改善したい。`,
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1日前
    tags: ["読書", "デザイン", "メモ"],
  },
  {
    id: "note-4",
    title: "技術メモ",
    content: `技術スタック選定のポイント：

バックエンド：
- Go：高速、シンプル、型安全
- Gin：軽量、速い、ミドルウェア豊富
- PostgreSQL：信頼性が高く、機能豊富

フロントエンド：
- Next.js：SSR/SSG対応、開発体験良い
- TypeScript：型安全、開発効率向上
- Tailwind CSS：ユーティリティファースト、保守性高い

インフラ：
- Docker：環境差異を吸収
- Docker Compose：複数コンテナ管理が簡単

開発環境構築の際は、ホットリロードを活用して効率化を図る。`,
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3日前
    tags: ["技術", "メモ"],
  },
  {
    id: "note-5",
    title: "学習計画",
    content: `今月の学習目標：

1週目：Reactの基礎復習
- Hooksの理解を深める
- Context APIの実践
- カスタムフックの作成

2週目：TypeScriptの応用
- 高度な型定義
- ジェネリクスの活用
- 型レベルプログラミング

3週目：バックエンド開発
- Go言語の基礎固め
- Ginフレームワークの習得
- データベース設計

4週目：実践プロジェクト
- 小規模なアプリケーション開発
- テスト駆動開発の実践
- コードレビューの実施

継続的な学習が重要。毎日の積み重ねを意識する。`,
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5日前
    tags: ["学習", "計画"],
  },
];

export function getMockNotes(): Note[] {
  return MOCK_NOTES;
}

export function getMockNoteById(id: string): Note | undefined {
  return MOCK_NOTES.find((note) => note.id === id);
}
