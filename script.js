const backendURL = 'https://your-api-endpoint.com/resources';

async function submitResource() {
  const title = document.getElementById('title').value.trim();
  const url = document.getElementById('url').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !url || !description) {
    alert('Please fill out all fields.');
    return;
  }

  try {
    await axios.post(backendURL, { title, url, description });
    loadResources();
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
    document.getElementById('description').value = '';
  } catch (error) {
    alert('Error submitting resource.');
    console.error(error);
  }
}

async function loadResources() {
  try {
    const response = await axios.get(backendURL);
    const list = document.getElementById('resourceFeed');
    list.innerHTML = '';
    response.data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong><a href="${item.url}" target="_blank">${item.title}</a></strong><br><small>${item.description}</small>`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading resources:', error);
  }
}

window.onload = loadResources;