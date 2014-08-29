let data = require('sdk/self').data;
let tabs = require('sdk/tabs');
let notifications = require('sdk/notifications');

let prevTab = false;

function blockPorn(title, url) {
	let patterns = /slut|porn|horny|pussy|busty|milf|boob|tit|vagina|sex|penis|cock|dick|fuck/i;
	return patterns.test(title) || patterns.test(url);
}

function back(tab) {
	if (blockPorn(tab.title, tab.url)) {
		if (prevTab) {
			gotoDialog().contentScriptOptions.close = false;
		} else {
			gotoDialog().contentScriptOptions.close = true;
		}
		notify();
	}

	//After visiting clean page, set prevTab to true.
	setPrevTab(tab);
}

function close(tab) {
	if (blockPorn(tab.title, tab.url)) {
		gotoDialog().contentScriptOptions.close = true;
	}
}

function gotoDialog() {
	let activeTab = tabs.activeTab;
	let url = activeTab.url;

	activeTab.url = data.url('dialog.html');
	activeTab.attach({
		contentScriptFile: data.url('dialog.js'),
		contentScriptWhen: 'ready',
		contentScriptOptions: {
			url: url
		}
	});

	return activeTab;
}

function setPrevTab(tab) {
	prevTab = (tab.url !== 'about:newtab');
}

tabs.on('activate', setPrevTab);
tabs.on('ready', back);
tabs.on('open', close);