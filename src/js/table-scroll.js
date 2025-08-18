document.addEventListener('DOMContentLoaded', () => {
  const tableContainer = document.querySelector('.overflow-x-auto');

  if (tableContainer) {
    tableContainer.addEventListener('mousedown', (e) => {
      const table = e.currentTarget;
      table.style.cursor = 'grabbing';
      const startX = e.pageX - table.offsetLeft;
      const scrollLeft = table.scrollLeft;

      const onMouseMove = (e) => {
        if (!table.style.cursor.includes('grabbing')) return;
        e.preventDefault();
        const x = e.pageX - table.offsetLeft;
        const walk = (x - startX) * 1; //scroll-fast
        table.scrollLeft = scrollLeft - walk;
      };

      table.addEventListener('mousemove', onMouseMove);

      const onMouseUp = () => {
        table.style.cursor = 'grab';
        table.removeEventListener('mousemove', onMouseMove);
        table.removeEventListener('mouseup', onMouseUp);
        table.removeEventListener('mouseleave', onMouseUp);
      };

      table.addEventListener('mouseup', onMouseUp);
      table.addEventListener('mouseleave', onMouseUp);
    });
  }
});
