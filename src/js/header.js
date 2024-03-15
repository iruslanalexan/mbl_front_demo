import $ from 'jquery';

const body = document.querySelector('body');
const nav = document.querySelector('.js-nav');
const headerWrapper = document.querySelector('.js-header-wrapper');

const mobileNavOn = document.querySelector('span[js-on-main-nav-bar]');
const mobileNavOff = [...document.querySelectorAll('span[js-off-main-nav-bar]')];
const mobileSubNavOff = [...document.querySelectorAll('span[js-off-sub-nav-bar]')];
const mobileMenus = [...document.querySelectorAll('.hdd-nav .main-nav-link')];
const mobileMainNavBar = document.querySelector('.hdd-nav .main-nav');
let mobileSubNavBar;

function setMenuTranslate() {
  const scrollX = window.outerWidth > 768 ?  window.scrollX : 0;
  nav.style.setProperty('--menu-translate', `${-scrollX}px`);
};

function setMenuPosition() {
  setTimeout(() => {
    const ml = window.outerWidth > 768 ? `${$('.js-header-wrapper').offset().left}px` : '0px';
    $('body').css('--menu-position', ml);
  }, 50);
};

function initEvents() {
  const isMobileView = window.outerWidth < 768;

  // if (isMobileView) {
  //   headerWrapper.remove();
  // } else {
  //   mobileMainNavBar.parentNode.remove();
  // }

  // $(window).on('scroll', setMenuTranslate);
  // $(window).on('resize', setMenuPosition);


  // $(window).on('load', function() {
  //   setMenuPosition();
  //   setMenuTranslate();
  // });

  mobileSubNavOff.forEach(subnavOff => {
    subnavOff.addEventListener('click', () => {
      if (mobileSubNavBar) {
        mobileSubNavBar.style.opacity = 0;
        mobileSubNavBar.style.visibility = 'hidden';
      }
    });
  });

  mobileNavOff.forEach(navOff => {
    navOff.addEventListener('click', () => {
      // mobileMainNavBar.style.opacity = 0;
      // mobileMainNavBar.style.visibility = 'hidden';
      $('body').removeClass('is-show-main-nav');

      if(mobileSubNavBar) {
        mobileSubNavBar.style.opacity = 0;
        mobileSubNavBar.style.visibility = 'hidden';
      }
    });
  });

  mobileMenus.forEach(mobileMenu => {
    mobileMenu.addEventListener('click', () => {

      mobileSubNavBar = mobileMenu.nextElementSibling;
      mobileSubNavBar.style.opacity = 1;
      mobileSubNavBar.style.visibility = 'visible';

      const b = document.body;
      const html = document.documentElement;

      const height = Math.max(b.scrollHeight, b.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      // mobileSubNavBar.style.height = `${height}px`;
    });
  });

  mobileNavOn.addEventListener('click', () => {
    // mobileMainNavBar.style.opacity = 1;
    // mobileMainNavBar.style.visibility = 'visible';
    $('body').addClass('is-show-main-nav');

    const b = document.body;
    const html = document.documentElement;

    const height = Math.max(b.scrollHeight, b.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    // mobileMainNavBar.style.height = `${height}px`;
  });
}

export default { initEvents }