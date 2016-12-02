# 進行壓力測試

## 進行方式

`npm run test-stress`

請注意每次執行這個指令，上次產生的報告都會被刪除。如果需要保留請複製出來或是產生前設定不一樣的 Tag 。

## 測試報告

你可以在 `test/stress` 裡面找到：

- `output_serverMemory.xls` ：伺服器記憶體用量的Excel檔（實際上是TXT，為了方便開啟副檔名為xls）
- `output_client` ：裡面會有 (https://artillery.io/)[] 輸出資料，包含成果與 `stdout` 、 `stderr`

## 可用環境變數

以下環境變數對誰都有效

- `export STRESS_TAG="v7"` ：將 `log 檔存到 test/stress/v7` 裡面，對照不同狀態會方便很多。

以下環境變數僅對壓力測試有效，流程測試需要直接修改 `.yaml` 才會有效。

- `export STRESS_DURATION="30"` ：將壓力測試時間改為 30 秒
- `export STRESS_RATE="30"` ：將壓力測試人數改為 30 人
- `export STRESS_NUM="10"` ：將每個人的請求數量改為 10 個
