/**
 * QUÁN CHẦN - BÒ TƠ NHÚNG & NƯỚNG TÂY NINH
 * Vintage Retro Theme Interactions & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Vintage Menu Tab Switcher
  const tabBtns = document.querySelectorAll('.tab-btn-vintage');
  const panes = document.querySelectorAll('.menu-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetPaneId = btn.getAttribute('data-tab');
      panes.forEach(pane => {
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // 4. Poster & Menu Lightbox Modal
  const posterItems = document.querySelectorAll('.poster-item');
  const imageModal = document.getElementById('imageModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalFullImg = document.getElementById('modalFullImg');
  const modalImgCaption = document.getElementById('modalImgCaption');

  posterItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const caption = item.getAttribute('data-caption');

      if (modalFullImg) modalFullImg.src = fullSrc;
      if (modalImgCaption) modalImgCaption.textContent = caption || '';

      if (imageModal) {
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && imageModal) {
    modalCloseBtn.addEventListener('click', () => {
      imageModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Quick Add Dish to Note
  const addButtons = document.querySelectorAll('.btn-mini-add');
  const noteInput = document.getElementById('bookNote');
  const bookingSection = document.getElementById('dat-ban');

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dish = btn.getAttribute('data-dish') || 'Món đặc sản';
      if (noteInput) {
        const val = noteInput.value.trim();
        if (!val.includes(dish)) {
          noteInput.value = val ? `${val}, Dặn món: ${dish}` : `Dặn món: ${dish}`;
        }
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Small visual feedback
      btn.textContent = '✓ Đã chọn';
      btn.style.background = '#86efac';
      setTimeout(() => {
        btn.textContent = btn.getAttribute('data-dish') ? '+ Thêm món' : '+ Đặt món';
        btn.style.background = '';
      }, 1500);
    });
  });

  // 6. Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value;
      const phone = document.getElementById('bookPhone')?.value;
      const date = document.getElementById('bookDate')?.value;
      const time = document.getElementById('bookTime')?.value;

      alert(`✅ ĐẶT BÀN THÀNH CÔNG!\n\nCảm ơn quý khách ${name} (${phone}).\nQuán CHẦN (27A Phan Chu Trinh, Tây Ninh) đã ghi nhận bàn của quý khách vào lúc ${time} ngày ${date}.\nNhân viên quán sẽ liên hệ sớm để xác nhận!`);
      bookingForm.reset();
    });
  }

  // Set default booking date to today
  const bookDate = document.getElementById('bookDate');
  if (bookDate) {
    const today = new Date().toISOString().split('T')[0];
    bookDate.setAttribute('min', today);
    bookDate.value = today;
  }
});
