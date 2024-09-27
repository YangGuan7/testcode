// 讀取 json 格式
fetch('./0927.json')
    .then(response => response.json())
    .then(jsonData => {
        
        // 處理 "Num": "0" 的資料 (上面第一塊)
        let chartContainer = document.getElementById('chart-container'); // 放在 chart-container 裡面
        const numZeroData = jsonData.Sub.find(sub => sub.Num === "0"); // 讀取 Num 值為 0 的資料

        if (numZeroData) {
            numZeroData.boby.forEach(department => {
                department.TypeCount.forEach(item => {
                    let div = document.createElement('div');
                    div.className = 'chart__amount';

                    // 裡面的架構
                    div.innerHTML = `
                        <h2>${item.Title}</h2>
                        <p class="${item.color}">${item.Count}件</p>
                    `;
                    // 將 div 加到 chartContainer 裡面
                    chartContainer.appendChild(div);
                });
            });
        }

        // 處理 "Num": "1" 的資料 (下面第二塊)
        const itemsContainer = document.querySelector('.items'); // 放在 items 裡面
        const numOneData = jsonData.Sub.find(sub => sub.Num === "1"); // 讀取 Num 值為 1 的資料

        if (numOneData) {
            numOneData.boby.forEach(department => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item border__color-1';

                // 找到對應的 TypeCount 並獨到 Count
                const total = department.TypeCount.find(tc => tc.Title === "應巡查總數").Count;
                const inspected = department.TypeCount.find(tc => tc.Title === "已巡查").Count;
                const pending = department.TypeCount.find(tc => tc.Title === "待巡查").Count;
                const unassigned = department.TypeCount.find(tc => tc.Title === "未分派").Count;

                // 裡面的架構
                itemDiv.innerHTML = `
                    <div class="chart__amount row align_end">
                        <h1>${department.Type}</h1>
                        <p class="ml_auto">應巡查總數：${total}&nbsp;件</p>
                    </div>
                    <div class="chart__amount">
                        <h2>已巡查</h2>
                        <p>
                            <span class="bigspan">
                                <mark class="blue">&nbsp;&nbsp;${inspected}
                            </span>&nbsp;&nbsp;&nbsp;件
                        <p>
                    </div>
                    <div class="chart__amount">
                        <h2>待巡查</h2>
                        <p>
                            <span class="bigspan">
                                <mark class="blue">&nbsp;&nbsp;${pending}
                            </span>&nbsp;&nbsp;&nbsp;件
                        <p>
                    </div>
                    <div class="chart__amount">
                        <h2>未分派</h2>
                        <p>
                            <span class="bigspan">
                                <mark class="blue">&nbsp;&nbsp;${unassigned}
                            </span>&nbsp;&nbsp;&nbsp;件
                        <p>
                    </div>
                `;

                // 將 itemDiv 加到 itemsContainer 裡面
                itemsContainer.appendChild(itemDiv);
            });
        }
    })
    .catch(error => console.error('Error loading JSON:', error));