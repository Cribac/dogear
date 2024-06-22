/**
 * Builds a FormData object from an object
 *
 * @param values {[key: string]: string}
 * @returns {FormData}
 */
function buildFormData(values: Record<string, string>): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value)
  }
  return formData
}

export { buildFormData }
