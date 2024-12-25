fetch('./chat.json')
    .then(response => response.json())
    .then(conversations => {
        const chatContainer = document.getElementById('chat-container');
        let lastDate = '';

        conversations.forEach(conversation => {
            if (conversation.date !== lastDate) {
                const dateElement = document.createElement('div');
                dateElement.classList.add('date');
                dateElement.textContent = `${conversation.date} (${conversation.day})`;
                chatContainer.appendChild(dateElement);
                lastDate = conversation.date;
            }

            conversation.messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');

                const senderElement = document.createElement('div');
                senderElement.classList.add('sender');
                senderElement.textContent = message.sender;

                const timeElement = document.createElement('div');
                timeElement.classList.add('time');
                timeElement.textContent = message.time;

                const contentElement = document.createElement('div');
                contentElement.classList.add('content');
                contentElement.textContent = message.content;

                if (message.sender === "楊惠瓘") {
                    messageElement.classList.add('right');
                }

                messageElement.appendChild(senderElement);
                messageElement.appendChild(timeElement);
                messageElement.appendChild(contentElement);

                chatContainer.appendChild(messageElement);
            });
        });
    })
    .catch(error => console.error('Error loading chat data:', error));