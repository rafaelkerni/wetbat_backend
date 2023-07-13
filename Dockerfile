# Primeiro estágio - Base Node com TypeScript
FROM node:18-alpine as base

WORKDIR /app

COPY package.json knexfile.ts ./

RUN yarn install

COPY . .

# Segundo estágio - Build do TypeScript
FROM base as build

RUN yarn build

# Terceiro estágio - Produção
FROM node:18-alpine as production

WORKDIR /app

COPY --from=base /app/package.json ./ 
COPY --from=base /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=base /app/knexfile.ts ./knexfile.js 

EXPOSE 3000

CMD ["node", "dist/server.js"]
