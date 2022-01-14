export default class EscapeStringHelper {
    static escapeString(stringToEscape) {
        let escapeStringMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        let escapeRegexp = '/[&<>\'"]/g';
        return stringToEscape.replace(escapeRegexp, (match) => (escapeStringMap[match]));
    }
}

