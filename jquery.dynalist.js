/**
 * dynalist
 * Author Craig McIntosh 2012
 */

/**
 * jQuery plug-in to compress and expand lists with nested elements.
 * Intended to be used with CSS to provide a tabbed view on desktop 
 * and accordian view on mobile devices, according to responsive design principles.
 * 
 * See defaults object below for full list of configuration options.
 * 
 * @author Craig McIntosh
 */ 
 
(function($) {
	
	$.fn.dynalist = function( o ) { 
		
		// Usual defaults override, plus population of mobile / desktop sub-objects with defaults
		var vars = $.extend( {}, $.fn.dynalist.defaults, o );
		vars.desktop = $.extend( {}, vars, vars.desktop );
		vars.mobile = $.extend( {}, vars, vars.mobile );
		
		var dynalist = $.fn.dynalist;
	
		// Wrap any text nodes, in case the triggering phrase has not been wrapped
		this.children().contents().filter(function() { 
			return this.nodeType == 3 && $.trim(this.textContent) != ''; 
		}).wrap('<span></span>')
		
		// Hide everything to begin with
		this.children().children(':not(:first-child)').hide();
		
		// Show elements matching visibleSelector, if this is called for
		var visibleSelector = dynalist.isMobile( vars.switchWidth ) 
			? vars.mobile.visibleSelector 
			: vars.desktop.visibleSelector;
		if( visibleSelector ) {
			this.children( visibleSelector ).addClass( vars.selectedClass ).children(':not(:first-child)').show();
		}
				
		// Apply onClick behaviour
		this.children().children(':first-child').click(function(evt){ 
			var parent = $( this ).parent();
			var fullyCollapsable = dynalist.isMobile( vars.switchWidth ) 
				? vars.mobile.fullyCollapsable 
				: vars.desktop.fullyCollapsable;
			evt.preventDefault();
			conceal( parent.siblings() );
			if( !parent.hasClass( vars.selectedClass ) ) {
				reveal( parent );
			} else if( fullyCollapsable ) {
				conceal( parent );
			}
		});
	
		// Member functions follow //
	
		function reveal( el ) {
			if( dynalist.isMobile( vars.switchWidth ) ) 
				vars.mobile.showAction( el.children(':not(:first-child)'), getShowSpeed() );
			else 
				vars.desktop.showAction( el.children(':not(:first-child)'), getShowSpeed() );
			el.addClass( vars.selectedClass );
		}
		
		function conceal( el ) {
			if( dynalist.isMobile( vars.switchWidth ) ) 
				vars.mobile.hideAction( el.children(':not(:first-child)'), getHideSpeed() );
			else 
				vars.desktop.hideAction( el.children(':not(:first-child)'), getHideSpeed() );
			el.removeClass( vars.selectedClass );
		}
		
		function getHideSpeed() {
			return dynalist.isMobile( vars.switchWidth ) ? vars.mobile.hideSpeed : vars.desktop.hideSpeed;
		}
		
		function getShowSpeed() {
			return dynalist.isMobile( vars.switchWidth ) ? vars.mobile.showSpeed : vars.desktop.showSpeed;
		}		
	
		return this;
	};

	/* Member function to determine whether we are in a mobile or desktop state.
	 * @param Int switchWidth From dynalist.defaults, this contains the browser width 
	 *		considered to be the threshold between mobile and desktop views.
	 */
	$.fn.dynalist.isMobile = function( switchWidth ) { 
		return $(window).width() < switchWidth;
	}
	
	/* Default animation functions, for use as callbacks for hideAction and showAction options. */
	$.fn.dynalist.fadeOut = function( coll, speed ) {		coll.fadeOut( speed ); 		};
	$.fn.dynalist.fadeIn = function( coll, speed ) {		coll.fadeIn( speed );		};
	$.fn.dynalist.slideUp = function( coll, speed ) {		coll.slideUp( speed ); 		};
	$.fn.dynalist.slideDown = function( coll, speed ) {		coll.slideDown( speed ); 	};

		
	$.fn.dynalist.defaults = {

		// NOTE: The following two variables are universal;
		// they cannot be overridden by the desktop or mobile sub-objects.
		selectedClass: 'open',		// Classname to apply to selected list item
		switchWidth: 480,			// Pixel width to switch animations at

		// All following variables may be overridden by desktop or mobile sub-objects.

		visibleSelector: ':first',	// Elements matching this selector will be visible on load.
		fullyCollapsable: true,		// If true, clicking on an open tab will close it.
		
		hideSpeed: 500,				// Duration of animation in milliseconds
		showSpeed: 500,				// Duration of animation in milliseconds
				
		// Follows are the callback functions to apply a show or hide animation.
		// All functions accept two parameters: 
		//  the jQuery collection of tabs to show or hide, and the speed in milliseconds to do it at.
		hideAction: $.fn.dynalist.slideUp, 
		showAction: $.fn.dynalist.slideDown,
		
		// Follows are setting overrides to apply only in desktop mode or mobile mode.
		// See above for variables which cannot be overridden.
		desktop: {
			desktop: null,	// Just to keep things tidy upon extend call
			mobile: null,	// Just to keep things tidy upon extend call
		},
		
		mobile: {
			desktop: null,	// Just to keep things tidy upon extend call
			mobile: null,	// Just to keep things tidy upon extend call
		}
		
	};

})(jQuery);

