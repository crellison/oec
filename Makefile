pug:
	pug -P chapters/*/ -o dist
publish:
	git subtree push --prefix dist origin gh-pages