document.addEventListener("DOMContentLoaded", function() {
    const fileTextAreas = document.querySelectorAll('.file-text-area');
  
    function checkAndToggleHeader(area) {
      const targetDivs = [
        area.querySelector('#ContentPlaceHolder1_ctl02 div'),
        area.querySelector('#ContentPlaceHolder1_ctl03 div')
      ];
      const header = area.querySelector('.inner-h1.border-h1');
  
      if (header) {
        let hasTable = false;
        targetDivs.forEach(div => {
          if (div && div.querySelector('table')) {
            hasTable = true;
          }
        });
  
        if (hasTable) {
          header.style.display = '';
        } else {
          header.style.display = 'none';
        }
      }
    }
  
    fileTextAreas.forEach(area => {
      checkAndToggleHeader(area);
  
      const observer = new MutationObserver(() => {
        checkAndToggleHeader(area);
      });
  
      const targetDivs = [
        area.querySelector('#ContentPlaceHolder1_ctl02 div'),
        area.querySelector('#ContentPlaceHolder1_ctl03 div')
      ];
  
      targetDivs.forEach(div => {
        if (div) {
          observer.observe(div, { childList: true, subtree: true });
        }
      });
    });
  });