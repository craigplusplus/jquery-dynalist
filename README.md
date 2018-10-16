
Dynalist jQuery Plugin -- OBSOLETE
======================

This is a script that handles a list with nested collapsing sections in a style-agnostic way. It is not assumed that the list is formatted as tabbed data, or an accordion list, or any other format. These presentational concerns are restricted to the accompanying stylesheets.

The impetus of this was the need to apply responsive web design to information-dense websites. In mobile views, accordion lists are the go-to solution for particularly heavy pages, while desktop users might prefer tabs of one kind or another. Since most scripts out there are designed for one format or the other, there was a need for a flexible script such as this.

Included Stylesheets
--------------------

Naturally, a script such as this is useless without separate stylesheets defining the format. Included are two: v_tabs and h_tabs. v_tabs.css defines rules for a list which is formatted as vertical tabs in a desktop environment, and an accordion list on mobile. h_tabs likewise formats as an accordion on mobile, but provides horizontal tabs on desktop.

Usage Example
-------------

See the included test.html file for live examples.

	// Include the stylesheet for horizontal tabs
	<link rel="stylesheet" type='text/css' href='h_tabs.css' />

	<script src='jquery.dynalist.js'></script>
	<script>
		$(document).ready(function(){
			$('#horizontal_tabs_eg').dynalist( {
				desktop: { 
					// The open list item is pre-chosen by assigning this class to it
					visibleSelector: '.open', 
					// No animation
					hideSpeed: 0, 
					// One tab is always open
					fullyCollapsable: false },
				mobile: { 
					// Conversely, on mobile, no list item is visible by default.
					visibleSelector: null	
				} 
			} );
		}
	</script>
	
	<!-- ... -->
	
	<ul id='horizontal_tabs_eg' class='horizontal_tabs'>
		<li>First Tab
			<ul>
				<li>Link 1.1</li>
				<li>Link 1.2</li>
				<li>Link 1.3</li>
			</ul>
		</li>
		<li class='open'>Second Tab
			<ul>
				<li>This is the content</li>
				<li>In this case, I'm imagining a list of links</li>
				<li>Could be anything, though.</li>
			</ul>
		</li>
		<li>Third Tab
			<ul>
				<li>Link 3.1</li>
				<li>Link 3.2</li>
				<li>Link 3.3</li>
			</ul>
		</li>
	</ul>

Options
-------

Note that it is possible to define different behaviour to be used on desktops than is used on mobile devices. The 'options' object holds two sub-objects, 'desktop' and 'mobile.' A variable defined in either of these will override the behaviour defined in the root 'options' object. Only two variables, 'selectedClass' and 'switchWidth' may not be overriden.

* selectedClass (string):		A classname to apply to the selected list item. Default: 'open'.
					Note: This cannot be overridden by the Desktop or Mobile subobects.
* switchWidth (int):			The threshold width above which a desktop platform is assumed. Default: 480.
* visibleSelector (string):		Elements matching this selector will be marked as visible when the script is initialized. Default: ':first'.
* fullyCollapsable (boolean):		Defines the behaviour to occur when an already visible element is clicked. If true, the element will be hidden, and the list will be fully collapsed. If false, no action will be taken. Default: true.

* hideSpeed (int):			The duration of any conceal animation, in milliseconds. Default: 500.
* showSpeed (int):			The duration of any reveal animation, in milliseconds. Default: 500.
* hideAction (callback function):	A function to handle the conceal animation for list content. Accepts two parameters: the jQuery collection to apply the animation to, and the speed at which the animation should proceed. Note that two functions are provided as members of the dynalist object for use here; dynalist.slideUp and dynalist.fadeOut. These functions are merely wrappers around the native jQuery effects. Default: $.fn.dynalist.slideUp.
* showAction (callback function):	A function to handle the reveal animation for list content. Accepts two parameters: the jQuery collection to apply the animation to, and the speed at which the animation should proceed. Note that two functions are provided as members of the dynalist object for use here; dynalist.slideDown and dynalist.fadeIn. These functions are merely wrappers around the native jQuery effects. Default: $.fn.dynalist.slideDown.
* desktop (object): 			A sub-object in which any of the above options (except those noted) may be overridden for use in a desktop environment.
* mobile (object): 			A sub-object in which any of the above options (except those noted) may be overridden for use in a mobile environment.


Customization
-------------

Note that some member functions of the dynalist object are publicly defined and accessable. This means that they can be redefined before use to modify certain behaviour. This is particularly useful in the case of dynalist.isMobile(), the member function used to define whether an environment is considered to be dektop or mobile.

By design, this function works rather naivly, simply by comparing the browser width to the switchWidth option. Depending on your usage, you may well want more complex decision making here. Below is an example of overriding this function with one that makes its determination based on an element that is hidden by CSS media queries for mobile devices. Such a method would have the advantage of keeping the determination of evnironment type completely restricted to the stylesheet files.

	<style type='text/css' media="screen and (min-device-width: 480px)">
		.not_mobile { display: none; }
	</style>
	<script src='jquery.dynalist.js'></script>
	<script>
		// Create custom behaviour
		$.dynalist.isMobile = function( switchWidth ) {
			return $('.not_mobile:visible').length > 0;
		}
		// Then init
		$(document).ready(function(){
			$('#your_list').dynalist();
		});
	</script>

Author
------

Craig McIntosh  
craigmc.info

Licence
-------

!["Creative Commons License"] (http://i.creativecommons.org/l/by/3.0/88x31.png)

This work is licensed under a [Creative Commons Attribution 3.0 Unported License] (http://creativecommons.org/licenses/by/3.0/).
