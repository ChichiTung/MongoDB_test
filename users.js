import { Schema, model } from 'mongoose'
import validator from 'validator'

// 建立資料庫欄位設定
const userSchema = new Schema({
  // 欄位名稱
  account: {
    // 設定資料型態是文字
    type: String,
    // 必填欄位，錯誤訊息
    required: [true, '缺少帳號'],
    // 文字長度限制
    maxlength: [20, '帳號必須是 4-20 個字'],
    minlength: [4, '帳號必須是 4-20 個字'],
    // 唯一性驗證
    unique: true,
    // 正則表達式
    match: [/^[a-zA-Z0-9]+$/, '帳號只能包含英數字'],
    // 自動去除前後空白
    trim: true
  },
  email: {
    type: String,
    required: [true, '缺少信箱'],
    unique: true,
    // 自訂驗證
    validate: {
      // 驗證 function https://www.npmjs.com/package/validator
      validator (value) {
        return validator.isEmail(value)
      },
      // 錯誤訊息
      message: '信箱格式錯誤'
    }
  }
})

// model('collection 名稱', schema)
export default model('users', userSchema)
