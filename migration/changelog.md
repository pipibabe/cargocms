# change log

## v1

### User 欄位變動



### Recipe 欄位變動

## v2

## 修正訂單編號

* 修正沒有使用歐付寶時有 TradeNo

### Feed 欄位變動

* 新增 createdTime 紀錄 feed 在 facebook 的建立時間
* 新增 publish 紀錄 feed 是否發布

### Message 欄位變動

*  type 新增 forgotPassword enum

### User 欄位變動

* 新增 resetPasswordToken 紀錄忘記密碼的 token
* 新增 birthday、phone1、phone2、address、address2、lastLoginIP、lastLoginLat、lastLoginLng

### 新增 Contacts Table

* 新增 Contacts Table 用於聯繫表單


### 新增 Event 相關 Table

* 新增 EventOrders
* 新增 Events
* Post type 新增 'internal-event','external-event' enum
* Post url 清空目前沒有地方有用到
* Post url 改名為 alias 放 url 別名


## v3

### 紀錄方式改變

* 更新 Image 的格式
原本 `local` 的紀錄格式由 `/home/ubuntu/cargocms/.tmp/public/uploads/<<filename>>`，更新為 `file:///home/ubuntu/cargocms/.tmp/public/uploads/<<filename>>`

### Message 欄位變動

*  type 新增 contact enum


## v4
### 新增 UserFeeling 紀錄使用者回饋的感覺

### 新增 RecipeOrders 欄位
* 新增 shipping 運送物流
* 新增 trackingNumber 物流編號

### RecipeOrder 新增訂單 token

## v5
### RecipeOrders 欄位變動
* 新增 deletedAt 確保訂單刪除資料還會保留

### Allpays 欄位變動
* 新增 deletedAt 確保訂單刪除資料還會保留

### RecipeOrder token 使用 UNIQUE
### EventOrder token 使用 UNIQUE

### Feed 欄位變動
* 修改 description 型態 STRING 修改為 TEXT
* 修改 message 型態 STRING 修改為 TEXT

### ScentFeedback 欄位變動
* 新增 feedbackCheck 確認 回饋內容 寫入 Scent 資料庫

## v6


### 新增 verification Email Token

### Post 欄位增加
* Post 增加 publish 型態 BOOLEAN，預設 true

### Slogans 表格移除

### 新增 Quotes 表格

### RecipeOrder 欄位資料變動
* productionStatus 增加 "PENDING"

### EventOrder 欄位資料變動
* productionStatus 增加 "PENDING"


### Feed 欄位變動
* 修改 fullPicture 欄位 型態 STRING 修改為 TEXT
* type 欄位等於 'status'，將 publish欄位 修改為 false
