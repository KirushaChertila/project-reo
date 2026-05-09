document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. МЕНЮ
  // ============================================
  
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.nav_bar-compact-btn');
  const mobileMenu = document.querySelector('.mobile_menu');

  const updateHeaderHeight = () => {
    if (header) {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
  };
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);

  const toggleButtonState = (isOpen) => {
    if (!menuBtn) return;
    const img = menuBtn.querySelector('.nav_bar-compact-img');
    const textNode = Array.from(menuBtn.childNodes).find(n => n.nodeType === 3 && n.textContent.trim() !== '');
    
    if (isOpen) {
      img.src = 'icons/menuClose.svg';
      img.alt = 'Закрыть меню';
      textNode.textContent = ' Закрыть';
    } else {
      img.src = 'icons/menu.svg';
      img.alt = 'Открыть меню';
      textNode.textContent = ' Меню';
    }
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll', isOpen);
      toggleButtonState(isOpen);
    });

    mobileMenu.querySelectorAll('.mobile_menu_item').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        toggleButtonState(false);
      });
    });
  }

  // ============================================
  // 2. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
  // ============================================

  const getActivePageName = () => {
    let name = window.location.pathname.split('/').pop() || '';
    name = name.split('?')[0].split('#')[0].toLowerCase().trim();
    if (!name || name === '' || name === '/') name = 'index.html';
    return name;
  };

  const activePage = getActivePageName();

  document.querySelectorAll('.menu_item').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '' || href === '#' || href.startsWith('http')) return;
    
    const linkPage = href.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    
    if (linkPage === activePage) {
      link.classList.add('active');
    }
  });

  // ============================================
  // 3. КНОПКИ ФИЛЬТРА НОВОСТЕЙ
  // ============================================
  
  const filterBtns = document.querySelectorAll('.news_button');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isNewsPage = document.querySelector('.news-page_list');
      
      if (!isNewsPage) {
        window.location.href = 'news.html';
        return;
      }
    });
  });

  // ============================================
  // 4. ТАБЫ "ПОЛЕЗНАЯ ИНФОРМАЦИЯ"
  // ============================================
  
  const info_buttons = document.querySelectorAll('.information_button');
  const info_contents = document.querySelectorAll('.information_content');
  
  if (info_buttons.length > 0 && info_contents.length > 0) {
    
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
          if (btn.id !== 'info_why') targetContent.classList.add('rounded-tl');
          if (btn.id === 'info_when') targetContent.classList.add('square-tr');
        }
      }
    }

    info_buttons.forEach(btn => {
      btn.addEventListener('click', () => updateContentState(btn));
    });

    window.addEventListener('resize', () => {
      const activeBtn = document.querySelector('.information_button.active');
      if (activeBtn) updateContentState(activeBtn);
    });
    
    const firstActive = document.querySelector('.information_button.active');
    if (firstActive) updateContentState(firstActive);
  }

  // ============================================
  // 5. АККОРДЕОН "ДОКУМЕНТАЦИЯ"
  // ============================================
  
  const docItems = document.querySelectorAll('.documentation_item');
  
  if (docItems.length > 0) {
    docItems.forEach(item => {
      const btn = item.querySelector('.documentation_button');
      const container = item.querySelector('.documentation_container');
      
      if (btn && container) {
        btn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          docItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherContainer = otherItem.querySelector('.documentation_container');
            if (otherContainer) otherContainer.classList.remove('active');
          });

          if (!isActive) {
            item.classList.add('active');
            container.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================
  // 6. FAQ АККОРДЕОН
  // ============================================
  
  const questionItems = document.querySelectorAll('.question_item');
  
  if (questionItems.length > 0) {
    questionItems.forEach(item => {
      const button = item.querySelector('.question_button');
      
      if (button) {
        button.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          
          questionItems.forEach(i => i.classList.remove('active'));
          
          if (!isOpen) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================
  // 7. API АККОРДЕОН
  // ============================================

  const asideNavBars = document.querySelectorAll('.aside_nav-bar');
  asideNavBars.forEach(bar => {
    const button = bar.querySelector('.aside_nav-button');
    const list = bar.querySelector('ul');
    if (!button || !list) return;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      asideNavBars.forEach(otherBar => {
        if (otherBar !== bar) otherBar.classList.remove('active');
      });
      bar.classList.toggle('active');
    });
  });

  // Авто-подсветка по URL
  const currentPath = window.location.pathname.split('/').pop() || '';
  const currentHash = window.location.hash.replace('#', '');
  document.querySelectorAll('.aside_nav-option').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('/').pop().split('?')[0] || '';
    const linkHash = href.includes('#') ? href.split('#')[1] : '';
    if ((linkPath === currentPath || linkPath === '') && (linkHash === currentHash || !linkHash)) {
      link.classList.add('active');
      const parentBar = link.closest('.aside_nav-bar');
      if (parentBar) parentBar.classList.add('active');
    }
  });

  // ============================================
  // 8. КОПИРОВАНИЕ КОДА ИЗ API
  // ============================================

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.code-copy-btn');
    if (!btn) return;

    const codeArea = btn.closest('.code_area');
    const codeEl = codeArea?.querySelector('.code-content code, .code-content');
    if (!codeEl) return;

    const text = codeEl.textContent.trim();
    const originalHTML = btn.innerHTML;

    try {

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      }

      else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      btn.classList.add('success');
      btn.innerHTML = '<span class="copy-text">Скопировано</span>';

      if (btn._resetTimer) clearTimeout(btn._resetTimer);
      
      btn._resetTimer = setTimeout(() => {
        btn.classList.remove('success');
        btn.innerHTML = originalHTML;
      }, 2000);

    } 
    
    catch (err) {
      console.error('Ошибка копирования:', err);
    }

  });

  // ============================================
  // 9. ПАГИНАЦИЯ НОВОСТЕЙ
  // ============================================

  const newsList = document.querySelector('.news-page_list');
  const paginationContainer = document.querySelector('.pagination-controls');
  
  if (!newsList || !paginationContainer) {
    return; 
  }
  
  // Карусель кнопок фильтра на мобильном
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

  // === ФИЛЬТР И ПАГИНАЦИЯ ===

  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let currentFilter = 'all';

  const newsItems = Array.from(document.querySelectorAll('.news-page_item'));
  const paginationInfo = document.querySelector('.pagination-info');

  function setFilter(type) {
    currentFilter = type;
    currentPage = 1;
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.getElementById('all_news')?.classList.add('active');
    if (type === 'updates') document.getElementById('updates')?.classList.add('active');
    if (type === 'laws') document.getElementById('laws')?.classList.add('active');
    
    render();
  }

  document.getElementById('all_news')?.addEventListener('click', (e) => {
    e.preventDefault();
    setFilter('all');
  });
  document.getElementById('updates')?.addEventListener('click', (e) => {
    e.preventDefault();
    setFilter('updates');
  });
  document.getElementById('laws')?.addEventListener('click', (e) => {
    e.preventDefault();
    setFilter('laws');
  });

  function getFilteredItems() {
    if (currentFilter === 'all') return newsItems;
    return newsItems.filter(item => {
      const tag = item.querySelector('.news-page_tags')?.textContent.trim().toLowerCase() || '';
      if (currentFilter === 'updates') return tag.includes('обновление');
      if (currentFilter === 'laws') return tag.includes('законодательство');
      return true;
    });
  }

  function renderPagination(totalPages) {
    let html = '';
    html += `<a href="#" class="pagination-arrow" data-dir="prev">Назад</a>`;
    
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) {
      html += `<a href="#" class="pagination-page" data-page="1">1</a>`;
      if (startPage > 2) html += `<span class="pagination-dots">...</span>`;
    }
    for (let i = startPage; i <= endPage; i++) {
      html += `<a href="#" class="pagination-page ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span class="pagination-dots">...</span>`;
      html += `<a href="#" class="pagination-page" data-page="${totalPages}">${totalPages}</a>`;
    }
    html += `<a href="#" class="pagination-arrow" data-dir="next">Далее</a>`;
    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('.pagination-page').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = parseInt(el.dataset.page);
        render();
        newsList.scrollIntoView({ behavior: 'smooth' });
      });
    });
    paginationContainer.querySelectorAll('.pagination-arrow').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const dir = el.dataset.dir;
        if (dir === 'prev' && currentPage > 1) currentPage--;
        else if (dir === 'next' && currentPage < totalPages) currentPage++;
        else return;
        render();
        newsList.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function render() {
    const filtered = getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, end);

    newsItems.forEach(item => item.style.display = 'none');
    pageItems.forEach(item => item.style.display = 'flex');

    const showStart = filtered.length > 0 ? start + 1 : 0;
    const showEnd = Math.min(end, filtered.length);
    paginationInfo.textContent = `Показано ${showStart}-${showEnd} из ${filtered.length}`;
    renderPagination(totalPages);

    if (window.innerWidth <= 1200) {
      const visibleItems = newsItems.filter(item => item.style.display !== 'none');
      visibleItems.forEach(item => {
        item.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
        item.style.paddingBottom = window.innerWidth <= 779 ? '1.5rem' : '2rem';
      });
      if (visibleItems.length > 0) {
        const last = visibleItems[visibleItems.length - 1];
        last.style.borderBottom = 'none';
        last.style.paddingBottom = '0';
      }
    }
  }

  // Запуск
  setFilter('all');

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1200) render();
  });

});