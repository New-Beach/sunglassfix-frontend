/*

    INDEX

    1. Global Scripts 
    2. Header Scripts
    3. Results Page Scripts (Including Brand Page Scripts)
    4. Product Page Scripts


/* 
    1. Global Scripts 
*/

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

/* 
    2. Header Scripts 
*/

/* Mobile Menu functions. This opens the mobile menu and replaces the icon to reflect the new state */

$('.mobile-menu-bars').click(function(){
    $(this).toggleClass('open');
    $('.page-navigation-container').toggleClass('open');
    $('.mobile-menu-element').toggleClass('active');
});

$('.mobile-menu-toggle').click(function(){
    $(this).toggleClass('flipped');
    $(this).next('.sub-menu').toggleClass('display');
});

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
    $('.navigation-search-bar').addClass('transparent-bg transparent-toggle');
    $('.cart-link').addClass('colour-change');
}

/* Change the Header on scroll */

$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    scroll_pos = 40;

    if(y_scroll_pos > scroll_pos) {
        $('.navigation-search-bar').addClass('scrolled');
        $('.cart-link').addClass('scrolled');
        if(transparent_header = true){
           $('.transparent-toggle').removeClass('transparent-bg'); 
        }
    }
    if(y_scroll_pos < scroll_pos) {
        $('.navigation-search-bar').removeClass('scrolled');
        $('.cart-link').removeClass('scrolled');
        if(transparent_header = true){
           $('.transparent-toggle').addClass('transparent-bg'); 
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

/* 
    3. Results Page Scripts (Including Brand Page Scripts)
*/

/* Stick the filter element to the header on scroll, and adjust the elements
under this filter element to the new page layout */

var header_height = $('.site-header').outerHeight();
if($('.search-filter').length){
  var distance = $('.search-filter').offset().top - header_height;  
}
var search_filter_height = $('.search-filter').height();
var total_header_height = header_height + search_filter_height;

$(window).scroll(function() {
    if ( $(this).scrollTop() >= distance ) {
        $('.search-filter').addClass('scrolled');
        $('.search-filter-dialogue').addClass('scrolled');
        $('.search-filter-dialogue').css('margin-top', total_header_height);
        $('.results-display-section').css('margin-top', search_filter_height);
        $('.results-display-by-name').css('margin-top', search_filter_height);
    }
    if ( $(this).scrollTop() < distance ) {
        $('.search-filter').removeClass('scrolled');
        $('.search-filter-dialogue').removeClass('scrolled');
        $('.search-filter-dialogue').css('margin-top', '0');
        $('.results-display-section').css('margin-top', '0');
        $('.results-display-by-name').css('margin-top', '0');
    }
}); 

/* Activate, display and hide the search filter dialogue */

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
        $('.results-display-by-name').toggleClass('hidden');
        $('.results-display-section').toggleClass('hidden');
    }
});

// Toggle Results View Functionality for mobile

