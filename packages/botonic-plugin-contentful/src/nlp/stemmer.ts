import { BaseStemmer, Stemmer } from '@nlpjs/core/src'
import StemmerCa from '@nlpjs/lang-ca/src/stemmer-ca'
import StemmerEn from '@nlpjs/lang-en-min/src/stemmer-en'
import StemmerEs from '@nlpjs/lang-es/src/stemmer-es'
import StemmerPt from '@nlpjs/lang-pt/src/stemmer-pt'
import StemmerRu from '@nlpjs/lang-ru/src/stemmer-ru'
import StemmerTr from '@nlpjs/lang-tr/src/stemmer-tr'
import { StemmerPl } from './stemmers/polish-stemmer'
import { Locale, rootLocale } from './locales'

/**
 * Hack to workaround https://github.com/axa-group/nlp.js/pull/548
 */
class TurkishStemmer extends StemmerTr {
  stem(tokens: string[]): string[] {
    return BaseStemmer.prototype.stem.call(this, tokens)
  }

  innerStem() {
    // @ts-ignore
    return StemmerTr.prototype.stem.call(this)
  }
}

// see https://github.com/axa-group/nlp.js/blob/HEAD/docs/language-support.md
// and https://stackoverflow.com/a/11210358/145289
// snowball algorithm inspired from https://github.com/MihaiValentin/lunr-languages, based on
// https://github.com/fortnightlabs/snowball-js/blob/master/stemmer/src/ext/SpanishStemmer.js based on
// java version at http://snowball.tartarus.org/download.html
export const stemmers: { [key: string]: Stemmer } = {
  ca: new StemmerCa(),
  en: new StemmerEn(),
  es: new StemmerEs(),
  pl: new StemmerPl(),
  pt: new StemmerPt(),
  ru: new StemmerRu(),
  tr: new TurkishStemmer(),
  //node-nlp does not support polish
}

export function stemmerFor(locale: Locale): Stemmer {
  const stem = stemmers[rootLocale(locale)]
  if (!stem) {
    throw new Error(`No stemmer configured for locale '${locale}'`)
  }
  return stem
}
