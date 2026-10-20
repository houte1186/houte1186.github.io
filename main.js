// Optional: enter your public GitHub username and email here before publishing.
// Leave a value empty to keep it off the website. Never add passwords or tokens.
const profile = { github: 'houte1186', email: '' };

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu({ restoreFocus = false } = {}) {
  const focusWasInMenu = navigation.contains(document.activeElement);
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (restoreFocus && focusWasInMenu) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu({ restoreFocus: true });
});
// Do not leave a mobile menu open after switching to a desktop layout and back.
const desktopLayout = window.matchMedia('(min-width: 701px)');
desktopLayout.addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const dialog = document.querySelector('#detail-dialog');
const notes = {
  project: { category: 'PROJECT / PERSONAL WEBSITE', title: 'A home on the web', body: '<p>This website is the first project in this collection: a personal page for Yuntao Min, prepared for GitHub Pages.</p><h3>The approach</h3><p>Plain HTML provides the structure, CSS handles the responsive layout, and JavaScript adds the mobile menu and these detail panels. No build tools or external libraries are needed.</p><h3>Designed to grow</h3><p>The introduction, project collection, and learning notes can be updated as new work becomes available. Contact links stay hidden until public contact details are supplied.</p>' },
  pages: { category: 'QUICK NOTE / GITHUB PAGES', title: 'From local files to a live website', body: '<p>A static website starts with an entry page called <code>index.html</code>, styles, and optional JavaScript. GitHub Pages can publish those files from a repository.</p><h3>The publishing path</h3><ol><li>Create a public repository named <code>USERNAME.github.io</code>, replacing USERNAME with your GitHub username.</li><li>Upload the site files to the repository root.</li><li>In Settings → Pages, choose “Deploy from a branch”, then select <code>main</code> and <code>/ (root)</code>.</li><li>Save and check the deployment result in GitHub.</li></ol><p><a href="https://docs.github.com/en/pages/quickstart" target="_blank" rel="noopener noreferrer">Read the official GitHub Pages quickstart ↗</a></p>' },
  security: { category: 'COURSE NOTE / NETWORK SECURITY', title: 'What makes a connection secure?', body: '<p>A summary of the supplied CSI205 networking lecture. Security involves several distinct goals.</p><ul><li><strong>Confidentiality:</strong> keep message contents private.</li><li><strong>Authentication:</strong> establish the identity of the communicating party.</li><li><strong>Integrity:</strong> detect unauthorized changes to a message.</li><li><strong>Availability:</strong> keep a service accessible to its intended users.</li></ul><p>Encryption, authentication protocols, and integrity checks address different parts of the problem. A firewall adds a policy boundary by allowing some traffic and blocking other traffic.</p><p>Source: the supplied “week-6 Network application and research” lecture, network security section.</p>' },
  streaming: { category: 'COURSE NOTE / ADAPTIVE STREAMING', title: 'Why video quality changes as you watch', body: '<p>A summary of the supplied lecture’s introduction to DASH: Dynamic Adaptive Streaming over HTTP.</p><h3>One video, several versions</h3><p>The server divides a video into chunks and makes them available at different bitrates. The player requests one chunk at a time and chooses a bitrate based on the conditions it observes.</p><h3>A moving balance</h3><p>Higher quality requires more data. If network throughput drops, a lower bitrate can help avoid playback stalls. The player balances quality, buffering, and smooth changes between bitrates.</p><p>Source: the supplied “week-6 Network application and research” lecture, streaming multimedia section.</p>' }
};
function showDetail(key) {
  const note = notes[key];
  document.querySelector('#dialog-category').textContent = note.category;
  document.querySelector('#dialog-title').textContent = note.title;
  document.querySelector('#dialog-body').innerHTML = note.body;
  dialog.showModal(); document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
}
document.querySelector('.project-detail').addEventListener('click', () => showDetail('project'));
document.querySelectorAll('[data-note]').forEach(button => button.addEventListener('click', () => showDetail(button.dataset.note)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#year').textContent = new Date().getFullYear();

const publicLinks = [];
if (/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(profile.github)) publicLinks.push({ label: 'GitHub ↗', href: 'https://github.com/' + encodeURIComponent(profile.github) });
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) publicLinks.push({ label: 'Email ↗', href: 'mailto:' + profile.email });
if (publicLinks.length) {
  const container = document.querySelector('#contact-links'); container.replaceChildren();
  publicLinks.forEach(item => { const link = document.createElement('a'); link.className = 'text-link'; link.textContent = item.label; link.href = item.href; container.append(link); });
  document.querySelector('#contact-description').textContent = 'Find me through the links below. Thanks for stopping by.';
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
