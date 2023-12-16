# Discord Bot

 Discord.js v14와 JavaScript로 만들어진 디스코드 봇입니다. <br />
 이 봇은 OpenAI API를 활용해 디스코드 서버 내에서 지적인 AI 역할을 제공합니다.

## 특징

- **Discord.js v14:** Discord.js의 최신 버전을 활용하여 성능과 안정성을 향상시킵니다.
- **OpenAI 통합:** OpenAI API를 활용하여 디스코드 내에서 AI 기능을 제공합니다.
- **지능적인 AI 역할:** 사용자 상호작용에 지적으로 응답하는 AI 역할과 상호작용합니다.

## 설치

1. 리포지토리 클론: `git clone https://github.com/lofi-J/discord-bot.git`
2. 의존성 설치: `npm install`

## 설정

1. 루트 디렉토리에 `.env` 파일 생성
2. `.env` 파일에 디스코드 봇 토큰 추가: `DISCORD_TOKEN=your-bot-token`
3. `.env` 파일에 APPLICATION ID 추가 : `CLIENT_ID=your-app-id`
4. `.env` 파일에 discord key 추가 : `DISCORD_KEY=your-discord-key`
3. `.env` 파일에 OpenAI API 키 추가: `OPENAI_API_KEY=your-openai-api-key`
4. `.env` 파일에 길드 ID 추가: `GUILD_ID=your-guild-id` (길드ID는 서버 우클릭 시 확인 가능)


## 사용법

```bash
npm start
