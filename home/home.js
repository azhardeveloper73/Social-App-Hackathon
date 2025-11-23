const currentUser = getCurrentUser();
if(!currentUser) window.location.href = '../auth/login.html';

document.getElementById('userName').textContent = currentUser.name;

const postBtn = document.getElementById('postBtn');
const postText = document.getElementById('postText');
const postImage = document.getElementById('postImage');
const feed = document.getElementById('feed');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const toggleMode = document.getElementById('toggleMode');

let posts = getPosts();
let editingIndex = null;

function getFormattedDate() {
  const now = new Date();
  return now.toLocaleString();
}

toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleMode.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.getElementById('logoutBtn').addEventListener('click', logout);


function renderPosts(filteredPosts = posts) {
  feed.innerHTML = '';
  filteredPosts.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    postEl.innerHTML = `
      <div class="post-header">
        <strong>${post.user}</strong> • <span>${post.date}</span>
      </div>
      <div class="post-text">${post.text}</div>
      ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
      <div class="post-actions">
        <button class="like-btn" data-index="${index}">❤️ ${post.likes}</button>
        <button class="edit-btn" data-index="${index}">✏️</button>
        <button class="delete-btn" data-index="${index}">🗑️</button>
        <button class="react-btn" data-index="${index}" data-emoji="😂">😂</button>
        <button class="react-btn" data-index="${index}" data-emoji="👍">👍</button>
        <button class="react-btn" data-index="${index}" data-emoji="🔥">🔥</button>
      </div>
      <div class="reactions">${post.reactions ? post.reactions.join(' ') : ''}</div>
    `;
    feed.appendChild(postEl);
  });

  attachPostEventListeners();
}


function attachPostEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.dataset.index;
      openEditModal(index);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.dataset.index;
      if(confirm("Delete this post?")){
        posts.splice(index,1);
        setPosts(posts);
        renderPosts();
      }
    });
  });

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.dataset.index;
      posts[index].likes = posts[index].likes ? 0 : 1;
      setPosts(posts);
      renderPosts();
    });
  });

  document.querySelectorAll('.react-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.dataset.index;
      const emoji = e.target.dataset.emoji;
      if(!posts[index].reactions) posts[index].reactions = [];
      posts[index].reactions.push(emoji);
      setPosts(posts);
      renderPosts();
    });
  });
}


postBtn.addEventListener('click', () => {
  const text = postText.value.trim();
  const image = postImage.value.trim();
  if(!text) return alert("Post cannot be empty!");

  const newPost = {
    user: currentUser.name,
    text,
    image: image || '',
    likes: 0,
    date: getFormattedDate(),
    reactions: []
  };

  posts.unshift(newPost);
  setPosts(posts);
  postText.value = '';
  postImage.value = '';
  renderPosts();
});


function openEditModal(index){
  editingIndex = index;
  const modal = document.getElementById('editModal');
  const editText = document.getElementById('editText');
  editText.value = posts[index].text;
  modal.style.display = 'block';
}

document.getElementById('saveEdit').addEventListener('click', () => {
  const editText = document.getElementById('editText').value.trim();
  if(editText && editingIndex !== null){
    posts[editingIndex].text = editText;
    setPosts(posts);
    editingIndex = null;
    document.getElementById('editModal').style.display = 'none';
    renderPosts();
  }
});

document.getElementById('cancelEdit').addEventListener('click', () => {
  editingIndex = null;
  document.getElementById('editModal').style.display = 'none';
});


searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  renderPosts(posts.filter(p => p.text.toLowerCase().includes(q)));
});


sortSelect.addEventListener('change', () => {
  const val = sortSelect.value;
  let sorted = [...posts];
  if(val === 'latest') sorted.sort((a,b) => new Date(b.date) - new Date(a.date));
  else if(val === 'oldest') sorted.sort((a,b) => new Date(a.date) - new Date(b.date));
  else if(val === 'mostLiked') sorted.sort((a,b) => b.likes - a.likes);
  renderPosts(sorted);
});


renderPosts();
