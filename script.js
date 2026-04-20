document.addEventListener('DOMContentLoaded', () => {

  // Кнопки раздела Полезной информации

  const info_buttons = document.querySelectorAll('.information_button');
  const info_contents = document.querySelectorAll('.information_content');

  info_buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      info_buttons.forEach(b => b.classList.remove('active'));
      info_contents.forEach(c => {
        c.classList.remove('active');
        c.classList.remove('rounded-tl');
      });

      btn.classList.add('active');

      const contentId = btn.id.replace('info_', 'info_content_');
      const targetContent = document.getElementById(contentId);
      
      if (targetContent) {
        targetContent.classList.add('active');
        
        if (btn.id !== 'info_why') {
          targetContent.classList.add('rounded-tl');
        }
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