# Unicode property escapes in _regexpu_

To opt-in to experimental support for [Unicode property escapes](https://github.com/mathiasbynens/es-regexp-unicode-property-escapes), enable [the `unicodePropertyEscape` option](README.md#unicodepropertyescape-default-false).

```js
rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
  'unicodePropertyEscape': true
});
// → '(?:\\uD811[\\uDC00-\\uDE46])'
```

If you’re targeting ES6 environments exclusively, consider enabling [the `useUnicodeFlag` option](README.md#useunicodeflag-default-false) for simpler (but not necessarily more compact) output.

```js
rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
  'unicodePropertyEscape': true,
  'useUnicodeFlag': true
});
// → '[\\u{14400}-\\u{14646}]'
```

[An online demo is available.](https://mothereff.in/regexpu#input=var+regex+%3D+/%5Cp%7BScript_Extensions%3DGreek%7D/u%3B&unicodePropertyEscape=1)

Note that this feature is non-standard. This implementation may or may not reflect what eventually gets specified.

What follows is an exhaustive overview of the Unicode properties and values that _regexpu_ supports in `\p{…}` and `\P{…}` expressions in regular expressions with the `u` flag.

## Non-binary properties

### `General_Category`

Possible values:

```sh
$ node -e 'require("unicode-9.0.0").General_Category.forEach(c => { console.log(`\\p{${c}}`); })'
\p{Cased_Letter}
\p{Close_Punctuation}
\p{Connector_Punctuation}
\p{Control}
\p{Currency_Symbol}
\p{Dash_Punctuation}
\p{Decimal_Number}
\p{Enclosing_Mark}
\p{Final_Punctuation}
\p{Format}
\p{Initial_Punctuation}
\p{Letter}
\p{Letter_Number}
\p{Line_Separator}
\p{Lowercase_Letter}
\p{Mark}
\p{Math_Symbol}
\p{Modifier_Letter}
\p{Modifier_Symbol}
\p{Nonspacing_Mark}
\p{Number}
\p{Open_Punctuation}
\p{Other}
\p{Other_Letter}
\p{Other_Number}
\p{Other_Punctuation}
\p{Other_Symbol}
\p{Paragraph_Separator}
\p{Private_Use}
\p{Punctuation}
\p{Separator}
\p{Space_Separator}
\p{Spacing_Mark}
\p{Surrogate}
\p{Symbol}
\p{Titlecase_Letter}
\p{Unassigned}
\p{Uppercase_Letter}
```

Note that the `General_Category=` prefix may be used, e.g. `\p{General_Category=Cased_Letter}`.

Category aliases may be used, e.g. `\p{Lc}` or `\p{General_Category=Lc}`, although IMHO it’s more readable to stick to the canonical category names listed above.

### `Script` & `Script_Extensions`

The sets of possible values for `Script` and `Script_Extensions` are identical:

```sh
$ node -e 'require("unicode-9.0.0").Script_Extensions.forEach(s => { console.log(`\\p{Script_Extensions=${s}}`); })'
\p{Script_Extensions=Adlam}
\p{Script_Extensions=Ahom}
\p{Script_Extensions=Anatolian_Hieroglyphs}
\p{Script_Extensions=Arabic}
\p{Script_Extensions=Armenian}
\p{Script_Extensions=Avestan}
\p{Script_Extensions=Balinese}
\p{Script_Extensions=Bamum}
\p{Script_Extensions=Bassa_Vah}
\p{Script_Extensions=Batak}
\p{Script_Extensions=Bengali}
\p{Script_Extensions=Bhaiksuki}
\p{Script_Extensions=Bopomofo}
\p{Script_Extensions=Brahmi}
\p{Script_Extensions=Braille}
\p{Script_Extensions=Buginese}
\p{Script_Extensions=Buhid}
\p{Script_Extensions=Canadian_Aboriginal}
\p{Script_Extensions=Carian}
\p{Script_Extensions=Caucasian_Albanian}
\p{Script_Extensions=Chakma}
\p{Script_Extensions=Cham}
\p{Script_Extensions=Cherokee}
\p{Script_Extensions=Common}
\p{Script_Extensions=Coptic}
\p{Script_Extensions=Cuneiform}
\p{Script_Extensions=Cypriot}
\p{Script_Extensions=Cyrillic}
\p{Script_Extensions=Deseret}
\p{Script_Extensions=Devanagari}
\p{Script_Extensions=Duployan}
\p{Script_Extensions=Egyptian_Hieroglyphs}
\p{Script_Extensions=Elbasan}
\p{Script_Extensions=Ethiopic}
\p{Script_Extensions=Georgian}
\p{Script_Extensions=Glagolitic}
\p{Script_Extensions=Gothic}
\p{Script_Extensions=Grantha}
\p{Script_Extensions=Greek}
\p{Script_Extensions=Gujarati}
\p{Script_Extensions=Gurmukhi}
\p{Script_Extensions=Han}
\p{Script_Extensions=Hangul}
\p{Script_Extensions=Hanunoo}
\p{Script_Extensions=Hatran}
\p{Script_Extensions=Hebrew}
\p{Script_Extensions=Hiragana}
\p{Script_Extensions=Imperial_Aramaic}
\p{Script_Extensions=Inherited}
\p{Script_Extensions=Inscriptional_Pahlavi}
\p{Script_Extensions=Inscriptional_Parthian}
\p{Script_Extensions=Javanese}
\p{Script_Extensions=Kaithi}
\p{Script_Extensions=Kannada}
\p{Script_Extensions=Katakana}
\p{Script_Extensions=Kayah_Li}
\p{Script_Extensions=Kharoshthi}
\p{Script_Extensions=Khmer}
\p{Script_Extensions=Khojki}
\p{Script_Extensions=Khudawadi}
\p{Script_Extensions=Lao}
\p{Script_Extensions=Latin}
\p{Script_Extensions=Lepcha}
\p{Script_Extensions=Limbu}
\p{Script_Extensions=Linear_A}
\p{Script_Extensions=Linear_B}
\p{Script_Extensions=Lisu}
\p{Script_Extensions=Lycian}
\p{Script_Extensions=Lydian}
\p{Script_Extensions=Mahajani}
\p{Script_Extensions=Malayalam}
\p{Script_Extensions=Mandaic}
\p{Script_Extensions=Manichaean}
\p{Script_Extensions=Marchen}
\p{Script_Extensions=Meetei_Mayek}
\p{Script_Extensions=Mende_Kikakui}
\p{Script_Extensions=Meroitic_Cursive}
\p{Script_Extensions=Meroitic_Hieroglyphs}
\p{Script_Extensions=Miao}
\p{Script_Extensions=Modi}
\p{Script_Extensions=Mongolian}
\p{Script_Extensions=Mro}
\p{Script_Extensions=Multani}
\p{Script_Extensions=Myanmar}
\p{Script_Extensions=Nabataean}
\p{Script_Extensions=New_Tai_Lue}
\p{Script_Extensions=Newa}
\p{Script_Extensions=Nko}
\p{Script_Extensions=Ogham}
\p{Script_Extensions=Ol_Chiki}
\p{Script_Extensions=Old_Hungarian}
\p{Script_Extensions=Old_Italic}
\p{Script_Extensions=Old_North_Arabian}
\p{Script_Extensions=Old_Permic}
\p{Script_Extensions=Old_Persian}
\p{Script_Extensions=Old_South_Arabian}
\p{Script_Extensions=Old_Turkic}
\p{Script_Extensions=Oriya}
\p{Script_Extensions=Osage}
\p{Script_Extensions=Osmanya}
\p{Script_Extensions=Pahawh_Hmong}
\p{Script_Extensions=Palmyrene}
\p{Script_Extensions=Pau_Cin_Hau}
\p{Script_Extensions=Phags_Pa}
\p{Script_Extensions=Phoenician}
\p{Script_Extensions=Psalter_Pahlavi}
\p{Script_Extensions=Rejang}
\p{Script_Extensions=Runic}
\p{Script_Extensions=Samaritan}
\p{Script_Extensions=Saurashtra}
\p{Script_Extensions=Sharada}
\p{Script_Extensions=Shavian}
\p{Script_Extensions=Siddham}
\p{Script_Extensions=SignWriting}
\p{Script_Extensions=Sinhala}
\p{Script_Extensions=Sora_Sompeng}
\p{Script_Extensions=Sundanese}
\p{Script_Extensions=Syloti_Nagri}
\p{Script_Extensions=Syriac}
\p{Script_Extensions=Tagalog}
\p{Script_Extensions=Tagbanwa}
\p{Script_Extensions=Tai_Le}
\p{Script_Extensions=Tai_Tham}
\p{Script_Extensions=Tai_Viet}
\p{Script_Extensions=Takri}
\p{Script_Extensions=Tamil}
\p{Script_Extensions=Tangut}
\p{Script_Extensions=Telugu}
\p{Script_Extensions=Thaana}
\p{Script_Extensions=Thai}
\p{Script_Extensions=Tibetan}
\p{Script_Extensions=Tifinagh}
\p{Script_Extensions=Tirhuta}
\p{Script_Extensions=Ugaritic}
\p{Script_Extensions=Vai}
\p{Script_Extensions=Warang_Citi}
\p{Script_Extensions=Yi}
```

Note that script name aliases may be used as well, e.g. `\p{Script_Extensions=Aghb}`, although IMHO it’s more readable to stick to the canonical script names listed above.

### `Word_Break`

Possible values:

```sh
$ node -e 'require("unicode-9.0.0").Word_Break.forEach(v => { console.log(`\\p{Word_Break=${v}}`); })'
\p{Word_Break=ALetter}
\p{Word_Break=CR}
\p{Word_Break=Double_Quote}
\p{Word_Break=E_Base}
\p{Word_Break=E_Base_GAZ}
\p{Word_Break=E_Modifier}
\p{Word_Break=Extend}
\p{Word_Break=ExtendNumLet}
\p{Word_Break=Format}
\p{Word_Break=Glue_After_Zwj}
\p{Word_Break=Hebrew_Letter}
\p{Word_Break=Katakana}
\p{Word_Break=LF}
\p{Word_Break=MidLetter}
\p{Word_Break=MidNum}
\p{Word_Break=MidNumLet}
\p{Word_Break=Newline}
\p{Word_Break=Numeric}
\p{Word_Break=Other}
\p{Word_Break=Regional_Indicator}
\p{Word_Break=Single_Quote}
\p{Word_Break=ZWJ}
```

Note that property value aliases may be used as well, e.g. `\p{Word_Break=DQ}`, although IMHO it’s more readable to stick to the canonical property values listed above.

## Binary properties

All binary properties in the Unicode standard are supported:

```sh
$ node -e 'require("unicode-9.0.0").Binary_Property.forEach(p => { console.log(`\\p{${p}}`); })'
\p{ASCII}
\p{ASCII_Hex_Digit}
\p{Alphabetic}
\p{Any}
\p{Assigned}
\p{Bidi_Control}
\p{Bidi_Mirrored}
\p{Case_Ignorable}
\p{Cased}
\p{Changes_When_Casefolded}
\p{Changes_When_Casemapped}
\p{Changes_When_Lowercased}
\p{Changes_When_NFKC_Casefolded}
\p{Changes_When_Titlecased}
\p{Changes_When_Uppercased}
\p{Composition_Exclusion}
\p{Dash}
\p{Default_Ignorable_Code_Point}
\p{Deprecated}
\p{Diacritic}
\p{Expands_On_NFC}
\p{Expands_On_NFD}
\p{Expands_On_NFKC}
\p{Expands_On_NFKD}
\p{Extender}
\p{FC_NFKC_Closure}
\p{Full_Composition_Exclusion}
\p{Grapheme_Base}
\p{Grapheme_Extend}
\p{Grapheme_Link}
\p{Hex_Digit}
\p{Hyphen}
\p{IDS_Binary_Operator}
\p{IDS_Trinary_Operator}
\p{ID_Continue}
\p{ID_Start}
\p{Ideographic}
\p{Join_Control}
\p{Logical_Order_Exception}
\p{Lowercase}
\p{Math}
\p{Noncharacter_Code_Point}
\p{Other_Alphabetic}
\p{Other_Default_Ignorable_Code_Point}
\p{Other_Grapheme_Extend}
\p{Other_ID_Continue}
\p{Other_ID_Start}
\p{Other_Lowercase}
\p{Other_Math}
\p{Other_Uppercase}
\p{Pattern_Syntax}
\p{Pattern_White_Space}
\p{Prepended_Concatenation_Mark}
\p{Quotation_Mark}
\p{Radical}
\p{Sentence_Terminal}
\p{Soft_Dotted}
\p{Terminal_Punctuation}
\p{Unified_Ideograph}
\p{Uppercase}
\p{Variation_Selector}
\p{White_Space}
\p{XID_Continue}
\p{XID_Start}
```

Note that property name aliases may be used as well, e.g. `\p{AHex}`, although IMHO it’s more readable to stick to the canonical property names listed above.

### Unsupported properties

The abovementioned list of properties and values goes a long way towards fulfilling [UTR18 requirement RL2.7](http://unicode.org/reports/tr18/#RL2.7). However, the following properties are not currently supported:

* `Age`
* `Bidi_Class`
* `Bidi_Mirroring_Glyph`
* `Bidi_Paired_Bracket_Type`
* `Bidi_Paired_Bracket`
* `Block`
* `Canonical_Combining_Class`
* `Case_Folding`
* `Decomposition_Mapping`
* `Decomposition_Type`
* `East_Asian_Width`
* `Grapheme_Cluster_Break`
* `Hangul_Syllable_Type`
* `Joining_Group`
* `Joining_Type`
* `Line_Break`
* `Lowercase_Mapping`
* `Name` & `Name_Alias`
* `NFC_Quick_Check`
* `NFD_Quick_Check`
* `NFKC_Casefold`
* `NFKC_Quick_Check`
* `NFKD_Quick_Check`
* `Numeric_Type`
* `Numeric_Value`
* `Sentence_Break`
* `Simple_Case_Folding`
* `Simple_Lowercase_Mapping`
* `Simple_Titlecase_Mapping`
* `Simple_Uppercase_Mapping`
* `Titlecase_Mapping`
* `Uppercase_Mapping`
