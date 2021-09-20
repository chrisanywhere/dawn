/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-socks' : '&#xe001;',
			'icon-sm' : '&#xe002;',
			'icon-shirts-hang' : '&#xe003;',
			'icon-pants-hang' : '&#xe004;',
			'icon-paint-brush' : '&#xe005;',
			'icon-long-dress' : '&#xe006;',
			'icon-jacket' : '&#xe007;',
			'icon-frameless-doors' : '&#xe008;',
			'icon-framed-doors' : '&#xe009;',
			'icon-folded-clothes' : '&#xe00a;',
			'icon-dressing-gown' : '&#xe00b;',
			'icon-paint-format' : '&#xe00c;',
			'icon-truck' : '&#xe00d;',
			'icon-paypal' : '&#xe00e;',
			'icon-file-pdf' : '&#xe00f;',
			'icon-file-excel' : '&#xe011;',
			'icon-underwear' : '&#xe000;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};