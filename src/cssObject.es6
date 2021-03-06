/*
 A Javascript object tha represents "CSS" rules. It:
 * can be deeply nested, implying subselections
 * keys can be CSS properties and values CSS property values
 */
import {trim} from '../src/utils/string.es6'


// Calculate "subselector", taking into account & rules and complex
// (comma separated) selectors.
function buildSubcontext(context, key) {
  const keys = key.split(',');
  for (let k = 0; k < keys.length; k++) {
    let sel = trim(keys[k]);
    sel     = ((sel.substr(0, 1) == '&') ? sel.substr(1) : ' ' + sel)
    keys[k] = context + sel
  }

  return trim(keys.join(','))
}


import {isMacroKey} from './filters/macroProcessor.es6'

function entryDefinesSubcontext(key, value) {
  if (key.match(/^\.\#\&/)) return true
  return (typeof value == 'object') && !isMacroKey(key)
}


export const flattenObject = (inputObject) => {
  const out = {}

  const addRule = (selector, propertyName, propertyValue) => {
    selector      = trim(selector)
    out[selector] = out[selector] || {}
    if (out[selector][propertyName]) {
      console.log('Replacing property ', propertyName, ' in ', selector, '; ', out[selector][propertyName], ' => ', propertyValue)
    }
    out[selector][propertyName] = propertyValue
  }


  function addObject(o, context) {
    // o: object with keys
    // entries are either
    //   css property => value
    //   subselector  => rules
    for (var key in o) {
      const value = o[key]
      if (entryDefinesSubcontext(key, value)) {
        const subcontext = buildSubcontext(context, key)
        addObject(value, subcontext) // Recurse!
      } else {
        addRule(context, key, value)
      }
    }
  }

  addObject(inputObject, '')

  return out
}


/**
 * TODO UPDATE DOCS
 */

const compressSelector = (sel) => {
  while (sel.match(/.*#.*#.*/)) {
    sel = sel.replace(/^.*#.*#/, '#');
  }
  return sel
}


import {applyToKeys} from './utils/object.es6'


export const compressSelectors = applyToKeys(compressSelector)