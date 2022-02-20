import { SectionKeyRegex } from '../models/section'
import subjectAreas from '../data/processed/subject-areas.json'
import { ServiceResult } from '../utils/types'

export interface ValidateSectionInput {
    sectionKey: string
}

export type ValidateSectionError =
    | {
          code: 'IMPROPER_SECTION_KEY_FORMAT'
      }
    | {
          code: 'ILLEGAL_SUBJECT_AREA'
          subjectArea: string
      }

export type ValidateSectionResult = ServiceResult<null, ValidateSectionError>

export default function ValidateSectionService({
    sectionKey
}): ValidateSectionResult {
    const result = sectionKey.match(SectionKeyRegex)

    if (!result)
        return {
            success: false,
            payload: {
                code: 'IMPROPER_SECTION_KEY_FORMAT'
            }
        }

    const subjName = result[2]
    const subjArea = subjectAreas.find((subj) => subj.value === subjName)

    if (!subjArea)
        return {
            success: false,
            payload: {
                code: 'ILLEGAL_SUBJECT_AREA',
                subjectArea: subjName
            }
        }

    return {
        success: true,
        payload: null
    }
}
