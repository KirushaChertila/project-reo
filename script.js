document.addEventListener('DOMContentLoaded', () => {

  // Меню при разрешении <=1200px

  const menuBtn = document.querySelector('.nav_bar-compact-btn');
  const mobileMenu = document.getElementById('mobile_menu');
  const closeBtn = document.getElementById('mobile_menu_close');
  const overlay = document.getElementById('mobile_menu_overlay');
  const menuLinks = document.querySelectorAll('.mobile_menu-link');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMenu();
    }
  });

  // Карусель при <779px у Новостей

  const newsNav = document.querySelector('.news_nav');
  
  function updateScrollHint() {
    if (window.innerWidth <= 779 && newsNav) {
      const isScrollable = newsNav.scrollWidth > newsNav.clientWidth;
      newsNav.classList.toggle('scrollable', isScrollable);
    }
  }
  
  updateScrollHint();
  window.addEventListener('resize', updateScrollHint);
  
  setTimeout(updateScrollHint, 100);

  const info_buttons = document.querySelectorAll('.information_button');
  const info_contents = document.querySelectorAll('.information_content');

  function updateContentState(btn) {
  const isMobile = window.innerWidth <= 779;
  
  info_buttons.forEach(b => b.classList.remove('active'));
  info_contents.forEach(c => {
    c.classList.remove('active');
    if (!isMobile) {
      c.classList.remove('rounded-tl');
      c.classList.remove('square-tr');
    }
  });

  btn.classList.add('active');
  const contentId = btn.id.replace('info_', 'info_content_');
  const targetContent = document.getElementById(contentId);
  
  if (targetContent) {
    targetContent.classList.add('active');
    
    if (!isMobile) {
      if (btn.id !== 'info_why') {
        targetContent.classList.add('rounded-tl');
      }
      if (btn.id === 'info_when') {
        targetContent.classList.add('square-tr');
      }
    }
  }
}

  info_buttons.forEach(btn => {
    btn.addEventListener('click', () => updateContentState(btn));
  });

  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.information_button.active');
    if (activeBtn) {
      updateContentState(activeBtn);
    }
  });

  // Кнопки развёрток Документаций

  const items = document.querySelectorAll('.documentation_item');

  items.forEach(item => {
    const btn = item.querySelector('.documentation_button');
    const container = item.querySelector('.documentation_container');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.documentation_container').classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
        container.classList.add('active');
      }
    });
  });

  // Кнопки раздела FAQ

  const questionItems = document.querySelectorAll('.question_item');

  questionItems.forEach(item => {
    const button = item.querySelector('.question_button');
    
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      questionItems.forEach(i => i.classList.remove('active'));
      
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // Расширение поля для Текста обращения

  const textarea = document.getElementById('form_text');
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

});