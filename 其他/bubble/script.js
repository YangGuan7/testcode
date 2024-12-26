// script.js
fetch('./chat.js')
    .then(response => response.json())
    .then(conversations => {
        const chatContainer = document.getElementById('chat-container');
        let lastDate = '';

        conversations["241225"].forEach(conversation => {
            const { time, kr, tr } = conversation;

            // 創建外層容器
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';

            // 添加韓文對話
            const krSpan = document.createElement('span');
            krSpan.className = 'kr';
            krSpan.textContent = kr;
            messageDiv.appendChild(krSpan);

            // 添加翻譯
            const trSpan = document.createElement('span');
            trSpan.className = 'tr';
            trSpan.textContent = tr;
            messageDiv.appendChild(trSpan);

            // 添加時間
            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            timeSpan.textContent = time;
            messageDiv.appendChild(timeSpan);

            // 插入到聊天容器中
            chatContainer.appendChild(messageDiv);
        });
    })
    .catch(error => console.error('Error loading chat data:', error));