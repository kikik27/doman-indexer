# Doman Indexer

Blockchain indexer service for the ScamReporter smart contract on Base Sepolia testnet. Indexes on-chain scam report and scam vote events, then exposes the data through GraphQL and SQL APIs.

Built with [Ponder](https://ponder.sh/) — a TypeScript-based blockchain indexing framework.

## Architecture

```mermaid
flowchart TD
    SC["Smart Contract\n(ScamReporter)"] -->|ScamVoteSubmitted| IDX
    SC -->|ScamReportSubmitted| IDX

    subgraph IDX["Ponder Indexer"]
        EH["Event Handlers"]
    end

    EH -->|upsert user| DB[("Database\nSQLite / PostgreSQL")]
    EH -->|insert scam_vote| DB
    EH -->|insert scam_report| DB

    DB --> API["Hono API Server"]

    API --> GQL["/graphql\nGraphQL Endpoint"]
    API --> ROOT["/\nGraphQL Alias"]
    API --> SQL["/sql/*\nSQL Query Endpoint"]
```

## Indexed Data

| Table | Description |
|---|---|
| `user` | Wallet addresses with vote & report counts |
| `scam_vote` | Scam votes on specific targets |
| `scam_report` | Scam reports submitted by users |

### Monitored Events

- **ScamVoteSubmitted** — Vote on whether a target is a scam
- **ScamReportSubmitted** — New scam report submitted by a user

## Tech Stack

- **Ponder** v0.16.6 — Blockchain indexing framework
- **Hono** — Web framework for API
- **Viem** — Ethereum interaction library
- **TypeScript**
- **SQLite** (default) / **PostgreSQL** (optional)

## Prerequisites

- Node.js >= 18.14
- npm

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Or create `.env.local` manually:

```env
# RPC URL for Base Sepolia (required)
PONDER_RPC_URL_84532=https://sepolia.base.org

# PostgreSQL connection string (optional, defaults to SQLite)
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### 3. Run the indexer

```bash
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run indexer in development mode |
| `npm run start` | Run indexer in production mode |
| `npm run codegen` | Generate TypeScript types from schema |
| `npm run db` | Database management commands |
| `npm run serve` | Start API server only |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

## Smart Contract

| Property | Value |
|---|---|
| Name | ScamReporter |
| Network | Base Sepolia (Chain ID: 84532) |
| Address | `0x574F67B22B49eFd39D03F51627fA79CEB4a2449C` |
| Start Block | 40726553 |

### Contract History

| Version | Address | Status |
|---|---|---|
| v1 | `0x65534f1A1BbCa98AD756c7CE38D7097fBA7C237a` | Deprecated |
| v2 (current) | `0x574F67B22B49eFd39D03F51627fA79CEB4a2449C` | Active |

## Project Structure

```mermaid
graph LR
    subgraph Root["doman-indexer"]
        ABIS["abis/"]
        ABI_FILE["ScamReportAbi.ts"]
        SRC["src/"]
        API["api/index.ts"]
        HANDLER["ScamReporter.ts"]
        GEN["generated/"]
        GQL_SCHEMA["schema.graphql"]
        CONFIG["ponder.config.ts"]
        SCHEMA["ponder.schema.ts"]
        PKG["package.json"]
        TS["tsconfig.json"]
        NIX["nixpacks.toml"]
        NODE[".node-version"]
    end

    ABIS --> ABI_FILE
    SRC --> API
    SRC --> HANDLER
    GEN --> GQL_SCHEMA
```

```
doman-indexer/
├── abis/
│   └── ScamReportAbi.ts        # Smart contract ABI
├── src/
│   ├── api/
│   │   └── index.ts            # GraphQL & SQL API endpoints
│   └── ScamReporter.ts         # Event handler indexing logic
├── generated/
│   └── schema.graphql          # Auto-generated GraphQL schema
├── ponder.config.ts            # Ponder config (chain & contract)
├── ponder.schema.ts            # Database schema definition
├── package.json
├── tsconfig.json
├── nixpacks.toml               # Railway deployment config
└── .node-version               # Node.js version (20)
```

## API Usage

### GraphQL

```bash
curl -X POST http://localhost:42069/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ scamVotes { items { reporter targetId isScam } } }"}'
```

### SQL

```bash
curl http://localhost:42069/sql/scam_vote
```

## Deployment

This project is configured for deployment on **Railway** using Nixpacks. The start command is set to `npx ponder start`.

### Deploy to Railway

1. Connect the repository to Railway
2. Set the `PONDER_RPC_URL_84532` environment variable with your RPC URL
3. (Optional) Set `DATABASE_URL` to use PostgreSQL
4. Deployment runs automatically

## License

Private
