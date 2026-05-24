'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

//  Tombol About 
const textContainer = document.getElementById('text-container');
const showMoreBtn = document.getElementById('show-more-btn');
const wordsPerChunk = 120;
let currentChunk = 1;

const text = textContainer.textContent;
const words = text.split(' ');

const showMoreText = () => {
  const start = 0;
  const end = currentChunk * wordsPerChunk;
  const chunk = words.slice(start, end).join(' ');

  textContainer.textContent = chunk;

  currentChunk++;

  if (end >= words.length) {
    showMoreBtn.style.display = 'none';
  }
};

showMoreBtn.addEventListener('click', showMoreText);

// Menampilkan 50 kata pertama saat halaman dimuat
showMoreText();

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}



// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//  Sweet Alert (Disesuaikan agar Formspree tetap bisa jalan)
const button = document.querySelector('[data-form-btn]');

if (button) {
  button.addEventListener('click', (e) => {
    // Jika Anda memakai Formspree, biarkan form submit secara natural
    // Kita hanya memunculkan notifikasi visual saja
    Swal.fire({
      icon: 'success',
      title: 'Pesan Sedang Dikirim...',
      text: 'Mohon tunggu sebentar.',
      showConfirmButton: false,
      timer: 2000
    });
  });
}

// ==========================================
// Fitur Jalankan Detail Blog Modal & Marquee 
// ==========================================
const blogItemsList = document.querySelectorAll(".blog-post-item");
const blogModalBox = document.querySelector("[data-blog-modal-container]");
const blogCloseButton = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlayBg = document.querySelector("[data-blog-overlay]");

const mTitle = document.getElementById("modal-blog-title");
const mCategory = document.getElementById("modal-blog-category");
const mDate = document.getElementById("modal-blog-date");
const mBody = document.getElementById("modal-blog-body");
const mGallery = document.getElementById("modal-blog-gallery");

const toggleBlogModalWindow = function () {
  if (blogModalBox && blogOverlayBg) {
    blogModalBox.classList.toggle("active");
    blogOverlayBg.classList.toggle("active");
  }
}

if (blogItemsList.length > 0) {
  for (let i = 0; i < blogItemsList.length; i++) {
    blogItemsList[i].addEventListener("click", function (e) {
      e.preventDefault();

      // Membaca komponen data teks dari kartu yang diklik
      const titleSrc = this.querySelector(".blog-item-title").innerText;
      const categorySrc = this.querySelector(".blog-category").innerText;
      const dateSrc = this.querySelector("time").innerText;
      
      // Membaca isi teks paragraf penuh dari sumber kontainer tersembunyi
      const fullTextSrc = this.querySelector(".blog-full-text-source").innerHTML;
      
      // Membaca barisan tag gambar galeri
      const gallerySrcElement = this.querySelector(".blog-gallery-source");
      const gallerySrcHTML = gallerySrcElement ? gallerySrcElement.innerHTML : "";

      // Memasukkan seluruh data ke dalam komponen modal popup
      if (mTitle) mTitle.innerText = titleSrc;
      if (mCategory) mCategory.innerText = categorySrc;
      if (mDate) mDate.innerText = dateSrc;
      if (mBody) mBody.innerHTML = fullTextSrc;
      
      // Menggandakan barisan foto agar animasi berjalan tanpa patah/putus di ujung loop
      if (mGallery && gallerySrcHTML) {
        mGallery.innerHTML = gallerySrcHTML + gallerySrcHTML;
      } else if (mGallery) {
        mGallery.innerHTML = ""; // Bersihkan jika tidak ada foto
      }

      toggleBlogModalWindow();
    });
  }
}

// Menutup jendela modal blog
if (blogCloseButton) {
  blogCloseButton.addEventListener("click", toggleBlogModalWindow);
  blogOverlayBg.addEventListener("click", toggleBlogModalWindow);
}

// ========================================================
// 1. FITUR KALKULATOR UMUR OTOMATIS
// ========================================================
const ageTimeElement = document.getElementById("user-age");

if (ageTimeElement) {
  const birthDate = new Date("2001-10-05");
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  // Cek apakah hari ulang tahun di tahun ini sudah terlewat atau belum
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // Update teks tampilan di sidebar secara dinamis
  ageTimeElement.innerHTML = `Surakarta, 05 Okt 2001 (${age} Tahun)`;
}

// ========================================================
// 2. FITUR LIGHTBOX POPUP GAMBAR PORTFOLIO (SWEETALERT2)
// ========================================================
const lightboxProjectLinks = document.querySelectorAll("a[data-lightbox]");

