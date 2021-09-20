smtheme
=======

The Shopify theme for Spacemaker Wardrobes

## CURRENT VERSIONS ##
======================
Bootstrap:      3.3.5
Lightbox:       2.8.1
html5shiv:      
Respond:        
FontIcons
BS Validator:	0.5.3
jQuery:			2.1.4
Spin:			2.3.2
Instafeed:		1.3.2

---

## BOOTSTRAP ##
===============

1.	use the bootstrap customiser on the bootstrap website;
2.	uncheck glyphicons;
3.	change typography as below;
4.	press 'compile and download' button;
5.	update the css file in assets directory.

### typography changes ###

 @font-size-base:		16px;
 @line-height-base:		1.5; // 24/16

### modal popups ###
{% assign modal-id = 'deliveryTermsModal' %}
{% assign modal-label = 'deliveryTermsLabel' %}
{% assign modal-title = 'Delivery Terms &amp; Conditions' %}
{% capture modal-body %}
	{% include 'global-delivery-content' %}
{% endcapture %}
{% include 'helper-modal-popup' %}

### collapse ###
{% assign collapse-id = "qld" %}
{% capture collapse-title %}Areas Included <span class="caret"></span>{% endcapture %}
{% capture collapse-body %}
	{% include 'collapse-body-snippet' %}
{% endcapture %}
{% include 'helper-collapse' %}

### Font Icons ###
url:  fonticons.com
Just ensure that you have the latest version of Font Icons in the theme.liquid file. 
Website and instructions:  https://fonticons.com

*Additional classes*
icon-dark
icon-big
icon-small

### Custom CSS & JS ###
for uglify, in node run cd c:\Users\Adam\Documents\Spacemaker\smtheme\SpaceMaker.Web\_cssjs
uglify:		uglifyjs custom.js -o c:\Users\Adam\Documents\Spacemaker\smtheme\SpaceMaker.Web\assets\custom.min.js -c
			where -o = output; -c = compress

for SASS, in ruby run cd c:\Users\Adam\Documents\Spacemaker\smtheme\SpaceMaker.Web\_cssjs
sass:		sass custom.scss c:\Users\Adam\Documents\Spacemaker\smtheme\SpaceMaker.Web\assets\customtest.min.css --style compressed --sourcemap=none

### Lightbox Gallery ###
http://lokeshdhakar.com/projects/lightbox2/

1.	CSS customisations: Open lightbox.css - change required paths, as follows:

{{ 'close.png' | asset_url }}
{{ 'loading.gif' | asset_url }}
{{ 'prev.png' | asset_url }}
{{ 'next.png' | asset_url }}


### SPIN ###
From http://fgnass.github.io/spin.js/#!
Github:  https://github.com/fgnass/spin.js
Usage:
// prepend to selected element:
jQuery(doorApp).prepend(spinner.el);

// start the spinner:
jQuery(doorApp).data('spinner', spinner);
// stop the spinner:
jQuery(spinner.el).detach();

### Images ###
Maximum Width:	800px
Height:			600px

### Bootstrap Validator ###
Used to validate forms and provide feedback / error messages to users

URL:	http://bootstrapvalidator.com/
github:	https://github.com/nghuuphuoc/bootstrapvalidator
Now:  http://formvalidation.io/


### Instafeed ###
https://github.com/stevenschobert/instafeed.js
---


## WINDOWS STUFF ##
===================

## Setup ##
Github:		Github for Windows
Nodejs:		4.2.2 (nodejs.org)
SASS:		3.4.19
uglifyjs:	2.4.15
grunt:		0.1.13
html minify: http://www.willpeavy.com/minifier/

### Git ###
Github for Windows

### Node.js ###
To update, go to nodejs.org/download/ and download the latest windows package.
Open NodeJS and use "npm install -g packagename" to install packages. -g signifies global level.
To view all packages installed, use "npm -g ls"
To uninstall packages, use "npm -g uninstall packagename"

### Grunt ###
npm install -g grunt-cli

### SASS CSS - Ruby Plugin ##
Ruby plugin - gem install sass
Used to minify CSS & make easier to manage

### Uglify JS ###
npm install uglify-js -g
Used to minify Javascript & make easier to manage

---


## SUBLIME STUFF ##
===================

## Setup ##
Less-sublime:	https://github.com/danro/Less-sublime


---


## SHOPIFY STUFF ##
===================

### Updating Changes to Shopify ###

Open Ruby console and run:  cd C:\Users\Adam\Documents\Spacemaker\smtheme

### Instructions: ###

*Download all the theme files*
theme download

*Upload a theme file*
theme upload assets/layout.liquid

*Remove a theme file*
theme remove assets/layout.liquid

*Completely replace shop theme assets with the local assets*
theme replace

*Watch the theme directory and upload any files as they change*
theme watch

See full documentation here:  (https://github.com/Shopify/shopify_theme)

*Requires:*

1.	Ruby
2.	Shopify Theme gem (https://github.com/Shopify/shopify_theme)
3.	Ruby DevKit - follow these instructions: (https://github.com/oneclick/rubyinstaller/wiki/development-kit)
4.	JSON - as in above link

### shopify for loops ###
{% assign locations = 'Brisbane, Sunshine Coast, Ipswich, Cairns, Beaudesert, Gold Coast, Toowoomba, Townsville, Mackay, Mount Isa, Rockhampton, Gladstone, Bundaberg, Hervey Bay, Longreach, Currumbin' | split: ',' %}
<ul class="list-group">
{% for l in locations %}
	{% assign location = l | strip %}
	<li class="list-group-item">{{ location }}</li>
{% endfor %}
</ul>

## Using Theme Kit ##
to upload to specific environment:  theme upload --env=production assets/file.liquid



## Markdown ##
==============

See (http://daringfireball.net/projects/markdown/) and (http://github.github.com/github-flavored-markdown/)