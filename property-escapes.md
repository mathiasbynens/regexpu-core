# Unicode property escapes in _regexpu_

To opt-in to experimental support for Unicode property escapes, enable [the `unicodePropertyEscape` option](README.md#unicodepropertyescape-default-false).

```js
rewritePattern('\\p{Block=Aegean_Numbers}', 'u', {
  'unicodePropertyEscape': true
});
// → '(?:\\uD800[\\uDD00-\\uDD3F])'
```

If you’re targeting ES6 environments exclusively, consider enabling [the `useUnicodeFlag` option](README.md#useunicodeflag-default-false) for more compact output.

```js
rewritePattern('\\p{Block=Aegean_Numbers}', 'u', {
  'unicodePropertyEscape': true,
  'useUnicodeFlag': true
});
// → '[\\u{10100}-\\u{1013F}]'
```

Here’s an exhaustive overview of the Unicode properties and values that _regexpu_ supports in `\p{…}` and `\P{…}` expressions in regular expressions with the `u` flag.

## Non-binary properties

### `Bidi_Class`

Possible values:

```sh
$ node -e 'require("unicode-8.0.0").Bidi_Class.forEach(c => { console.log(`\\p{Bidi_Class=${c}}`); })'
\p{Bidi_Class=Arabic_Letter}
\p{Bidi_Class=Arabic_Number}
\p{Bidi_Class=Boundary_Neutral}
\p{Bidi_Class=Common_Separator}
\p{Bidi_Class=European_Number}
\p{Bidi_Class=European_Separator}
\p{Bidi_Class=European_Terminator}
\p{Bidi_Class=First_Strong_Isolate}
\p{Bidi_Class=Left_To_Right}
\p{Bidi_Class=Left_To_Right_Embedding}
\p{Bidi_Class=Left_To_Right_Isolate}
\p{Bidi_Class=Left_To_Right_Override}
\p{Bidi_Class=Nonspacing_Mark}
\p{Bidi_Class=Other_Neutral}
\p{Bidi_Class=Paragraph_Separator}
\p{Bidi_Class=Pop_Directional_Format}
\p{Bidi_Class=Pop_Directional_Isolate}
\p{Bidi_Class=Right_To_Left}
\p{Bidi_Class=Right_To_Left_Embedding}
\p{Bidi_Class=Right_To_Left_Isolate}
\p{Bidi_Class=Right_To_Left_Override}
\p{Bidi_Class=Segment_Separator}
\p{Bidi_Class=White_Space}
```

Note that bidi class aliases may be used as well, e.g. `\p{Bidi_Class=AL}`, although IMHO it’s more readable to stick to the canonical class names listed above.

### `Bidi_Paired_Bracket_Type`

Possible values:

```sh
$ node -e 'require("unicode-8.0.0").Bidi_Paired_Bracket_Type.forEach(t => { console.log(`\\p{Bidi_Paired_Bracket_Type=${t}}`); })'
\p{Bidi_Paired_Bracket_Type=Close}
\p{Bidi_Paired_Bracket_Type=None}
\p{Bidi_Paired_Bracket_Type=Open}
```

Note that property name aliases may be used as well, e.g. `\p{Bidi_Paired_Bracket_Type=o}`, although IMHO it’s more readable to stick to the canonical property names listed above.

### `Block`

Possible values:

```sh
$ node -e 'require("unicode-8.0.0").Block.forEach(b => { console.log(`\\p{Block=${b}}`); })'
\p{Block=Aegean_Numbers}
\p{Block=Ahom}
\p{Block=Alchemical_Symbols}
\p{Block=Alphabetic_Presentation_Forms}
\p{Block=Anatolian_Hieroglyphs}
\p{Block=Ancient_Greek_Musical_Notation}
\p{Block=Ancient_Greek_Numbers}
\p{Block=Ancient_Symbols}
\p{Block=Arabic}
\p{Block=Arabic_Extended_A}
\p{Block=Arabic_Mathematical_Alphabetic_Symbols}
\p{Block=Arabic_Presentation_Forms_A}
\p{Block=Arabic_Presentation_Forms_B}
\p{Block=Arabic_Supplement}
\p{Block=Armenian}
\p{Block=Arrows}
\p{Block=Avestan}
\p{Block=Balinese}
\p{Block=Bamum}
\p{Block=Bamum_Supplement}
\p{Block=Basic_Latin}
\p{Block=Bassa_Vah}
\p{Block=Batak}
\p{Block=Bengali}
\p{Block=Block_Elements}
\p{Block=Bopomofo}
\p{Block=Bopomofo_Extended}
\p{Block=Box_Drawing}
\p{Block=Brahmi}
\p{Block=Braille_Patterns}
\p{Block=Buginese}
\p{Block=Buhid}
\p{Block=Byzantine_Musical_Symbols}
\p{Block=CJK_Compatibility}
\p{Block=CJK_Compatibility_Forms}
\p{Block=CJK_Compatibility_Ideographs}
\p{Block=CJK_Compatibility_Ideographs_Supplement}
\p{Block=CJK_Radicals_Supplement}
\p{Block=CJK_Strokes}
\p{Block=CJK_Symbols_And_Punctuation}
\p{Block=CJK_Unified_Ideographs}
\p{Block=CJK_Unified_Ideographs_Extension_A}
\p{Block=CJK_Unified_Ideographs_Extension_B}
\p{Block=CJK_Unified_Ideographs_Extension_C}
\p{Block=CJK_Unified_Ideographs_Extension_D}
\p{Block=CJK_Unified_Ideographs_Extension_E}
\p{Block=Carian}
\p{Block=Caucasian_Albanian}
\p{Block=Chakma}
\p{Block=Cham}
\p{Block=Cherokee}
\p{Block=Cherokee_Supplement}
\p{Block=Combining_Diacritical_Marks}
\p{Block=Combining_Diacritical_Marks_Extended}
\p{Block=Combining_Diacritical_Marks_For_Symbols}
\p{Block=Combining_Diacritical_Marks_Supplement}
\p{Block=Combining_Half_Marks}
\p{Block=Common_Indic_Number_Forms}
\p{Block=Control_Pictures}
\p{Block=Coptic}
\p{Block=Coptic_Epact_Numbers}
\p{Block=Counting_Rod_Numerals}
\p{Block=Cuneiform}
\p{Block=Cuneiform_Numbers_And_Punctuation}
\p{Block=Currency_Symbols}
\p{Block=Cypriot_Syllabary}
\p{Block=Cyrillic}
\p{Block=Cyrillic_Extended_A}
\p{Block=Cyrillic_Extended_B}
\p{Block=Cyrillic_Supplement}
\p{Block=Deseret}
\p{Block=Devanagari}
\p{Block=Devanagari_Extended}
\p{Block=Dingbats}
\p{Block=Domino_Tiles}
\p{Block=Duployan}
\p{Block=Early_Dynastic_Cuneiform}
\p{Block=Egyptian_Hieroglyphs}
\p{Block=Elbasan}
\p{Block=Emoticons}
\p{Block=Enclosed_Alphanumeric_Supplement}
\p{Block=Enclosed_Alphanumerics}
\p{Block=Enclosed_CJK_Letters_And_Months}
\p{Block=Enclosed_Ideographic_Supplement}
\p{Block=Ethiopic}
\p{Block=Ethiopic_Extended}
\p{Block=Ethiopic_Extended_A}
\p{Block=Ethiopic_Supplement}
\p{Block=General_Punctuation}
\p{Block=Geometric_Shapes}
\p{Block=Geometric_Shapes_Extended}
\p{Block=Georgian}
\p{Block=Georgian_Supplement}
\p{Block=Glagolitic}
\p{Block=Gothic}
\p{Block=Grantha}
\p{Block=Greek_And_Coptic}
\p{Block=Greek_Extended}
\p{Block=Gujarati}
\p{Block=Gurmukhi}
\p{Block=Halfwidth_And_Fullwidth_Forms}
\p{Block=Hangul_Compatibility_Jamo}
\p{Block=Hangul_Jamo}
\p{Block=Hangul_Jamo_Extended_A}
\p{Block=Hangul_Jamo_Extended_B}
\p{Block=Hangul_Syllables}
\p{Block=Hanunoo}
\p{Block=Hatran}
\p{Block=Hebrew}
\p{Block=High_Private_Use_Surrogates}
\p{Block=High_Surrogates}
\p{Block=Hiragana}
\p{Block=IPA_Extensions}
\p{Block=Ideographic_Description_Characters}
\p{Block=Imperial_Aramaic}
\p{Block=Inscriptional_Pahlavi}
\p{Block=Inscriptional_Parthian}
\p{Block=Javanese}
\p{Block=Kaithi}
\p{Block=Kana_Supplement}
\p{Block=Kanbun}
\p{Block=Kangxi_Radicals}
\p{Block=Kannada}
\p{Block=Katakana}
\p{Block=Katakana_Phonetic_Extensions}
\p{Block=Kayah_Li}
\p{Block=Kharoshthi}
\p{Block=Khmer}
\p{Block=Khmer_Symbols}
\p{Block=Khojki}
\p{Block=Khudawadi}
\p{Block=Lao}
\p{Block=Latin_1_Supplement}
\p{Block=Latin_Extended_A}
\p{Block=Latin_Extended_Additional}
\p{Block=Latin_Extended_B}
\p{Block=Latin_Extended_C}
\p{Block=Latin_Extended_D}
\p{Block=Latin_Extended_E}
\p{Block=Lepcha}
\p{Block=Letterlike_Symbols}
\p{Block=Limbu}
\p{Block=Linear_A}
\p{Block=Linear_B_Ideograms}
\p{Block=Linear_B_Syllabary}
\p{Block=Lisu}
\p{Block=Low_Surrogates}
\p{Block=Lycian}
\p{Block=Lydian}
\p{Block=Mahajani}
\p{Block=Mahjong_Tiles}
\p{Block=Malayalam}
\p{Block=Mandaic}
\p{Block=Manichaean}
\p{Block=Mathematical_Alphanumeric_Symbols}
\p{Block=Mathematical_Operators}
\p{Block=Meetei_Mayek}
\p{Block=Meetei_Mayek_Extensions}
\p{Block=Mende_Kikakui}
\p{Block=Meroitic_Cursive}
\p{Block=Meroitic_Hieroglyphs}
\p{Block=Miao}
\p{Block=Miscellaneous_Mathematical_Symbols_A}
\p{Block=Miscellaneous_Mathematical_Symbols_B}
\p{Block=Miscellaneous_Symbols}
\p{Block=Miscellaneous_Symbols_And_Arrows}
\p{Block=Miscellaneous_Symbols_And_Pictographs}
\p{Block=Miscellaneous_Technical}
\p{Block=Modi}
\p{Block=Modifier_Tone_Letters}
\p{Block=Mongolian}
\p{Block=Mro}
\p{Block=Multani}
\p{Block=Musical_Symbols}
\p{Block=Myanmar}
\p{Block=Myanmar_Extended_A}
\p{Block=Myanmar_Extended_B}
\p{Block=NKo}
\p{Block=Nabataean}
\p{Block=New_Tai_Lue}
\p{Block=Number_Forms}
\p{Block=Ogham}
\p{Block=Ol_Chiki}
\p{Block=Old_Hungarian}
\p{Block=Old_Italic}
\p{Block=Old_North_Arabian}
\p{Block=Old_Permic}
\p{Block=Old_Persian}
\p{Block=Old_South_Arabian}
\p{Block=Old_Turkic}
\p{Block=Optical_Character_Recognition}
\p{Block=Oriya}
\p{Block=Ornamental_Dingbats}
\p{Block=Osmanya}
\p{Block=Pahawh_Hmong}
\p{Block=Palmyrene}
\p{Block=Pau_Cin_Hau}
\p{Block=Phags_Pa}
\p{Block=Phaistos_Disc}
\p{Block=Phoenician}
\p{Block=Phonetic_Extensions}
\p{Block=Phonetic_Extensions_Supplement}
\p{Block=Playing_Cards}
\p{Block=Private_Use_Area}
\p{Block=Psalter_Pahlavi}
\p{Block=Rejang}
\p{Block=Rumi_Numeral_Symbols}
\p{Block=Runic}
\p{Block=Samaritan}
\p{Block=Saurashtra}
\p{Block=Sharada}
\p{Block=Shavian}
\p{Block=Shorthand_Format_Controls}
\p{Block=Siddham}
\p{Block=Sinhala}
\p{Block=Sinhala_Archaic_Numbers}
\p{Block=Small_Form_Variants}
\p{Block=Sora_Sompeng}
\p{Block=Spacing_Modifier_Letters}
\p{Block=Specials}
\p{Block=Sundanese}
\p{Block=Sundanese_Supplement}
\p{Block=Superscripts_And_Subscripts}
\p{Block=Supplemental_Arrows_A}
\p{Block=Supplemental_Arrows_B}
\p{Block=Supplemental_Arrows_C}
\p{Block=Supplemental_Mathematical_Operators}
\p{Block=Supplemental_Punctuation}
\p{Block=Supplemental_Symbols_And_Pictographs}
\p{Block=Supplementary_Private_Use_Area_A}
\p{Block=Supplementary_Private_Use_Area_B}
\p{Block=Sutton_SignWriting}
\p{Block=Syloti_Nagri}
\p{Block=Syriac}
\p{Block=Tagalog}
\p{Block=Tagbanwa}
\p{Block=Tags}
\p{Block=Tai_Le}
\p{Block=Tai_Tham}
\p{Block=Tai_Viet}
\p{Block=Tai_Xuan_Jing_Symbols}
\p{Block=Takri}
\p{Block=Tamil}
\p{Block=Telugu}
\p{Block=Thaana}
\p{Block=Thai}
\p{Block=Tibetan}
\p{Block=Tifinagh}
\p{Block=Tirhuta}
\p{Block=Transport_And_Map_Symbols}
\p{Block=Ugaritic}
\p{Block=Unified_Canadian_Aboriginal_Syllabics}
\p{Block=Unified_Canadian_Aboriginal_Syllabics_Extended}
\p{Block=Vai}
\p{Block=Variation_Selectors}
\p{Block=Variation_Selectors_Supplement}
\p{Block=Vedic_Extensions}
\p{Block=Vertical_Forms}
\p{Block=Warang_Citi}
\p{Block=Yi_Radicals}
\p{Block=Yi_Syllables}
\p{Block=Yijing_Hexagram_Symbols}
```

Note that block name aliases may be used as well, e.g. `\p{Arabic_Math}`, although IMHO it’s more readable to stick to the canonical block names listed above.

### `General_Category`

Possible values:

```sh
$ node -e 'require("unicode-8.0.0").General_Category.forEach(c => { console.log(`\\p{${c}}`); })'
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
$ node -e 'require("unicode-8.0.0").Script_Extensions.forEach(s => { console.log(`\\p{Script_Extensions=${s}}`); })'
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

## Binary properties

All binary properties in the Unicode standard are supported:

```sh
$ node -e 'require("unicode-8.0.0").Binary_Property.forEach(p => { console.log(`\\p{${p}}`); })'
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
\p{Quotation_Mark}
\p{Radical}
\p{STerm}
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
* `Bidi_Mirroring_Glyph`
* `Bidi_Paired_Bracket`
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
* `Word_Break`
