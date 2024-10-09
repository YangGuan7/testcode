// 當 DOM 內容加載完成後執行此函數
document.addEventListener('DOMContentLoaded', function() {
    // 選取所有具有 class 'js-stepWrap' 的 section 元素
    const sections = document.querySelectorAll('.js-stepWrap');
    
    // 定義一個物件來儲存所有按鈕的引用
    const buttons = {
        back: document.getElementById('Button8'),    // 上一頁按鈕
        save: document.getElementById('Button1'),    // 暫時儲存按鈕
        next: document.getElementById('Button9'),    // 下一頁按鈕
        submit: document.getElementById('Button3'),  // 陳核按鈕
        reject: document.getElementById('Button4'),  // 退文按鈕
        execute: document.getElementById('Button5')  // 決行按鈕
    };

    // 定義一個函數來更新按鈕的顯示狀態
    function updateButtons(currentStep) {
        buttons.back.classList.toggle('none', currentStep <= 1);
        buttons.back.classList.toggle('active', currentStep > 1);
      
        buttons.save.classList.toggle('none', currentStep <= 1);
        buttons.save.classList.toggle('active', currentStep > 1);
      
        buttons.next.classList.toggle('none', currentStep >= 4);
        buttons.next.classList.toggle('active', currentStep < 4);
      
        buttons.submit.classList.toggle('none', currentStep !== 4);
        buttons.submit.classList.toggle('active', currentStep === 4);
      
        buttons.reject.classList.toggle('none', currentStep !== 4);
        buttons.reject.classList.toggle('active', currentStep === 4);
      
        buttons.execute.classList.toggle('none', currentStep !== 4);
        buttons.execute.classList.toggle('active', currentStep === 4);
    }

    // 初始化當前步驟為 1
    let currentStep = 1;
    // 更新按鈕的顯示狀態
    updateButtons(currentStep);

    // 為 '下一頁' 按鈕添加點擊事件監聽器
    buttons.next.addEventListener('click', function() {
        // 如果當前步驟小於 4，則進行以下操作
        if (currentStep < 4) {
            // 隱藏當前步驟的 section
            sections[currentStep - 1].style.display = 'none';
            // 顯示下一步驟的 section
            sections[currentStep].style.display = 'block';
            // 將當前步驟加 1
            currentStep++;
            // 更新按鈕的顯示狀態
            updateButtons(currentStep);
        }
    });

    // 為 '上一頁' 按鈕添加點擊事件監聽器
    buttons.back.addEventListener('click', function() {
        // 如果當前步驟大於 1，則進行以下操作
        if (currentStep > 1) {
            // 隱藏當前步驟的 section
            sections[currentStep - 1].style.display = 'none';
            // 顯示前一步驟的 section
            sections[currentStep - 2].style.display = 'block';
            // 將當前步驟減 1
            currentStep--;
            // 更新按鈕的顯示狀態
            updateButtons(currentStep);
        }
    });
});