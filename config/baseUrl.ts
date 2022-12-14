/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:10:53
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-13 17:03:20
 * @Description: 主路由配置
 */
export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cxy-home.netlify.app'
export const activityUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://cxy-home-activity.netlify.app'
export const competitionUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : `https://cxy-home-competition.netlify.app`
export const loginUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : `https://cxy-home-login.netlify.app`