document.addEventListener("DOMContentLoaded", () => {

  // ================= SLIDER =================
  const slides = document.querySelector('.slides');
  const slide = document.querySelectorAll('.slide');

  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const dotsContainer = document.querySelector('.dots');

  let index = 0;

  // สร้างจุด
  slide.forEach((_, i) => {
      const dot = document.createElement('div');

      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);

      dot.addEventListener('click', () => {
          index = i;
          updateSlide();
      });

      dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlide() {
      if (!slides) return;

      slides.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
      });
  }

  if (nextBtn) {
      nextBtn.onclick = () => {
          index = (index + 1) % slide.length;
          updateSlide();
      };
  }

  if (prevBtn) {
      prevBtn.onclick = () => {
          index = (index - 1 + slide.length) % slide.length;
          updateSlide();
      };
  }

  // เริ่มต้นที่ Slide แรก
  updateSlide();

  // ================= MENU =================

  window.toggleMenu = function () {
    const offcanvas = document.getElementById("offcanvas");

    if (offcanvas) {
      offcanvas.classList.toggle("active");

      if (!offcanvas.classList.contains("active")) {
        offcanvas.classList.remove("submenu-open");

        // reset หน้า
        offcanvas
          .querySelectorAll(".submenu-page")
          .forEach(page => page.classList.remove("show"));
      }
    }
  };


  // ปิดเมื่อคลิกข้างนอก
  document.addEventListener("click", function (e) {
    const offcanvas = document.getElementById("offcanvas");
    const menuBtn = document.querySelector(".menu-btn");

    if (
      offcanvas &&
      menuBtn &&
      offcanvas.classList.contains("active") &&
      !offcanvas.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      offcanvas.classList.remove("active");
      offcanvas.classList.remove("submenu-open");

      offcanvas
        .querySelectorAll(".submenu-page")
        .forEach(page => page.classList.remove("show"));
    }
  });


  // เปิด submenu
  window.openSubmenu = function (e, id) {
    e.preventDefault();

    const offcanvas = document.getElementById("offcanvas");
    const submenu = document.getElementById(id);

    if (!offcanvas || !submenu) return;

    offcanvas.querySelectorAll(".submenu-page").forEach(page => {
      page.classList.remove("show");
    });

    submenu.classList.add("show");
    offcanvas.classList.add("submenu-open");
  };


  window.closeSubmenu = function () {
    const offcanvas = document.getElementById("offcanvas");

    if (!offcanvas) return;

    offcanvas.classList.remove("submenu-open");

    offcanvas.querySelectorAll(".submenu-page").forEach(page => {
      page.classList.remove("show");
    });
  };


  // กลับหน้าหลัก
  window.closeSubmenu = function () {
    const offcanvas = document.getElementById("offcanvas");

    if (!offcanvas) return;

    offcanvas.classList.remove("submenu-open");

    offcanvas
      .querySelectorAll(".submenu-page")
      .forEach(page => page.classList.remove("show"));
  };

  // ================= LOAD POLICY =================
  async function loadPolicies() {
    try {
      const res = await fetch('/policy.json');
      const data = await res.json();

      const grid = document.getElementById('policyGrid');
      if (!grid) return;

      data.forEach((policy) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';

        item.innerHTML = `
          <div class="accordion-header">
            <h3>${policy.title}</h3>
            <span class="icon"><i class="bi bi-plus"></i></span>
          </div>
          <div class="accordion-content">
            <p>${policy.description}</p>
          </div>
        `;

        const header = item.querySelector('.accordion-header');
        header.onclick = () => {
          item.classList.toggle('active');
        };

        grid.appendChild(item);
      });

    } catch (err) {
      console.error("โหลด policy ไม่ได้:", err);
    }
  }

  loadPolicies();

  // ================= COPY =================
  const copyBtn = document.getElementById("copy-link");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);

      const status = document.getElementById("copy-status");
      if (status) {
        status.classList.add("show");

        setTimeout(() => {
          status.classList.remove("show");
        }, 2000);
      }
    });
  }

});