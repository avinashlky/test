document.addEventListener('DOMContentLoaded', () => {
    const noticeForm = document.getElementById('noticeForm');
    const noticeList = document.getElementById('notice-list');

    // Fetch and display existing notices from the backend
    async function fetchNotices() {
        const response = await fetch('http://localhost:5000/api/notices');
        const notices = await response.json();

        noticeList.innerHTML = '';
        notices.forEach(notice => {
            const noticeItem = document.createElement('div');
            noticeItem.className = 'notice-item';
            noticeItem.innerHTML = `
                <h3>${notice.title}</h3>
                <p>${notice.description}</p>
            `;
            noticeList.appendChild(noticeItem);
        });
    }

    const token = localStorage.getItem('token'); // Make sure you store the token on login

await fetch('http://localhost:5000/api/notices', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Include the token here
  },
  body: JSON.stringify({ title, description, department })
});


    // Handle form submission to add a new notice
    // noticeForm.addEventListener('submit', async (e) => {
    //     e.preventDefault();
        
    //     const title = document.getElementById('title').value;
    //     const description = document.getElementById('description').value;


    
    //     await fetch('http://localhost:5000/api/notices', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ title, description })
    //     });

    //     // Refresh the notice list after adding a new notice
    //     fetchNotices();

    //     // Clear the form
    //     noticeForm.reset();
    // });

    noticeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
    
        const response = await fetch('http://localhost:5000/api/notices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
    
        if (!response.ok) {
            console.error('Failed to post notice:', response.statusText);
            return;
        }

    // Initially fetch and display notices
    fetchNotices();
});
