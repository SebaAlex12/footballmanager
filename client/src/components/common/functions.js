export const replaceSpecialChars = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
		.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
		.replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
		.replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
        .toLowerCase();
}