if (lightboxProjectLinks.length > 0) {
  lightboxProjectLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Menahan link agar tidak reload halaman
      
      const imageURL = this.getAttribute("data-lightbox");
      const projectTitleText = this.querySelector(".project-title").innerText;
      const projectCategoryText = this.querySelector(".project-category").innerText;

      // Memanggil fungsi modal jendela SweetAlert2 custom tema gelap
      Swal.fire({
        title: projectTitleText,
        text: `Kategori: ${projectCategoryText}`,
        imageUrl: imageURL,
        imageAlt: projectTitleText,
        showConfirmButton: false, // Menghilangkan tombol OK bawaan
        showCloseButton: true,    // Memunculkan tombol silang (X) di kanan atas
        background: "#1e1e1f",    // Menyelaraskan warna background dengan tema website Anda
        color: "#ffffff",
        customClass: {
          popup: "portfolio-lightbox-card",
          title: "portfolio-lightbox-title"
        }
      });
    });
  });
}

// ========================================================
// FITUR DOWNLOAD CV DENGAN VALIDASI FORM REKRUTER (HR)
// ========================================================
const downloadCvBtn = document.getElementById("download-cv-btn");

if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", function () {
    Swal.fire({
      title: 'Verifikasi Akses Dokumen',
      text: 'Untuk perlindungan data, mohon lengkapi identitas rekruter/perusahaan Anda.',
      background: "#1e1e1f",
      color: "#ffffff",
      html:
        '<input id="swal-hr-name" class="swal2-input" placeholder="Nama Lengkap Anda" style="color: #fff; background: #2b2b2c; border: 1px solid var(--jet); border-radius: 8px; font-size: 14px; margin-bottom: 10px; width: 80%;">' +
        '<input id="swal-hr-company" class="swal2-input" placeholder="Nama Instansi / Perusahaan" style="color: #fff; background: #2b2b2c; border: 1px solid var(--jet); border-radius: 8px; font-size: 14px; margin-bottom: 10px; width: 80%;">' +
        '<input id="swal-hr-email" type="email" class="swal2-input" placeholder="Email Kantor / Resmi Valid" style="color: #fff; background: #2b2b2c; border: 1px solid var(--jet); border-radius: 8px; font-size: 14px; width: 80%;">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Verifikasi & Unduh',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#d6ac5d',
      preConfirm: () => {
        const name = document.getElementById('swal-hr-name').value.trim();
        const company = document.getElementById('swal-hr-company').value.trim();
        const email = document.getElementById('swal-hr-email').value.trim();
        
        // Aturan Regex untuk mengecek kevalidan struktur email resmi
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // 1. Validasi Input Kosong
        if (!name || !company || !email) {
          Swal.showValidationMessage('Seluruh kolom data wajib diisi!');
          return false;
        }
        
        // 2. Validasi Kevalidan Struktur Email
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage('Format email tidak valid (Gunakan email resmi)!');
          return false;
        }
        
        // 3. Validasi Kevalidan Karakter Minimal Instansi (Menghindari asal ketik nama perusahaan)
        if (company.length < 3) {
          Swal.showValidationMessage('Nama perusahaan/instansi tidak valid!');
          return false;
        }
        
        return { name: name, company: company, email: email };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Mengirimkan notifikasi data identitas HR secara otomatis ke Formspree Anda
        fetch('https://formspree.io/f/xqejlojb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Kategori: "DOWNLOAD_CV_REQUEST",
            Nama_Pendaftar: result.value.name,
            Perusahaan_HR: result.value.company,
            Email_Kontak: result.value.email,
            Pesan: `User mengunduh CV berkas utama.`
          })
        });

      // Efek Loading Sukses
        Swal.fire({
          icon: 'success',
          title: 'Akses Diverifikasi!',
          text: 'Berkas CV Anda sedang diunduh secara otomatis.',
          background: "#1e1e1f",
          color: "#ffffff",
          showConfirmButton: false,
          timer: 2000
        });

        // TRIGGER DOWNLOAD PROGRAMMATIK SECARA AMAN (Sesuai nama file Anda yang baru)
        const secureLink = document.createElement('a');
        // %20 adalah kode pengganti spasi agar URL tidak error
        secureLink.href = './Fauzi%20Dwi%20-%20CV%20Terbaru.pdf';
        secureLink.download = 'Fauzi Dwi - CV Terbaru.pdf';
        document.body.appendChild(secureLink);
        secureLink.click();
        document.body.removeChild(secureLink);
      }
    });
  });
}

// ---------------------- Skrip Lanjutkan membaca
