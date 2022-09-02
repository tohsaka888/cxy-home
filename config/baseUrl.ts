export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cxy-home.vercel.app'
export const activityUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://cxy-home-activity.vercel.app'
export const competitionUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : `https://cxy-home-competition.vercel.app`
export const loginUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : `https://cxy-home-login.vercel.app`