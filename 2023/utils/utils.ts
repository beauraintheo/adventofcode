/**
 * Removes a string from a string
 * @param text Text to remove from
 * @param remove Text to remove
 * @returns Text without the string to remove
 */
export const removeTextFromString = (text: string, remove: string | RegExp) => text.replace(remove, "");