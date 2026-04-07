# Agent Guidance

## Dev Commands

```bash
pnpm install          # install deps
pnpm run build        # compile to dist/
pnpm run start        # production
pnpm run start:dev    # watch mode
pnpm run lint         # eslint --fix
pnpm run format       # prettier --write
pnpm run test         # unit tests (root: src/, pattern: *.spec.ts)
pnpm run test:e2e     # e2e tests (root: test/, pattern: *.e2e-spec.ts)
```

## Prisma

- Schema: `prisma/schema.prisma`
- Generated client outputs to `generated/prisma` (NOT `node_modules/@prisma/client`)
- Run `prisma generate` after schema changes
- `prisma.config.ts` loads `DATABASE_URL` from `.env` via `dotenv/config`

## Testing

- Unit tests: `src/**/*.spec.ts` (Jest rootDir: `src`)
- E2E tests: `test/**/*.e2e-spec.ts` (Jest rootDir: `test`, uses separate `test/jest-e2e.json`)
- E2E tests require a running database

## Architecture

- NestJS app entry: `src/main.ts`
- Root module: `src/app.module.ts`
- Port from `process.env.PORT ?? 3000`

## Style

- Prettier: single quotes, trailing commas
- ESLint: `typescript-eslint` + `eslint-plugin-prettier/recommended`
- ESLint `sourceType: 'commonjs'` despite tsconfig `module: "nodenext"`

## Key Dependencies

- `@prisma/adapter-pg` + `pg` for Postgres
- Prisma v7 with config-based setup (`prisma.config.ts`)
