# 一起搭獨立網站

正式網址：https://waisun1021.github.io/

2026-10-03 更新：首頁直接由 GitHub Pages 提供 HTML/CSS/JavaScript，不使用 iframe。三種共乘模式、公式、繁中英文、深淺色、手動距離和分享功能均在同一頁執行。

每個地點旁的「Google 搜尋」按鈕呼叫既有 Google Apps Script v5 Maps Geocoder，讓使用者選擇地址並核對位置；這不是逐字即時 Places 自動完成。沒有新增 API 金鑰或計費服務。地址服務可能僅回傳一筆或近似結果。

所有行程依使用者用箭頭確認的停靠順序計算，不依遠近排序、不宣稱最短路線。第一個上車的人是建議叫車者；共同上車時任一乘客都可叫車。分帳結果保留乘客身份。網站不實際叫車。

自動查詢僅送地點、模式、語言和 ordered 標記；地址搜尋只送搜尋文字及語言。姓名和車資只在瀏覽器處理，不保存行程。手動距離仍在本機計算，但按地址搜尋仍會送出該地點。JSONP callback 限制、逾時與過期回應防護保留。

Google Apps Script 來源保留在私人 taxi-split-web 儲存庫。AdSense 程式碼與 ads.txt 已設定並送審，放送須經 Google 核准。
