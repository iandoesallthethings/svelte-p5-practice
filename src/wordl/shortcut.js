export function shortcut(node, params) {
	let handler

	function checkModifiers(e) {
		return !!params.alt != e.altKey || !!params.shift != e.shiftKey || !!params.control != (e.ctrlKey || e.metaKey) || params.key != e.key
	}

	function removeHandler() {
		window.removeEventListener('keydown', handler)
	}

	function setHandler() {
		removeHandler()
		if (!params) return

		handler = function (e) {
			if (checkModifiers(e)) return
			e.preventDefault()
			params.callback ? params.callback() : node.click()
		}
		window.addEventListener('keydown', handler)
	}

	setHandler()

	return {
		update: setHandler,
		destroy: removeHandler
	}
}
