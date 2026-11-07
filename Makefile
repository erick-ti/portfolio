.PHONY: runtime-check install build dev preview dev-stop preview-stop test-runtime smoke

runtime-check:
	@node scripts/check-runtime.mjs

install: runtime-check
	npm ci

build dev preview: runtime-check
	npm run $@

dev-stop: runtime-check
	npm run dev -- stop

preview-stop: runtime-check
	npm run preview -- stop

test-runtime:
	node --test scripts/check-runtime.test.mjs

smoke: test-runtime build
