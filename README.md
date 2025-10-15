# Movie Star - モダンなフルスタック映画アプリケーション

[![Go](https://img.shields.io/badge/Go-1.25+-blue.svg)](https://golang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

Movie Starは、Next.js (App Router, TypeScript)フロントエンドとGin (Go)バックエンドAPI、PostgreSQLデータベースを組み合わせたフルスタックアプリケーションのスターターキットです。モノレポ構造により、ツール、設定、文書を一元管理し、効率的な開発環境を提供します。

## 🚀 主な特徴

- **モダンな技術スタック**: Next.js 15.5、React 19、Go 1.25、PostgreSQL 16
- **高性能**: Goの高速なバックエンドとNext.jsの最適化されたフロントエンド
- **タイプセーフ**: TypeScriptによる型安全な開発
- **コンテナ化**: Docker/Docker Composeによる環境構築・デプロイの簡素化
- **開発者体験**: ホットリロード、構造化ログ、一貫したコーディング規約
- **スケーラブル**: マイクロサービス対応可能な設計

## 📁 プロジェクト構造

```
movie-star/
├── apps/
│   ├── api/                 # Go + Ginバックエンドサービス
│   │   ├── cmd/api/         # メインアプリケーション
│   │   ├── internal/        # 内部パッケージ
│   │   │   ├── config/      # 設定管理
│   │   │   ├── database/    # データベース接続
│   │   │   ├── http/        # HTTPハンドラー・ミドルウェア
│   │   │   ├── logger/      # ログ管理
│   │   │   └── server/      # サーバー管理
│   │   └── go.mod           # Goモジュール定義
│   └── web/                 # Next.jsフロントエンド
│       ├── src/
│       │   ├── app/         # Next.js App Router
│       │   ├── _components/ # 共通コンポーネント
│       │   ├── _config/     # 設定ファイル
│       │   ├── _data/       # データ取得関数
│       │   └── _types/      # 型定義
│       ├── public/          # 静的ファイル
│       └── package.json     # 依存関係定義
├── docker-compose.yml       # コンテナオーケストレーション
├── Dockerfile              # マルチステージビルド定義
├── package.json            # ルートワークスペース設定
└── README.md               # プロジェクトドキュメント
```

## 🛠️ 技術仕様

### バックエンド (API)
- **フレームワーク**: Gin Web Framework
- **言語**: Go 1.25+
- **データベース**: PostgreSQL 16
- **依存関係管理**: Go Modules
- **開発ツール**: Air (ホットリロード)

### フロントエンド (Web)
- **フレームワーク**: Next.js 15.5 (App Router)
- **言語**: TypeScript 5+
- **スタイリング**: Tailwind CSS v4
- **ビルドツール**: Turbopack
- **依存関係管理**: npm workspaces

### 開発環境
- **コンテナ化**: Docker & Docker Compose
- **コード品質**: ESLint, golangci-lint
- **開発支援**: concurrently (並行実行)

## 🚀 クイックスタート

### 前提条件
- **Node.js**: 20.0.0以上
- **npm**: 10.0.0以上
- **Go**: 1.25以上
- **Docker**: 最新版
- **Docker Compose**: v2以上

### ローカル開発環境構築

```bash
# リポジトリのクローン
git clone <repository-url>
cd movie-star

# 依存関係のインストール
npm install

# データベースの起動
npm run db:up

# 開発サーバーの起動（フロントエンド + バックエンド）
npm run dev
```

アクセス可能なサービス：
- **Web UI**: http://localhost:3000
- **APIエンドポイント**: http://localhost:8080
  - ヘルスチェック: `/healthz`
  - サンプルデータ: `/api/v1/movies`

### Docker環境での起動

```bash
# 全サービスを一度に起動
docker compose up --build

# バックグラウンド実行
docker compose up -d --build

# ホットリロード（Docker 25+）
docker compose watch
```

## 📜 開発コマンド

### プロジェクト全体
```bash
# 開発サーバー起動（フロントエンド + バックエンド）
npm run dev

# 本番ビルド
npm run build

# クリーンインストール
npm ci
```

### フロントエンド開発
```bash
# Next.js開発サーバー（単独起動）
npm run web:dev

# 本番ビルド
npm run web:build

# コードチェック
npm run web:lint

# 型チェック
npm run web:type-check
```

### バックエンド開発
```bash
# Go開発サーバー（単独起動）
npm run api:dev

# テスト実行
npm run api:test

# コード品質チェック
npm run api:lint

# Goモジュール更新
go mod tidy
```

### データベース管理
```bash
# データベース起動
npm run db:up

# データベース停止
npm run db:down

# データベース初期化（初回のみ）
docker compose exec db psql -U movie_star -d movie_star -f /docker-entrypoint-initdb.d/00-init.sql
```

## ⚙️ 環境設定

### 環境変数設定

プロジェクトルートに`.env`ファイルを作成し、以下の変数を設定してください：

```bash
# データベース設定
DATABASE_URL=postgres://movie_star:movie_star@localhost:5432/movie_star?sslmode=disable

# API設定
API_HOST=0.0.0.0
API_PORT=8080
APP_ENV=development

# フロントエンド設定
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

### 設定項目詳細

#### データベース設定 (`apps/api/internal/config/config.go`)
| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `DATABASE_URL` | `postgres://movie_star:movie_star@localhost:5432/movie_star?sslmode=disable` | PostgreSQL接続文字列 |
| `DATABASE_MAX_CONNS` | `8` | 最大接続数 |
| `DATABASE_MAX_CONN_IDLE_TIME` | `5m` | 接続アイドルタイムアウト |

#### APIサーバー設定
| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `API_HOST` | `0.0.0.0` | バインドアドレス |
| `API_PORT` | `8080` | ポート番号 |
| `API_READ_TIMEOUT` | `15s` | リードタイムアウト |
| `API_WRITE_TIMEOUT` | `15s` | ライトタイムアウト |
| `API_IDLE_TIMEOUT` | `60s` | アイドルタイムアウト |

## 🔧 カスタマイズと拡張

### データベーススキーマの変更

1. 新しいマイグレーションを作成
2. `apps/api/internal/database/`にモデルを追加
3. HTTPハンドラーを実装

### APIエンドポイントの追加

```go
// apps/api/internal/http/handler/new_endpoint.go
func NewEndpoint(db *pgxpool.Pool) gin.HandlerFunc {
    return func(c *gin.Context) {
        // ビジネスロジックを実装
    }
}
```

### フロントエンドコンポーネントの追加

```tsx
// apps/web/src/app/_components/new-component.tsx
export function NewComponent() {
    return (
        <div>
            {/* コンポーネント実装 */}
        </div>
    );
}
```

## 🧪 テスト

### バックエンドテスト
```bash
# ユニットテスト
go test ./apps/api/...

# カバレッジレポート付きテスト
go test -cover ./apps/api/...

# ベンチマークテスト
go test -bench=. ./apps/api/...
```

### フロントエンドテスト（今後追加予定）
```bash
# JestやPlaywrightなどのテストフレームワークを導入
npm run test
npm run test:e2e
```

## 🚢 デプロイ

### 本番環境構築

1. **環境変数の設定**
```bash
APP_ENV=production
DATABASE_URL=<本番DB接続文字列>
NEXT_PUBLIC_API_BASE_URL=<本番API URL>
```

2. **ビルドと起動**
```bash
# フロントエンドビルド
npm run web:build

# 本番コンテナ起動
docker compose -f docker-compose.prod.yml up -d --build
```

### 推奨デプロイ構成

- **逆プロキシ**: nginxまたはTraefik
- **SSL/TLS**: Let's Encrypt (cert-manager)
- **監視**: Prometheus + Grafana
- **ログ収集**: ELK StackまたはLoki
- **CI/CD**: GitHub ActionsまたはGitLab CI

## 🤝 開発ガイドライン

### コーディング規約

#### Go言語
- [Effective Go](https://golang.org/doc/effective_go.html)ガイドライン準拠
- `golangci-lint`によるコード品質チェック
- ユニットテスト必須（関数・メソッド単位）

#### TypeScript/JavaScript
- ESLint + Prettierによるコードフォーマット
- 厳密な型チェック（`strict: true`）
- カスタムフックやユーティリティ関数は積極的に活用

### コミットメッセージ規約
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

タイプ: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### プルリクエストプロセス
1. 機能ブランチを作成（`feature/機能名`または`fix/バグ名`）
2. テストを記述・実行
3. コードレビューを依頼
4. mainブランチにマージ

## 📊 パフォーマンス最適化

### バックエンド最適化
- データベース接続プーリング設定の調整
- クエリ最適化（インデックス、クエリプラン確認）
- レスポンスキャッシュの実装

### フロントエンド最適化
- 画像最適化（Next.js Image）
- コード分割（Dynamic Import）
- バンドルサイズ監視

### 監視とメトリクス
- APIレスポンスタイム監視
- データベースクエリパフォーマンス追跡
- エラーレートとスループットのモニタリング

## 🔒 セキュリティ

### 認証・認可
- JWTトークンベース認証の実装準備済み
- ロールベースアクセス制御（RBAC）の基盤

### データ保護
- パスワードハッシュ化（bcrypt）
- SQLインジェクション対策（Prepared Statements）
- XSS対策（入力サニタイズ）

### インフラセキュリティ
- コンテナセキュリティ（非rootユーザー実行）
- ネットワーク分離（内部・外部ネットワーク）
- シークレット管理（環境変数・Secret Manager）

## 🐛 トラブルシューティング

### よくある問題と解決策

#### データベース接続エラー
```bash
# データベースが起動しているか確認
docker compose ps

# データベースログを確認
docker compose logs db

# データベース接続テスト
docker compose exec db pg_isready -U movie_star
```

#### ポート競合
```bash
# 使用中のポートを確認
netstat -tulpn | grep :3000
netstat -tulpn | grep :8080

# 代替ポートを使用する場合
API_PORT=8081 npm run dev
```

#### 依存関係の問題
```bash
# キャッシュクリア
npm run clean
rm -rf node_modules package-lock.json
npm install

# Goモジュール再構築
cd apps/api
go clean -modcache
go mod download
```

## 📚 追加リソース

### 公式ドキュメント
- [Next.jsドキュメント](https://nextjs.org/docs)
- [Ginフレームワークガイド](https://gin-gonic.com/docs/)
- [PostgreSQLマニュアル](https://postgresql.org/docs/)
- [Docker Composeリファレンス](https://docs.docker.com/compose/)

### 学習リソース
- [Go言語公式チュートリアル](https://golang.org/doc/tutorial/)
- [React公式ドキュメント](https://react.dev/learn)
- [TypeScriptハンドブック](https://typescriptlang.org/docs/)

### コミュニティ
- [GoコミュニティSlack](https://gophers.slack.com/)
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/go+next.js)

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご参照ください。

## 👥 貢献

貢献はいつでも歓迎します！以下の方法で参加できます：

1. Issueの報告・修正
2. 機能リクエストの提案
3. ドキュメントの改善
4. コード貢献（プルリクエスト）

詳細な貢献ガイドラインは[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

---

**Movie Star**は、モダンなウェブアプリケーション開発を加速させるための基盤を提供します。質問や提案があれば、遠慮なくIssueを作成してください！ 🎬✨
