(function (document) {
	
	'use strict';

	let yes = document.getElementById('yes');
	let no = document.getElementById('no');

	yes.addEventListener('click', accept);
	no.addEventListener('click', reject);

	function accept() {
		location = self.options.url;
	}

	function reject() {console.log('no');
		if (self.options.close) {

		} else {
			history.go(-2);
		}
	}

})(document);