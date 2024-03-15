export default class Accordion {
  constructor(container) {
    this.events = {
      handleCollapsibleTriggerClick: (e) => {
        e.preventDefault();
        const _this = e.target;
        const _collapsible = _this.closest('[data-collapsible]');
        if (_collapsible.animationInProgress) return;
        _collapsible.animationInProgress = true;
        const _collapsibleType = _collapsible.getAttribute('data-collapsible-type');
        const _accordion = (_collapsibleType === 'accordion') ? _this.closest('[data-accordion]') : null;
        const _collapsibleOpened = _accordion ? _accordion.querySelector('.collapsible-opened') : null;
        if (_collapsible.classList.contains('collapsible-opened')) {
          _collapsible.querySelector('[data-collapsible-body]').style.height = `${this.getFullHeight(_collapsible.querySelector('[data-collapsible-inner]'))  }px`;
          setTimeout(() => {
            _collapsible.classList.remove('collapsible-opened');
            _collapsible.classList.add('collapsible-closed');
            setTimeout(() => {
              _collapsible.animationInProgress = false;
            }, 300);
          }, 10);
        } else {
          const $active = $('.accordion__section.collapsible-opened');

          if ($active.length) {
            $active.find('[data-collapsible-body]')[0].style.height = `${$active.find('[data-collapsible-inner]').outerHeight()}px`;
            setTimeout(() => {
              $active.removeClass('collapsible-opened').addClass('collapsible-closed');
            }, 10);
          }
          if (_accordion && _collapsibleOpened) {
            _collapsibleOpened.classList.remove('collapsible-opened');
            _collapsibleOpened.classList.add('collapsible-closed');
          }
          _collapsible.querySelector('[data-collapsible-body]').style.height = `${this.getFullHeight(_collapsible.querySelector('[data-collapsible-inner]'))  }px`;
          _collapsible.classList.add('collapsible-opened');
          _collapsible.classList.remove('collapsible-closed');
          setTimeout(() => {
            _collapsible.querySelector('[data-collapsible-body]').style.height = 'auto';
            _collapsible.animationInProgress = false;
          }, 400);
        }
      }
    };
    this.collapsibles = container ? Array.prototype.slice.call(container.querySelectorAll('[data-collapsible]')) : Array.prototype.slice.call(document.querySelectorAll('[data-collapsible]'));
    this.initialize();
  }

  getFullHeight(el) {
    let height = el.offsetHeight;
    const style = getComputedStyle(el);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }

  initialize() {
    this.initializeHeights();
    this.initializeEvents();
  }

  initializeHeights() {
    this.collapsibles.forEach((elem) => {
      const _body = elem.querySelector('[data-collapsible-body]');
      const _inner = elem.querySelector('[data-collapsible-inner]');
      _body.style.height = `${this.getFullHeight(_inner)  }px`;
    });
  }

  initializeEvents() {
    this.collapsibles.forEach((elem) => {
      elem.animationInProgress = false;
      elem.querySelector('[data-collapsible-trigger]').addEventListener('click', this.events.handleCollapsibleTriggerClick);
    });
    window.addEventListener('resize', () => {
      this.initializeHeights();
    });
  }
}

