FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Initialize an empty SQLite schema; local databases are excluded from the context.
RUN DATABASE_URL=file:./app.db pnpm db:push && pnpm build
# The startup loader imports Papa Parse outside the bundled Next.js server.
RUN cp -RL node_modules/papaparse /tmp/papaparse

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/app.db ./app.db
COPY --from=build /tmp/papaparse ./node_modules/papaparse
COPY --from=build /app/scripts/load.ts ./scripts/load.ts
COPY --from=build /app/src/modules/signals/score.ts ./src/modules/signals/score.ts
EXPOSE 3000
CMD ["sh", "-ec", "if [ -f \"${DATA_DIR:-data/F_customer}/customers.csv\" ]; then node scripts/load.ts; fi; exec node server.js"]
