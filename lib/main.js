let data = require('sdk/self').data;
let tabs = require('sdk/tabs');
let notifications = require('sdk/notifications');

let prevTab = false;

function blockPorn(title, url) {
	let patterns = /slut|porn|horny/i;
	return patterns.test(title) || patterns.test(url);
}

function back(tab) {
	if (blockPorn(tab.title, tab.url)) {
		if (prevTab) {
			tab.attach({
				contentScriptFile: data.url('back.js')
			});
		} else {
			tab.close();
		}
		notify();
	}

	//After visiting clean page, set prevTab to true.
	setPrevTab(tab);
}

function close(tab) {
	if (blockPorn(tab.title, tab.url)) {
		tab.close();
		notify();
	}
}

function notify() {
	notifications.notify({
		title: '0jerking',
		text: 'Page was closed due to suspicion to porn.'
	});
}

function setPrevTab(tab) {
	prevTab = (tab.url !== 'about:newtab');
}

tabs.on('activate', setPrevTab);
tabs.on('ready', back);
tabs.on('open', close);