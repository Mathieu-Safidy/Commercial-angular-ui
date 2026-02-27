# 1️⃣ Build Angular
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# 2️⃣ Serve avec nginx
FROM nginx:alpine

COPY --from=build /app/dist/Commercial-angular-kit/browser/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]