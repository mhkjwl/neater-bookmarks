const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const popupScript = fs.readFileSync(path.join(root, 'neat.js'), 'utf8');
const optionsScript = fs.readFileSync(path.join(root, 'options.js'), 'utf8');

test('bookmark icons use the local Chrome favicon cache', function(){
	assert.ok(manifest.permissions.includes('favicon'));
	assert.match(popupScript, /chrome\.runtime\.getURL\('\/_favicon\/\?pageUrl='/);
	assert.doesNotMatch(popupScript, /google\.com\/s2\/favicons/);
});

test('popup startup does not fetch the complete bookmark tree', function(){
	assert.match(popupScript, /chrome\.bookmarks\.getChildren\('0'/);
	assert.doesNotMatch(popupScript, /chrome\.bookmarks\.getTree\(/);
});

test('expanded folders restore after first paint in bounded chunks', function(){
	assert.match(popupScript, /requestAnimationFrame\(function\(\)\{[\s\S]*requestAnimationFrame\(restoreNextFolder\)/);
	assert.match(popupScript, /Math\.min\(index \+ 100, children\.length\)/);
	assert.match(popupScript, /loading="lazy" decoding="async"/);
	assert.match(popupScript, /!parent\.isConnected \|\| !parent\.hasClass\('open'\)/);
});

test('a large folder yields between 100-item render batches', function(){
	const children = Array.from({length: 250});
	const batches = [];
	let index = 0;
	while (index < children.length){
		const end = Math.min(index + 100, children.length);
		batches.push(end - index);
		index = end;
	}
	assert.deepEqual(batches, [100, 100, 50]);
});

test('remembered state is restored only after progressive loading', function(){
	assert.match(popupScript, /if \(!task\)\{[\s\S]*finishStateRestore\(\)/);
	assert.match(popupScript, /\$tree\.scrollTop = savedScrollTop/);
	assert.match(popupScript, /if \(!stateRestorePending\) localStorage\.scrollTop/);
	assert.match(popupScript, /saveOpenFolders\(\)/);
	assert.doesNotMatch(popupScript, /querySelectorAll\('li\.open'\)/);
});

test('enabling remembered state removes the opt-out setting', function(){
	assert.match(optionsScript, /rememberPrevState\.checked[\s\S]*removeItem\('dontRememberState'\)/);
});

test('remembered search restores after first paint without parallel folder loading', function(){
	assert.match(popupScript, /savedSearchQuery = rememberState \? \(localStorage\.searchQuery \|\| ''\) : ''/);
	assert.match(popupScript, /if \(deferFolderRestoreForSearch\) return/);
	assert.match(popupScript, /requestAnimationFrame\(function\(\)\{[\s\S]*searchInput\.value = savedSearchQuery[\s\S]*search\(\)/);
	assert.match(popupScript, /localStorage\.searchQuery = value/);
	assert.doesNotMatch(popupScript, /Search is popup-local/);
});

test('search batches parent-folder lookups', function(){
	assert.match(popupScript, /chrome\.bookmarks\.get\(parentIds,/);
	assert.doesNotMatch(popupScript, /chrome\.bookmarks\.get\(parentId,/);
	assert.match(popupScript, /setTimeout\(function\(\)\{[\s\S]*chrome\.bookmarks\.search\(value,[\s\S]*\}, 80\)/);
});
