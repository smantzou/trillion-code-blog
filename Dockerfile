FROM node:16.17.1 as builder

WORKDIR /usr/src/app

COPY ./trillion-code-blog-api/package*.json ./

RUN npm ci 

COPY ./trillion-code-blog-api ./

RUN npx prisma generate

RUN npm run build

RUN npm prune --prod

FROM node:16.17.1-alpine3.15

# Here we would define the Node Environment variable but in the case of this POC is redundant.
# ARG NODE_ENV=${NODE_ENV}

# ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/.env ./

COPY --from=builder usr/src/app/prisma ./prisma

COPY --from=builder usr/src/app/package*.json ./

RUN addgroup -S node-user && adduser -S -g node-user node-user

USER node-user

CMD [ "node", "dist/src/main" ]