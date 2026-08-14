async function loadProfile(){
  const container = document.getElementById('profile-container')
  if (!container) {
    console.error("Error: HTML me 'profile-container' id nahi mila!");
    return;
  }

  try {
    const response = await fetch ('/api/profile/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    credentials: 'same-origin'
  })

    if (response.status === 403 || response.status === 401) {
      container.innerHTML = `
        <div class="error-card">
          <p>⚠️ Aap logged in nahi hain! Profile dekhne ke liye login karein.</p>
          <a href="/login/" class="btn">Log In</a>
        </div>
      `;
      return;
    }

    if (!response.ok){
        throw new Error (` HTTP error! status: ${response.status}`);
    }
    const profile = await response.json();
    container.innerHTML = `
    
      <div class="profile-card">
        <h2>${profile.username}</h2>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Name:</strong> ${profile.first_name} ${profile.last_name}</p>
      </div>
    `;
  }catch (error) {
    console.error('Profile load nahi ho paya:', error);
    container.innerHTML = `<p style="color:red;">Profile data load karne me dikkat aayi.</p>`;
  }

}

loadProfile();