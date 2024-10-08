// 讀取 JSON 格式的資料，從指定網址
fetch('./0927.json')// 讀取 JSON 格式的資料，從指定網址
.then(response => response.json())
.then(jsonData => {
    
    // 處理 "Num": "0" 的資料 (上面第一塊)
    let chartTotal = document.querySelector('.top-Total');
    const numZeroData = jsonData.Sub.find(sub => sub.Num === "0");

    if (numZeroData) {
        numZeroData.boby.forEach(department => {
            // 總巡查數量
            let firstItem = department.TypeCount[0];
            let firstDiv = document.createElement('div');
            firstDiv.className = 'chart__amount';
            firstDiv.innerHTML = `
                <h2>${firstItem.Title}</h2>
                <p><mark class="gray">${firstItem.Count}</mark>件</p>
            `;
            chartTotal.appendChild(firstDiv);
    
            // 累計巡查數量
            let secondItem = department.TypeCount[1];
            let secondDiv = document.createElement('div');
            secondDiv.className = 'chart__amount';
            secondDiv.innerHTML = `
                <h2>${secondItem.Title}</h2>
                <p><mark class="blue">${secondItem.Count}</mark>件</p>
            `;
            chartTotal.appendChild(secondDiv);
        });
    }


    // "已巡查"、"待巡查"、"未分派" 的資料
    let topGroup = document.querySelector('.top-group'); // 放在 top-group 裡面
    if (numZeroData) {
        numZeroData.boby.forEach(department => {
            department.TypeCount.forEach(item => {
                if (item.Title === "已巡查" || item.Title === "待巡查" || item.Title === "未分派") {
                    let div = document.createElement('div');
                    div.className = 'chart__amount';

                    // item.Title
                    let color;
                    if (item.Title === "已巡查") {
                        color = '#5d79ab';
                    } else if (item.Title === "待巡查") {
                        color = '#F00';
                    } else if (item.Title === "未分派") {
                        color = '#aabc7e';
                    }

                    // 裡面的架構
                    div.innerHTML = `
                        <h2 style="font-weight: bold; color: ${color};">${item.Title}</h2>
                        <p class="pr_s"><span class="bigspan">${item.Count}</span>件</p>
                    `;

                    topGroup.appendChild(div);
                }
            });
        });
    }

    // 處理 "Num": "1" 的資料 (下面第二塊)
    const itemsContainer = document.querySelector('.items'); // 放在 items 裡面
    const numOneData = jsonData.Sub.find(sub => sub.Num === "1");

    if (numOneData) {
        numOneData.boby.forEach(department => {
            const itemDiv = document.createElement('div');

            // 分科室的顏色
            let borderColorClass;
            if (department.Type === "河川管理科") {
                borderColorClass = 'border__color-1';
            } else if (department.Type === "河川工程科") {
                borderColorClass = 'border__color-2';
            } else {
                borderColorClass = 'border__color-3';
            }
            itemDiv.className = `item ${borderColorClass}`;

            // 找到對應的 TypeCount 並讀 Count
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

            itemsContainer.appendChild(itemDiv);
        });
    }
})
.catch(error => console.error('Error loading JSON:', error));
