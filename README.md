# JS 在折線圖上顯示每日時間序列的簡單移動平均線

簡單移動平均線的計算方法是取得資產在特定時期內的平均收盤價，即將收盤價總和除以平均移動均線的日期單位。

## 使用方式
- 把整個專案複製一份到你的電腦裡，這裡指的「內容」不是只有檔案，而是指所有整個專案的歷史紀錄、分支、標籤等內容都會複製一份下來。
```sh
$ git clone
```

----

## 畫面截圖
![](https://i.imgur.com/B8TyzEN.png)
> 簡單移動平均線計算方式為 N 天的收盤價總和再除以 N，得到第 N 天的平均數值