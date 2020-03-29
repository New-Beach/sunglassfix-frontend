/*
    Replace SVGs in buttons with inline SVGs.
    This is so we can manipulate the path colours on hover without 
    having to embed the SVG code in our nice clean HTML.
 */

$('img.button-svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');
});

/* Mobile Menu functions */

$('.mobile-menu-bars').click(function(){
    $(this).toggleClass('open');
    $('.page-navigation-container').toggleClass('open');
    $('.mobile-menu-element').toggleClass('active');
});

$('.mobile-menu-toggle').click(function(){
    $(this).toggleClass('flipped');
    $(this).next('.sub-menu').toggleClass('display');
});

/* 
    Header Scripts 
*/

/* Display Currency Options on Hover */
$('.currency-select').hover(function(){
    $('.currency-dropdown').toggleClass('visible');
});

/* Display Language Options on Hover */
$('.language-select').hover(function(){
    $('.language-dropdown').toggleClass('visible');
});

/* Display Shopping Cart on Hover */
$('.cart-link-wrapper').hover(function(){
    $('.cart-preview-hover').toggleClass('visible');
});

/*  Add a class to the first element on the page after the header 
    which automatically pads it out from
    the fixed header 
*/

$('.site-header').next().addClass('first-page-element');

/*  
    If the next element after the header has the class background-color,
    add a class to the header which will change the internal colours to white
    so that it is legible against background colours / images 
*/

if($('.site-header').next().hasClass('background-color')){
    $('.navigation-search-bar').addClass('transparent-bg');
}

/* Change the Header on scroll */

$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    if($(window).width() < 740 ){
        var scroll_pos = 40;
    } else {
      var scroll_pos = 130;  
    }
    
    if($('.navigation-search-bar').hasClass('transparent-bg')){
        var transparentHeader = true;
    }

    if(y_scroll_pos > scroll_pos) {
        $('.navigation-search-bar').addClass('scrolled');
        $('.cart-link').addClass('scrolled');
        if(transparentHeader = true){
            $('.navigation-search-bar').removeClass('transparent-bg'); 
        }
    }
    if(y_scroll_pos < scroll_pos) {
        $('.navigation-search-bar').removeClass('scrolled');
        $('.cart-link').removeClass('scrolled');
        if(transparentHeader = true){
            $('.navigation-search-bar').addClass('transparent-bg'); 
        }
    }
});

/* Activate, display and hide the search dialogue */

$('.activate-search-dialogue').click(function(){
    $('.search-dialogue').addClass('active');
    setTimeout(function() { 
        $('.main-header-search-input').focus() 
    }, 250);
});

$('.search-dialogue').click(function(){
    $('.search-dialogue').removeClass('active');
}).children().click(function(e) {
  return false;
});

$('.close-search-dialogue').click(function(){
    $('.search-dialogue').removeClass('active');
});

/* Stick the filter element to the header on scroll */

var bottom_height = $('.navigation-search-bar').height();
var top_height = $('.top-header-bar').height();
var header_offset = top_height + bottom_height;
var distance = $('.search-filter').offset().top - header_offset;

$(window).scroll(function() {
    if ( $(this).scrollTop() >= distance ) {
        $('.search-filter').addClass('scrolled');
        $('.search-filter-dialogue').addClass('scrolled');
        $('.results-display-section').addClass('scrolled');
    }
    if ( $(this).scrollTop() < distance ) {
        $('.search-filter').removeClass('scrolled');
        $('.search-filter-dialogue').removeClass('scrolled');
        $('.results-display-section').removeClass('scrolled');
    }
});

/* Activate, display and hide the filter dialogue */

$('#refine-search-results-toggle').click(function(){
    $(this).toggleClass('active');
    $('.search-filter-dialogue').toggleClass('active');
});

$('.search-filter-dialogue').click(function(){
    $('.search-filter-dialogue').removeClass('active');
    $('#refine-search-results-toggle').removeClass('active');
}).children().click(function(e) {
  return false;
});

$('.site-header').click(function(){
   $('.search-filter-dialogue').removeClass('active'); 
   $('#refine-search-results-toggle').removeClass('active');
});

// Show expanded brand dialogue when clicking a letter
$('.letter').click(function(){
    
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $('.letters-row').removeClass('expanded');
        $('.brand-names-section').removeClass('visible');
        return;
    } else if($('.letter').hasClass('active')){
        $('.letter').removeClass('active');
        $(this).addClass('active');
        $('.letters-row').addClass('expanded');
        $('.brand-names-section').addClass('visible');
    } else {
        $(this).addClass('active');
        $('.letters-row').addClass('expanded');
        $('.brand-names-section').addClass('visible');
    }
}); 


// Toggle Results View Functionality
$('.toggle-button').click(function(){
    if($(this).hasClass('active')){
        return;
    } else {
        $('.toggle-button').removeClass('active');
        $(this).addClass('active');
    }
});

/* Mobile + Tablet Specific header scripts */
$('.mobile-link-wrapper .button-wrapper').click(function(){
    $(this).closest('.mobile-nav-item').find('.mobile-sub-menu').toggleClass('active');
    $(this).find('.button-svg').toggleClass('flipped');
});

$('.mobile-currency-select').click(function(){
    $(this).find('.currency-dropdown').toggleClass('active');
});

$('.current-language').click(function(){
    $(this).find('.language-dropdown').toggleClass('active');
    console.log('yo');
});

// Example functionality to display results list
$( ".main-header-search-input" ).change(function() {
  
    if($('.main-header-search-input').val() == ''){
        $('.default-appearance').removeClass('hidden');
        $('.display-results').removeClass('active');
    } else {
        $('.default-appearance').addClass('hidden');
        $('.display-results').addClass('active');
    }

});

