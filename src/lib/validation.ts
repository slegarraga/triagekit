interface FormState {
  projectName: string
  repoUrl: string
  type: 'bug-report' | 'feature-request' | 'support-request'
  additionalFields: string
}

export interface FieldErrors {
  projectName?: string
  repoUrl?: string
  additionalFields?: string
}

const NAME_MIN = 2
const NAME_MAX = 100
const FIELDS_MAX = 5000

/**
 * Validate a form. Returns only the failing fields; an empty object means the
 * form is valid. Pure so it can run on every keystroke/blur without cost.
 */
export function validateForm(f: FormState): FieldErrors {
  const errors: FieldErrors = {}

  const name = f.projectName.trim()
  if (!name) {
    errors.projectName = 'Project name is required.'
  } else if (name.length < NAME_MIN) {
    errors.projectName = `Project name must be at least ${NAME_MIN} characters.`
  } else if (name.length > NAME_MAX) {
    errors.projectName = `Project name must be ${NAME_MAX} characters or fewer.`
  }

  const url = f.repoUrl.trim()
  if (url) {
    try {
      const parsed = new URL(url)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        errors.repoUrl = 'Repo URL must be an http(s) URL.'
      }
    } catch {
      errors.repoUrl = 'Repo URL must be a valid URL (e.g. https://github.com/user/repo).'
    }
  }

  if (f.additionalFields.length > FIELDS_MAX) {
    errors.additionalFields = `Custom sections are limited to ${FIELDS_MAX} characters (currently ${f.additionalFields.length}).`
  }

  return errors
}
