/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:55:34
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-15 11:44:52
 * @Description: 请填写简介
 */
declare namespace Activity {
  type Activity = {
    name: string; // 活动名称
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
    intro: string; // 活动介绍
    images: {
      url: string;
    }[]; // 活动图片
    author: string; // 活动发布者
    email: string; // 发布者邮箱
    _id: string
  }
}