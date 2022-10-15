FROM node:16.17.1 as builder

WORKDIR /usr/local/app

COPY ./trillion-code-blog-app /usr/local/app/

RUN npm install

RUN npm run build

RUN npm prune --prod

FROM nginx:latest

COPY --from=builder /usr/local/app/dist/ /usr/share/nginx/html

COPY ./trillion-code-blog-app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
