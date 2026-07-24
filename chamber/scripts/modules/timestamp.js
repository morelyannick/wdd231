/**
 * ES Module: Timestamp Manager
 * Populates hidden timestamp form inputs with current ISO date-time string
 */

export function setFormTimestamp(inputId = "timestamp") {
    const timestampField = document.getElementById(inputId);
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}
