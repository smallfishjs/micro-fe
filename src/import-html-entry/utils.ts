export function getInlineCode(match: string) {
	const start = match.indexOf('>') + 1;
	const end = match.lastIndexOf('<');
	return match.substring(start, end);
}

function hasProtocol(url: string): boolean {
	return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * 根据相对路径，获取绝对路径
 */
export function resolvePath(path: string, url:string): string {
	if (hasProtocol(path)) {
		return path
	}
	url = location.protocol + url
	if (path.startsWith('//')) {
		const urlObj = new URL(url)
		return urlObj.protocol + path
	}
	const resultUrl = new URL(path, url)
	return resultUrl.href
}