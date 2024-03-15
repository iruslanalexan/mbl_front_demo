import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import $ from 'jquery';

const initialize = (filterTo = 'js-filter-results') => {
  const filterResults = document.querySelector(`.${filterTo}`);

  const lengthRange = document.querySelector('.js-length-range');
  const lengthFrom = document.querySelector('.length-from');
  const lengthTo = document.querySelector('.length-to');

  const widthRange = document.querySelector('.js-width-range');
  const widthFrom = document.querySelector('.width-from');
  const widthTo = document.querySelector('.width-to');

  const depthRange = document.querySelector('.js-depth-range');
  const depthFrom = document.querySelector('.depth-from');
  const depthTo = document.querySelector('.depth-to');

  const heightRange = document.querySelector('.js-height-range');
  const heightFrom = document.querySelector('.height-from');
  const heightTo = document.querySelector('.height-to');

  const priceRange = document.querySelector('.js-price-range');
  const priceFrom = document.querySelector('.price-from');
  const priceTo = document.querySelector('.price-to');

  const sleeperLengthRange = document.querySelector('.js-sleeper-length-range');
  const sleeperLengthFrom = document.querySelector('.sleeper-length-from');
  const sleeperLengthTo = document.querySelector('.sleeper-length-to');

  const sleeperWidthRange = document.querySelector('.js-sleeper-width-range');
  const sleeperWidthFrom = document.querySelector('.sleeper-width-from');
  const sleeperWidthTo = document.querySelector('.sleeper-width-to');

  const doorsRange = document.querySelector('.js-doors-range');
  const doorsFrom = document.querySelector('.doors-from');
  const doorsTo = document.querySelector('.doors-to');

  if(doorsRange) {
    const doorsInputFrom = parseInt($('input.doors-from').val(), 10);
    const doorstInputTo = parseInt($('input.doors-to').val(), 10);
    if(doorsInputFrom && doorstInputTo) {
      const doorsFilteredFrom = parseInt($('input.doors-from').data('filtered-value'), 10);
      const doorsFilteredTo = parseInt($('input.doors-to').data('filtered-value'), 10);
      const currentDoorsStart = doorsFilteredFrom || doorsInputFrom;
      const currentDoorsEnd = doorsFilteredTo || doorstInputTo;
      noUiSlider.create(doorsRange, {
        start: [currentDoorsStart, currentDoorsEnd],
        connect: [true, false, true],
        range: {
          'min': [doorsInputFrom],
          'max': [doorstInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' шт'
        })
      });
      doorsRange.noUiSlider.on('update', function OnUpdate(values){
        [doorsFrom.value, doorsTo.value] = values;
      });
    }
  }

  if(sleeperWidthRange) {
    const sleeperWidthInputFrom = parseInt($('input.sleeper-width-from').val(), 10);
    const sleeperWidthInputTo = parseInt($('input.sleeper-width-to').val(), 10);
    if(sleeperWidthInputFrom && sleeperWidthInputTo) {
      const sleeperWidthFilteredFrom = parseInt($('input.sleeper-width-from').data('filtered-value'), 10);
      const sleeperWidthFilteredTo = parseInt($('input.sleeper-width-to').data('filtered-value'), 10);
      const currentSleeperWidthStart = sleeperWidthFilteredFrom || sleeperWidthInputFrom;
      const currentSleeperWidthEnd = sleeperWidthFilteredTo || sleeperWidthInputTo;
      noUiSlider.create(sleeperWidthRange, {
        start: [currentSleeperWidthStart, currentSleeperWidthEnd],
        connect: [true, false, true],
        range: {
          'min' : [sleeperWidthInputFrom],
          'max': [sleeperWidthInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      sleeperWidthRange.noUiSlider.on('update', function OnUpdate(values){
        [sleeperWidthFrom.value, sleeperWidthTo.value] = values;
      });
    }
  }

  if(sleeperLengthRange) {
    const sleeperLengthInputFrom = parseInt($('input.sleeper-length-from').val(), 10);
    const sleeperLengthInputTo = parseInt($('input.sleeper-length-to').val(), 10);
    if(sleeperLengthInputFrom && sleeperLengthInputTo) {
      const sleeperLengthFilteredFrom = parseInt($('input.sleeper-length-from').data('filtered-value'), 10);
      const sleeperLengthFilteredTo = parseInt($('input.sleeper-length-to').data('filtered-value'), 10);
      const currentSleeperLengthStart = sleeperLengthFilteredFrom || sleeperLengthInputFrom;
      const currentSleeperLengthEnd = sleeperLengthFilteredTo || sleeperLengthInputTo;
      noUiSlider.create(sleeperLengthRange, {
        start: [currentSleeperLengthStart, currentSleeperLengthEnd],
        connect: [true, false, true],
        range: {
          'min': [sleeperLengthInputFrom],
          'max' : [sleeperLengthInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      sleeperLengthRange.noUiSlider.on('update', function OnUpdate(values) {
        [sleeperLengthFrom.value, sleeperLengthTo.value] = values;
      });
    }
  }

  if(depthRange){
    const depthInputFrom = parseInt($('input.depth-from').val(), 10);
    const depthInputTo = parseInt($('input.depth-to').val(), 10);
    if(depthInputFrom && depthInputTo) {
      const depthInputFilteredFrom = parseInt($('input.depth-from').data('filtered-value'), 10);
      const depthInputFilteredTo = parseInt($('input.depth-to').data('filtered-value'), 10);
      const currentDepthStart = depthInputFilteredFrom || depthInputFrom;
      const currentDepthEnd = depthInputFilteredTo || depthInputTo;
      noUiSlider.create(depthRange, {
        start: [currentDepthStart, currentDepthEnd],
        connect: [true, false, true],
        range: {
          'min': [depthInputFrom],
          'max': [depthInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      depthRange.noUiSlider.on('update', function OnUpdate(values) {
        [depthFrom.value, depthTo.value] = values;
      });
    }
  }

  if(heightRange){
    const heightInputFrom = parseInt($('input.height-from').val(), 10);
    const heightInputTo = parseInt($('input.height-to').val(), 10);
    if(heightInputFrom && heightInputTo) {
      const heightInputFilteredFrom = parseInt($('input.height-from').data('filtered-value'), 10);
      const heightInputFilteredTo = parseInt($('input.height-to').data('filtered-value'), 10);
      const currentHeightStart = heightInputFilteredFrom || heightInputFrom;
      const currentHeightEnd = heightInputFilteredTo || heightInputTo;
      noUiSlider.create(heightRange, {
        start: [currentHeightStart, currentHeightEnd],
        connect: [true, false, true],
        range: {
          'min': [heightInputFrom],
          'max': [heightInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      heightRange.noUiSlider.on('update', function OnUpdate(values) {
        [heightFrom.value, heightTo.value] = values;
      });
    }
  }

  if(lengthRange){
    const lengthInputFrom = parseInt($('input.length-from').val(), 10);
    const lengthInputTo = parseInt($('input.length-to').val(), 10);
    if(lengthInputFrom && lengthInputTo) {
      const lengthInputFilteredFrom = parseInt($('input.length-from').data('filtered-value'), 10);
      const lengthInputFilteredTo = parseInt($('input.length-to').data('filtered-value'), 10);
      const currentLengthStart = lengthInputFilteredFrom || lengthInputFrom;
      const currentLengthEnd = lengthInputFilteredTo || lengthInputTo;
      noUiSlider.create(lengthRange, {
        start: [currentLengthStart, currentLengthEnd],
        connect: [true, false, true],
        range: {
          'min': [lengthInputFrom],
          'max': [lengthInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      lengthRange.noUiSlider.on('update', function OnUpdate(values) {
        [lengthFrom.value, lengthTo.value] = values;
      });
    }
  }

  if(widthRange) {
    const widthInputFrom = parseInt($('input.width-from').val(), 10);
    const widthInputTo = parseInt($('input.width-to').val(), 10);
    if(widthInputFrom && widthInputTo) {
      const widthInputFilteredFrom = parseInt($('input.width-from').data('filtered-value'), 10);
      const widthInputFilteredTo = parseInt($('input.width-to').data('filtered-value'), 10);
      const currentWidthStart = widthInputFilteredFrom || widthInputFrom;
      const currentWidthEnd = widthInputFilteredTo || widthInputTo;
      noUiSlider.create(widthRange, {
        start: [currentWidthStart, currentWidthEnd],
        connect: [true, false, true],
        range: {
          'min': [widthInputFrom],
          'max': [widthInputTo],
        },
        format: wNumb({
          decimals: 0,
          suffix: ' мм'
        })
      });
      widthRange.noUiSlider.on('update', function OnUpdate(values) {
        [widthFrom.value, widthTo.value] = values;
      });
    }
  }

  if(priceRange){
    const priceInputFrom = parseInt($('input.price-from').val(), 10);
    const priceInputTo = parseInt($('input.price-to').val(), 10);
    if(priceInputFrom && priceInputTo) {
      const priceInputFilteredFrom = parseInt($('input.price-from').data('filtered-value'), 10);
      const priceInputFilteredTo = parseInt($('input.price-to').data('filtered-value'), 10);
      const currentPriceStart = priceInputFilteredFrom || priceInputFrom;
      const currentPriceEnd = priceInputFilteredTo || priceInputTo;
      noUiSlider.create(priceRange, {
        start: [currentPriceStart, currentPriceEnd],
        connect: [true, false, true],
        range: {
          'min': [priceInputFrom],
          'max': [priceInputTo],
        },
        format: wNumb({
          decimals: 0,
          thousand: ' ',
          suffix: ' руб.'
        })
      });
      priceRange.noUiSlider.on('update', function OnUpdate(values) {
        [priceFrom.value, priceTo.value] = values;
      });
    }
  }
};

export default {
  initialize
}
