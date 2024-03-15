import $ from 'jquery';

function initialize() {
  const tooltipButtons = '.tooltip-button';

  $(document).on('mouseenter', tooltipButtons, function () {
    const tooltip = $(this).children('.tooltip');

    tooltip.css('top', -tooltip.height());
    tooltip.toggle();
  }).on('mouseleave', tooltipButtons, function() {
    $(this).children('.tooltip').hide();
  });
};

export default {
  initialize
}