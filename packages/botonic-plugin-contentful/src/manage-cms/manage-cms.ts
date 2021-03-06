import { ContentId } from '../cms'
import { ManageContext } from './manage-context'
import * as nlp from '../nlp'
import { Locale } from '../nlp'
import { ContentFieldType } from './fields'

/**
 * Take into account that if you request a content immediately after updating it
 * you might get the old version
 */
export interface ManageCms {
  /**
   * @deprecated should be implemented in CMS interface instead
   */
  getDefaultLocale(): Promise<Locale>

  updateField(
    context: ManageContext,
    contentId: ContentId,
    fieldType: ContentFieldType,
    value: any
  ): Promise<void>

  /** Will not fail if source does not have this field */
  copyField(
    context: ManageContext,
    contentId: ContentId,
    field: ContentFieldType,
    fromLocale: nlp.Locale,
    onlyIfTargetEmpty: boolean
  ): Promise<void>

  copyAssetFile(
    context: ManageContext,
    assetId: string,
    fromLocale: nlp.Locale
  ): Promise<void>

  removeAssetFile(context: ManageContext, assetId: string): Promise<void>
}