$("#mobile-display-toggle-select-input").change(function(){
    var mobileDisplay = $("#mobile-display-toggle-select-input").val();
    if (mobileDisplay == 'Display Images'){
        $('.results-display-by-name').addClass('hidden');
        $('.results-display-section').removeClass('hidden');
    } else {
        $('.results-display-by-name').removeClass('hidden');
        $('.results-display-section').addClass('hidden'); 
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

/* 
    4. Product Page Scripts
*/

/* Add top distance equal to header height to fixed product summary */

$('.product-carousel-purchase-section').css('top', header_height);

/* Alter the width of the thumbnail carousel container based on the number of image */

if($('.product-carousel-thumbnail-navigation').length){
    count = $(".product-carousel-thumbnails .thumbnail-image").length;
    width = count * 3;
    thumbnail_container_width = width + "rem";
    $('.product-carousel-thumbnail-navigation').css('width', thumbnail_container_width)
}

/* Control the carousel and thumbnails with Slick Slider */

$('.product-carousel-images').slick({
    asNavFor: '.product-carousel-thumbnails',
    prevArrow: $('.previous-image-link'),
    nextArrow: $('.next-image-link'),
    draggable: false,
});

$('.product-carousel-thumbnails').slick({
    asNavFor: '.product-carousel-images',
    slidesToScroll: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    variableWidth: true,
    centreMode: true,
    draggable: false,
});

/* Make the fixed element absolute if screen size is to keep it fixed on the screen */

if($('.product-carousel-purchase-section').length){
    
    fixed_product_summary = $('.product-carousel-purchase-section').height();
    min_browser_height = fixed_product_summary + header_height;

    function switchMobileLayout() {
        var browser_height = $(window).height();
        if(browser_height < min_browser_height){
           $('.product-carousel-purchase-section').addClass('mobile-layout'); 
        } else {
           $('.product-carousel-purchase-section').removeClass('mobile-layout'); 
        }
    }
    switchMobileLayout();
    $(window).resize(function(){
        switchMobileLayout();
    });
}

/* When Fixed Element reaches footer, removed fixed positioning and position it where it stopped */

var fixed_product_height =  $('.product-carousel-purchase-section').height();
var fixed_distance_from_top = fixed_product_height + header_height;
if($('.site-footer').length){
  var footer_distance = $('.site-footer').offset().top;  
}

var final_distance = footer_distance - fixed_distance_from_top - 64;

$(window).scroll(function() {
    if ( $(this).scrollTop() >= final_distance ) {
        $('.product-carousel-purchase-section').addClass('absolute-bottom');
    } else if ( $(this).scrollTop() < final_distance ) {
        $('.product-carousel-purchase-section').removeClass('absolute-bottom');
    }
});


/* Selecting a lens type function */
$('.lens-type-option').click(function(){
    
    // Remove seelcted from other options
    $('.lens-type-option').removeClass('selected');
    $('.selection-radio input').attr('checked', false);

    //Add selected to this option
    $(this).addClass('selected');
    $(this).find('.selection-radio input').attr('checked', true);
    
    //Updated Purchase Summary
    var selected_lens = $(this).find('.selection-name strong').html();
    $('.lens-type-selected').html(selected_lens);

    updateMobileOrderNote();
});

/* Selecting a colour option */

$('.lens-colour-option').click(function(){
    $('.lens-colour-option').removeClass('selected');
    $(this).addClass('selected');  

    var selected_colour = $(this).find('.name').html();
    $('.lens-colour-selected').html(selected_colour);

    updateMobileOrderNote();
    
});

/* Selecting Accessories */
$('.select-accessories').change(function(){
    var selected_value = $('.select-accessories').val();
    if (selected_value == 'Please Select'){
        $('.accessories-selected').html('None Selected');
        if(!$('.accessories-selected').hasClass('slate-text')){
           $('.accessories-selected').addClass('slate-text'); 
        }
    } else {
        $('.accessories-selected').removeClass('slate-text');
        $('.accessories-selected').html(selected_value);
    }
    updateMobileOrderNote();
});

//Update mobile footer to reflect change
function updateMobileOrderNote(){
  $('.show-order').addClass('flash');
    $('.order-updated-note').addClass('flash');

    function resetOrderNote() {
        $('.show-order').removeClass('flash');
        $('.order-updated-note').removeClass('flash');
    }

    setTimeout(resetOrderNote, 2000);  
}

/* Show Mobile Product Summary */

$('.show-order-toggle').click(function(){
    $('.product-summary-mobile-expanded').addClass('open');
});

$('.product-summary-close').click(function(){
    $('.product-summary-mobile-expanded').removeClass('open');
});

$('.product-summary-mobile-expanded').click(function(){
    $('.product-summary-mobile-expanded').removeClass('open');
}).children().click(function(e) {
  return false;
});

/* Image Comparison Functions */

jQuery(document).ready(function($){
    var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    
    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;   
        //constrain the draggable element to move inside his container
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }
});

// Update image on comparison
$(".lens-colour-select .lens-colour-option").click(function() {
    var mainImage = $(this).attr("data-image");
    $(".cd-image-container .cd-resize-img img").attr('src', mainImage);
    return false;
});

