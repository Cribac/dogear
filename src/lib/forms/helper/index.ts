/**
 * Builds a FormData object from an object
 *
 * @param values {[key: string]: string}
 * @param {?string} profileId
 * @returns {FormData}
 */
function buildFormData(values: Record<string, string>, profileId?: string): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value)
  }

  if (profileId) {
    formData.append('profileId', profileId)
  }

  return formData
}

export { buildFormData }
