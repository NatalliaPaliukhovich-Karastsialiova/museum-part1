document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallary__item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = entry.target;

      if (entry.isIntersecting) {
        item.classList.add('animate');
      } else {
        item.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => observer.observe(item));
});
