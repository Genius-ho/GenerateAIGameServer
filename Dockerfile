# FROM node:16
# 깨끗한 가상 컴퓨터 가져와라

# WORKDIR /nest
# 도커 안에서 작업은 NEST 폴더로 하겠다
# COPY package*.json ./
# 라이브러리들이 필요한지 목록표만 먼저 도커 작업장으로 복사해라
# RUN npm install
# 전부 다운로드해서 설치해라
# COPY . .
# 모든 소스코드를 도커 작업장으로 복사해라
# RUN npm install -g @nestjs/cli && npm install -D concurrently
# 서버 관리 도구를 추가 설치해라

# EXPOSE 3000
# 3000번 포트를 개방해라

# CMD ["npm", "run", "start:dev"]
# 준비가 끝나고 도커가 켜지면 마지막으로 게임서버를 켜라


# 1. 가볍고 빠른 최신 Node 22 알파인 버전을 가져옵니다.
FROM node:22-alpine

# 2. bcrypt 등 특수 모듈 설치에 필요한 빌드 도구들을 미리 설치합니다. (오타 수정됨)
RUN apk add --no-cache python3 g++ make

# 3. 도커 안에서의 작업 폴더를 /nest 로 지정합니다.
WORKDIR /nest

# 4. 부품 목록표(package.json)만 먼저 복사합니다.
COPY package*.json ./

# 5. 목록에 있는 라이브러리들을 설치하고, bcrypt를 현재 환경에 맞춰 재조립합니다.
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# 6. 나머지 모든 게임 소스 코드를 복사합니다.
COPY . .

# 7. 서버 관리 도구 및 동시 실행 도구를 설치합니다.
RUN npm install -g @nestjs/cli && npm install -D concurrently

# 8. 게임 접속용(3000) 및 VS Code 디버깅용(9229) 포트를 개방합니다.
EXPOSE 3000
EXPOSE 9229

# 9. VS Code 디버깅이 가능하도록 개발 모드로 게임 서버를 켭니다.
CMD ["npm", "run", "start:dev"]